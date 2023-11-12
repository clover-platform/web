import {Injectable} from "@nestjs/common";
import {Result} from "@easy-kit/public/result.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {I18nService} from "nestjs-i18n";
import {CodeService} from "@easy-kit/public/code.service";
import {AppAccount} from "@/account/account.entity";
import {CheckRegisterEmailRequest, TokenResult} from "@easy-kit/account/account.interface";
import {Account} from "@easy-kit/account/account.entity";
import {Redlock} from "@easy-kit/public/redlock.decorator";
import {LOCK_TIME} from "@easy-kit/account/account.const";
import {APP_ACCOUNT_LOCK_KEY} from "@/account/account.const";
import {AccountService} from "@easy-kit/account/account.service";

@Injectable()
export class AppAccountService {

    constructor(
        @InjectRepository(AppAccount) private repository: Repository<AppAccount>,
        private accountService: AccountService,
        private i18n: I18nService,
        private codeService: CodeService,
    ) {}

    async sendRegisterEmail(email: string): Promise<Result<any>> {
        if(await this.hasEmail(email)) {
            return Result.error({code: 1, message: this.i18n.t("account.register.has")})
        }
        return await this.codeService.send({
            email,
            action: "register"
        });
    }

    async hasEmail(email: string) : Promise<boolean> {
        const appAccount = await this.repository.findOneBy({ email });
        if(appAccount) {
            return this.hasUsername(appAccount.username);
        }
        return false;
    }

    async hasUsername(username: string): Promise<boolean> {
        const account = await this.accountService.findByUsername(username);
        return account && account.status !== 0;
    }

    @Redlock([APP_ACCOUNT_LOCK_KEY], LOCK_TIME)
    async add(appAccount: AppAccount): Promise<AppAccount> {
        const where = {
            username: appAccount.username,
            email: appAccount.email,
        }
        const size = await this.repository.countBy(where);
        if(size === 0) {
            await this.repository.insert(appAccount);
        }
        let account = await this.accountService.findByUsername(appAccount.username);
        if(!account) {
            account = new Account();
            account.username = appAccount.username;
            account = await this.accountService.add(account);
        }
        const result = await this.repository.findOneBy({username: appAccount.username});
        result.account = account;
        return result;
    }

    async checkRegisterEmail(request: CheckRegisterEmailRequest): Promise<TokenResult | Result<any>> {
        const checked = await this.codeService.check({
            email: request.email,
            action: "register",
            code: request.code
        });
        if(!checked) {
            return Result.error({code: 1, message: this.i18n.t("account.register.code")})
        }
        let appAccount = new AppAccount();
        appAccount.username = request.username;
        appAccount.email = request.email;
        const has = await this.hasUsername(appAccount.username);
        if(has) {
            return Result.error({code: 2, message: this.i18n.t("account.register.has")})
        }
        // 插入数据库，并返回一个实例
        appAccount = await this.add(appAccount);
        // 生成五分钟的临时token
        return await this.accountService.createToken(appAccount.account, {expiresIn: "5m"});
    }

}
