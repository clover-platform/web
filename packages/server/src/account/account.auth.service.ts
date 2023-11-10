import {Injectable, Logger} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AccountAuthApp, AccountAuthOpenUser} from "@/account/account.auth.entity";
import {Result} from "@/public/result.entity";
import {I18nService} from "nestjs-i18n";
import {HttpService} from "@nestjs/axios";
import {firstValueFrom} from "rxjs";
import {Redlock} from "@/public/redlock.decorator";
import {ACCOUNT_OPEN_USER_LOCK_KEY, LOCK_TIME} from "@/account/account.const";
import {TokenService} from "@/public/token.service";
import {BindRequest} from "@/account/account.auth.interface";
import {AccountService} from "@/account/account.service";

@Injectable()
export class AccountAuthService {
    private logger = new Logger(AccountAuthService.name);

    constructor(
        @InjectRepository(AccountAuthApp) private accountAuthAppRepository: Repository<AccountAuthApp>,
        @InjectRepository(AccountAuthOpenUser) private accountAuthOpenUserRepository: Repository<AccountAuthOpenUser>,
        private i18n: I18nService,
        private httpService: HttpService,
        private tokenService: TokenService,
        private accountService: AccountService,
    ) {}

    async getUrl(name: string): Promise<string> {
        const app = await this.accountAuthAppRepository.findOneBy({ name})
        if(!app)
            return null;
        if(name === 'github') {
            return `${app.authorizeUrl}?client_id=${app.clientId}`;
        }
        return null;
    }

    @Redlock([ACCOUNT_OPEN_USER_LOCK_KEY], LOCK_TIME)
    async addOrUpdateOpenUser(openUser: AccountAuthOpenUser): Promise<AccountAuthOpenUser> {
        let user = await this.accountAuthOpenUserRepository.findOneBy({
            platform: openUser.platform,
            openId: openUser.openId
        });
        if(user) {
            await this.accountAuthOpenUserRepository.createQueryBuilder()
                .update()
                .set({
                    accessToken: openUser.accessToken,
                    tokenType: openUser.tokenType,
                    avatar: openUser.avatar,
                    username: openUser.username,
                    updateTime: new Date()
                })
                .where("id = :id", {id: user.id})
                .execute();
        } else {
            openUser.createTime = new Date();
            await this.accountAuthOpenUserRepository.save(openUser);
        }
        const result = new AccountAuthOpenUser();
        user = await this.accountAuthOpenUserRepository.findOneBy({
            platform: openUser.platform,
            openId: openUser.openId
        });
        result.id = user.id;
        result.openId = user.openId;
        result.accountId = user.accountId;
        result.platform = user.platform;
        result.username = user.username;
        result.avatar = user.avatar;
        return result;
    }

    private async githubInfo(code: string, app: AccountAuthApp): Promise<Result<any>> {
        // 请求 access token
        const tokenResult = await firstValueFrom(
            this.httpService.get(
                `${app.tokenUrl}?client_id=${app.clientId}&client_secret=${app.clientSecret}&code=${code}`,
                {
                    headers: {
                        Accept: "application/json"
                    }
                }
            )
        );
        if(tokenResult.status !== 200 || tokenResult.data.error) {
            Result.error({code: 3, message: this.i18n.t("account.auth.app.api")});
        }
        const {
            access_token,
            token_type,
        } = tokenResult.data;
        // 请求用户信息
        const infoResult = await firstValueFrom(
            this.httpService.get(
                `${app.infoUrl}`,
                {
                    headers: {
                        Authorization: `${token_type} ${access_token}`,
                        Accept: "application/json"
                    }
                }
            )
        );
        if(infoResult.status !== 200 || infoResult.data.error) {
            Result.error({code: 3, message: this.i18n.t("account.auth.app.api")});
        }
        const {
            login,
            avatar_url,
            node_id,
        } = infoResult.data;
        this.logger.log(infoResult.data);

        const openUser = new AccountAuthOpenUser();
        openUser.username = login;
        openUser.avatar = avatar_url;
        openUser.accessToken = access_token;
        openUser.tokenType = token_type;
        openUser.openId = node_id;
        openUser.platform = 'github';

        const user = await this.addOrUpdateOpenUser(openUser);
        if(user.accountId) {
            const account = await this.accountService.findById(user.accountId);
            const token = await this.tokenService.create( { sub: account.id, username: account.username }, {expiresIn: '1d'});
            return Result.success({code: 100, data: token})
        }
        const token = await this.tokenService.create( { sub: user.id, username: user.username }, {expiresIn: '5m'});

        return Result.success({
            data: {
                ...user,
                id: void 0,
                accountId: void 0,
                openId: void 0,
                token: token.token
            }
        });
    }

    async info(name: string, code: string): Promise<any> {
        const app = await this.accountAuthAppRepository.findOneBy({ name })
        if(!app)
            return Result.error({code: 1, message: this.i18n.t("account.auth.app.unsupported")});
        if(name === 'github') {
            return await this.githubInfo(code, app);
        }
        return Result.error({code: 2, message: this.i18n.t("account.auth.app.unsupported")});
    }

    async bind(request: BindRequest) {
        const user = await this.tokenService.verify(request.token);
        if(!user)
            return Result.error({code: 1, message: this.i18n.t("account.auth.token.invalid")});
        this.logger.log(user);
        const result = await this.accountService.login(request.account, request.password);
        if(result.success) {
            const account = await this.tokenService.verify(result.data.token);
            await this.accountAuthOpenUserRepository.createQueryBuilder()
                .update()
                .set({
                    accountId: account.sub
                })
                .where("id = :id", {id: user.sub})
                .execute();
        }
        return result;
    }
}
