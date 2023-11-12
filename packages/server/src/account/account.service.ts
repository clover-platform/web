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
        const size = await this.repository.countBy({ email });
        if(size > 0) {
            return Result.error({code: 1, message: this.i18n.t("account.register.has")})
        }
        return await this.codeService.send({
            email,
            action: "register"
        });
    }

    async has(account: AppAccount): Promise<boolean> {
        const size = await this.repository.createQueryBuilder()
            .where("deleted = :deleted", { deleted: false })
            .andWhere("(username = :username or email = :email)", account).getCount();
        return size > 0;
    }

    @Redlock([APP_ACCOUNT_LOCK_KEY], LOCK_TIME)
    async add(appAccount: AppAccount): Promise<Account> {
        const where = {
            username: appAccount.username,
            deleted: false,
        }
        const size = await this.repository.countBy(where);
        if(size === 0) {
            await this.repository.insert(appAccount);
        }
        let account = new Account();
        account.username = appAccount.username;
        account.createTime = new Date();
        return this.accountService.add(account);
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
        const appAccount = new AppAccount();
        appAccount.username = request.username;
        appAccount.email = request.email;
        const has = await this.has(appAccount);
        if(has) {
            return Result.error({code: 2, message: this.i18n.t("account.register.has")})
        }
        // 插入数据库，并返回一个实例
        const account = await this.add(appAccount);
        // 生成五分钟的临时token
        return await this.accountService.createToken(account, {expiresIn: "5m"});
    }

}
