import {Injectable} from "@nestjs/common";
import {Result} from "@easy-kit/public/result.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CodeService} from "@easy-kit/public/code.service";
import {Account} from "@/account/account.entity";
import { CheckRegisterEmailRequest, CheckResetEmailRequest, TokenResult } from "@easy-kit/account/auth/account.interface";
import {AuthAccount} from "@easy-kit/account/auth/account.entity";
import {Redlock} from "@easy-kit/public/redlock.decorator";
import {LOCK_TIME} from "@easy-kit/account/auth/account.const";
import {APP_ACCOUNT_LOCK_KEY} from "@/account/account.const";
import {AuthAccountService} from "@easy-kit/account/auth/account.service";
import {I18nService} from "@easy-kit/public/i18n.service";
import {isEmail} from "@easy-kit/common/utils";
import { LoginRequest } from "@/account/account.interface";

@Injectable()
export class AccountService {

    constructor(
        @InjectRepository(Account) private repository: Repository<Account>,
        private accountService: AuthAccountService,
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
    async add(appAccount: Account): Promise<Account> {
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
            account = new AuthAccount();
            account.username = appAccount.username;
            account = await this.accountService.add(account);
        }
        const result = await this.repository.findOneBy({username: appAccount.username});
        result.account = account;
        return result;
    }

    async has(where: {
        username: string,
        email: string,
    }): Promise<boolean> {
        const hasEmail = await this.hasEmail(where.email);
        const hasUsername = await this.hasUsername(where.username);
        return hasEmail || hasUsername;
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
        let appAccount = new Account();
        appAccount.username = request.username;
        appAccount.email = request.email;
        const has = await this.has(appAccount);
        if(has) {
            return Result.error({code: 2, message: this.i18n.t("account.register.has")})
        }
        // 插入数据库，并返回一个实例
        appAccount = await this.add(appAccount);
        // 生成五分钟的临时token
        return await this.accountService.createToken(appAccount.account, {expiresIn: "5m"});
    }

    async login(request: LoginRequest): Promise<Result<TokenResult>> {
        let info = null;
        let username = request.account;
        if(isEmail(username)) {
            info = await this.repository.findOneBy({
                email: username
            });
            username = info.username;
        }
        const has = await this.repository.findOneBy({
            username,
            enable: true,
        });
        if(!has) {
            return Result.error({code: 1, message: this.i18n.t("account.notfound")})
        }
        return this.accountService.login(username, request.password, request.code);
    }

    async sendResetEmail(email: string): Promise<Result<any>> {
        const size = await this.repository.countBy({
            email,
            deleted: false
        });
        if(size === 0) {
            return Result.error({code: 1, message: this.i18n.t("account.notfound")})
        }
        return await this.codeService.send({
            email,
            action: "reset"
        });
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
        const appAccount = await this.repository.findOneBy({
            email: request.email,
            deleted: false
        });
        if(!appAccount) {
            return Result.error({code: 2, message: this.i18n.t("account.notfound")} );
        }
        const account = await this.accountService.findByUsername(appAccount.username);
        if(!appAccount) {
            return Result.error({code: 2, message: this.i18n.t("account.notfound")} );
        }
        // 生成五分钟的临时token
        return await this.accountService.createToken(account, {expiresIn: "5m"});
    }

}
