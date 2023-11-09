import { Inject, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Account } from "./account.entity";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { JwtService } from "@nestjs/jwt";
import { Redlock } from "@/public/redlock.decorator";
import { ADD_ACCOUNT_LOCK_KEY, LOCK_TIME } from "./account.const";
import { Result } from "@/public/result.entity";
import {
    CheckRegisterEmailRequest, CheckResetEmailRequest,
    OTPSecretResult, ResetPasswordRequest,
    SetPasswordRequest,
    TokenOptions,
    TokenResult
} from "@/account/account.interface";
import { I18nService } from "nestjs-i18n";
import { decrypt, md5 } from "@/utils/crypto";
import ms from "ms";
import { ConfigService } from "@nestjs/config";
import { authenticator } from "otplib";
import {CodeService} from "@/public/code.service";

@Injectable()
export class AccountService {
    private logger = new Logger(AccountService.name);

    constructor(
        @InjectRepository(Account) private accountRepository: Repository<Account>,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
        private jwtService: JwtService,
        private i18n: I18nService,
        private configService: ConfigService,
        private codeService: CodeService,
    ) {}

    async sendResetEmail(email: string): Promise<Result<any>> {
        const size = await this.accountRepository.countBy({
            email,
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

    async sendRegisterEmail(email: string): Promise<Result<any>> {
        const size = await this.accountRepository.countBy({
            email,
            status: 1
        });
        if(size > 0) {
            return Result.error({code: 1, message: this.i18n.t("account.register.has")})
        }
        return await this.codeService.send({
            email,
            action: "register"
        });
    }

    @Redlock([ADD_ACCOUNT_LOCK_KEY], LOCK_TIME)
    async add(account: Account): Promise<Account> {
        this.logger.log(account);
        const where = {
            username: account.username,
            email: account.email,
            status: 0,
        }
        const size = await this.accountRepository.countBy(where);
        if(size === 0) {
            await this.accountRepository.insert(account);
        }
        return this.accountRepository.findOneBy(where);
    }

    async has(account: Account): Promise<boolean> {
        const size = await this.accountRepository.createQueryBuilder()
            .where("deleted = :deleted", { deleted: false })
            .andWhere("status = :status", { status: 1 })
            .andWhere("(username = :username or email = :email)", account).getCount();
        return size > 0;
    }

    async createToken(account: Account, options: TokenOptions): Promise<TokenResult> {
        const payload = { sub: account.id, username: account.username };
        const token = await this.jwtService.signAsync(payload, { expiresIn: options.expiresIn });
        const hash = md5(token);
        const tokenKey = `token:${hash}`;
        const ttl = ms(options.expiresIn)/1000;
        await this.cacheService.set(tokenKey,token, { ttl });
        return {
            token: hash,
            expiresIn: Date.now() + ttl
        };
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
        let account = new Account();
        account.username = request.username;
        account.email = request.email;
        account.createTime = new Date();
        const has = await this.has(account);
        if(has) {
            return Result.error({code: 2, message: this.i18n.t("account.register.has")})
        }
        // 插入数据库，并返回一个示例
        account = await this.add(account);

        // 生成五分钟的临时token
        return await this.createToken(account, {expiresIn: "5m"});
    }

    async otpSecret(id: number): Promise<OTPSecretResult|Result<any>> {
        const account = await this.accountRepository.findOneBy({ id });
        if(!account) {
            return Result.error({code: 1, message: this.i18n.t("account.notfound")} );
        }
        if(account.otpSecret) {
            if(account.otpStatus === 1) {
                return Result.error({code: 1, message: this.i18n.t("account.otp.is_bind")} );
            }
        }else{
            account.otpSecret = authenticator.generateSecret();
            await this.accountRepository.createQueryBuilder()
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
        const account = await this.accountRepository.findOneBy({ id: request.id });
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
        await this.accountRepository.createQueryBuilder()
            .update()
            .set({
                password: decrypt(request.password, this.configService.get("privateKey")),
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
        const account = await this.accountRepository.findOneBy({
            email: request.email,
            status: 1
        });
        if(!account) {
            return Result.error({code: 2, message: this.i18n.t("account.notfound")} );
        }
        // 生成五分钟的临时token
        return await this.createToken(account, {expiresIn: "5m"});
    }

    async resetPassword(request: ResetPasswordRequest): Promise<TokenResult|Result<any>> {
        const account = await this.accountRepository.findOneBy({ id: request.id });
        if(!account) {
            return Result.error({code: 1, message: this.i18n.t("account.notfound")} );
        }
        await this.accountRepository.createQueryBuilder()
            .update()
            .set({
                password: decrypt(request.password, this.configService.get("privateKey")),
            })
            .where("id = :id", { id: request.id })
            .execute();
        return await this.createToken(account, {expiresIn: "1d"});
    }

    async login(username: string, password: string): Promise<TokenResult> {
        const account = await this.accountRepository.findOneBy({
            username,
            password,
        })
        if(!account) {
            throw new UnauthorizedException();
        }
        return await this.createToken(account, {expiresIn: "1d"});
    }
}
