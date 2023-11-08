import {Injectable, Inject, UnauthorizedException, Logger} from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';
import { Redlock } from "@/public/redlock.decorator";
import { ADD_ACCOUNT_LOCK_KEY, LOCK_TIME } from "./account.const";
import { Result } from "@/public/result.entity";
import {EmailService} from "@/public/email.service";
import { genCode } from "@/utils/random";
import {
    CheckRegisterEmailRequest,
    EmailCode, OTPSecretResult,
    TokenOptions, TokenResult
} from "@/account/account.interface";
import { I18nService } from "nestjs-i18n";
import {md5} from "@/utils/crypto";
import ms from 'ms';
import speakeasy from 'speakeasy';

@Injectable()
export class AccountService {
    private logger = new Logger(AccountService.name);

    constructor(
        @InjectRepository(Account) private accountRepository: Repository<Account>,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
        private jwtService: JwtService,
        private emailService: EmailService,
        private i18n: I18nService,
    ) {}

    private async newCode(redisKey: string): Promise<EmailCode> {
        const code = {
            code: genCode(),
            createdAt: Date.now(),
        };
        await this.cacheService.set<EmailCode>(redisKey, code, { ttl: 60 * 5 });
        return code;
    }

    async sendRegisterEmail(email: string): Promise<Result<any>> {
        const codeKey = `register:email:code:${email}`;
        const timeKey = `register:email:code:${email}:send:time`;
        let code = await this.cacheService.get<EmailCode>(codeKey);
        if(code) {
            const lastTime = await this.cacheService.get<number>(timeKey);
            const offset = Date.now() - code.createdAt;
            if(lastTime && Date.now()  - lastTime < 60 * 1000)
                return Result.error({code: 1, message: this.i18n.t("public.throttle")})
            if(offset > 4 * 60 * 1000)
                code = await this.newCode(codeKey);
        } else {
            code = await this.newCode(codeKey);
        }
        await this.cacheService.set(timeKey, Date.now(), { ttl: 60 });
        const sent = await this.emailService.singleSendMail({
            email,
            subject: this.i18n.t("mail.title.code"),
            template: "code",
            data: {
                code: code.code
            }
        });
        if(!sent) {
            await this.cacheService.del(codeKey);
            await this.cacheService.del(timeKey);
            return Result.error({code: 2, message: this.i18n.t("mail.fail")})
        }
        return Result.success(null);
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
        const codeKey = `register:email:code:${request.email}`;
        let code = await this.cacheService.get<EmailCode>(codeKey);
        if(!code || code.code !== request.code) {
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
            const secretObject = speakeasy.generateSecret();
            account.otpSecret = secretObject.base32;
            await this.accountRepository.createQueryBuilder()
                .update()
                .set({
                    otpSecret: account.otpSecret,
                    otpStatus: 0
                })
                .where("id = :id", { id })
                .execute();
        }
        const url = speakeasy.otpauthURL({
            secret: account.otpSecret,
            label: `${this.i18n.t('public.app')}:${account.username}`,
            algorithm: 'sha512',
        })
        return { secret: account.otpSecret, url };
    }

    async findOne(id: number): Promise<Account | null> {
        // await new Promise((resolve) => {
        //     setTimeout(resolve, 2000);
        // })
        let account = await this.cacheService.get<Account | null>(id.toString());
        if(!account) {
            account = await this.accountRepository.findOneBy({ id });
            if(!account) {
                return null;
            }
            await this.cacheService.set(id.toString(), account);
        }
        Promise.reject(new Error("test"));
        return account;
    }

    async remove(id: number): Promise<void> {
        await this.accountRepository.delete(id);
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
