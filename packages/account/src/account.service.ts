import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Account } from "./account.entity";
import { Redlock } from "@easy-kit/public/redlock.decorator";
import { ACCOUNT_LOCK_KEY, LOCK_TIME } from "./account.const";
import { Result } from "@easy-kit/public/result.entity";
import {
    CheckRegisterEmailRequest, CheckResetEmailRequest,
    OTPSecretResult, ResetPasswordRequest,
    SetPasswordRequest,
    TokenOptions,
    TokenResult
} from "@easy-kit/account/account.interface";
import { I18nService } from "nestjs-i18n";
import { decrypt } from "@easy-kit/common/utils/crypto";
import { ConfigService } from "@nestjs/config";
import { authenticator } from "otplib";
import {CodeService} from "@easy-kit/public/code.service";
import {TokenService} from "@easy-kit/public/token.service";
import {isEmail} from "@easy-kit/common/utils";
import {AuthConfig} from "@easy-kit/config/interface";

@Injectable()
export class AccountService {
    private logger = new Logger(AccountService.name);

    constructor(
        @InjectRepository(Account) private repository: Repository<Account>,
        private i18n: I18nService,
        private configService: ConfigService,
        private codeService: CodeService,
        private tokenService: TokenService,
    ) {}

    async sendResetEmail(email: string): Promise<Result<any>> {
        const size = await this.repository.countBy({
            // email,
            status: 1
        });
        if(size === 0) {
            return Result.error({code: 1, message: this.i18n.t("account.notfound")})
        }
        return await this.codeService.send({
            email,
            action: "reset"
        });
    }

    @Redlock([ACCOUNT_LOCK_KEY], LOCK_TIME)
    async add(account: Account): Promise<Account> {
        const where = {
            username: account.username
        }
        const size = await this.repository.countBy(where);
        if(size === 0) {
            await this.repository.insert(account);
        }
        return this.repository.findOneBy(where);
    }

    async createToken(account: Account, options: TokenOptions): Promise<TokenResult> {
        const payload = { sub: account.id, username: account.username };
        return this.tokenService.create(payload, options);
    }

    async otpSecret(id: number): Promise<OTPSecretResult|Result<any>> {
        const account = await this.repository.findOneBy({ id });
        if(!account) {
            return Result.error({code: 1, message: this.i18n.t("account.notfound")} );
        }
        if(account.otpSecret) {
            if(account.otpStatus === 1) {
                return Result.error({code: 1, message: this.i18n.t("account.otp.is_bind")} );
            }
        }else{
            account.otpSecret = authenticator.generateSecret();
            await this.repository.createQueryBuilder()
                .update()
                .set({
                    otpSecret: account.otpSecret,
                    otpStatus: 0
                })
                .where("id = :id", { id })
                .execute();
        }
        const url = authenticator.keyuri(account.username, this.i18n.t('public.app'), account.otpSecret);
        return { secret: account.otpSecret, url };
    }

    async setPassword(request: SetPasswordRequest): Promise<TokenResult|Result<any>> {
        const account = await this.repository.findOneBy({ id: request.id });
        if(!account) {
            return Result.error({code: 1, message: this.i18n.t("account.notfound")} );
        }
        const verified = authenticator.verify({
            secret: account.otpSecret,
            token: request.otpCode
        });
        this.logger.log(verified);
        if(!verified) {
            return Result.error({code: 2, message: this.i18n.t("account.otp.verify")} );
        }
        const authConfig = this.configService.get<AuthConfig>("auth");
        await this.repository.createQueryBuilder()
            .update()
            .set({
                password: decrypt(request.password, authConfig.transport.privateKey),
                otpStatus: 1,
                status: 1
            })
            .where("id = :id", { id: request.id })
            .execute();
        return await this.createToken(account, {expiresIn: "1d"});
    }

    async checkResetEmail(request: CheckResetEmailRequest): Promise<TokenResult | Result<any>> {
        const checked = await this.codeService.check({
            email: request.email,
            action: "reset",
            code: request.code
        });
        if(!checked) {
            return Result.error({code: 1, message: this.i18n.t("account.reset.code")})
        }
        // 插入数据库，并返回一个示例
        const account = await this.repository.findOneBy({
            // email: request.email,
            status: 1
        });
        if(!account) {
            return Result.error({code: 2, message: this.i18n.t("account.notfound")} );
        }
        // 生成五分钟的临时token
        return await this.createToken(account, {expiresIn: "5m"});
    }

    async resetPassword(request: ResetPasswordRequest): Promise<TokenResult|Result<any>> {
        const account = await this.repository.findOneBy({ id: request.id });
        if(!account) {
            return Result.error({code: 1, message: this.i18n.t("account.notfound")} );
        }
        const authConfig = this.configService.get<AuthConfig>("auth");
        await this.repository.createQueryBuilder()
            .update()
            .set({
                password: decrypt(request.password, authConfig.transport.privateKey),
            })
            .where("id = :id", { id: request.id })
            .execute();
        return await this.createToken(account, {expiresIn: "1d"});
    }

    async login(account: string, password: string): Promise<Result<TokenResult>> {
        let info = null;
        const authConfig = this.configService.get<AuthConfig>("auth");
        const pwd = decrypt(password, authConfig.transport.privateKey);
        if(isEmail(account)) {
            info = await this.repository.findOneBy({
                // email: account,
                password: pwd
            })
        }else{
            info = await this.repository.findOneBy({
                username: account,
                password: pwd
            })
        }
        if(!info) {
            return Result.error({code: 1, message: this.i18n.t("account.login.error")} );
        }
        const token = await this.createToken(info, {expiresIn: "1d"});
        return Result.success({data: token});
    }

    async findById(id: number): Promise<Account> {
        return await this.repository.findOneBy({ id });
    }
}
