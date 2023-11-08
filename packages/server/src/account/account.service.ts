import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
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
    CheckRegisterEmailResult,
    EmailCode,
    LoginResult
} from "@/account/account.interface";
import { I18n, I18nContext } from "nestjs-i18n";

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account) private accountRepository: Repository<Account>,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
        private jwtService: JwtService,
        private emailService: EmailService
    ) {}

    private async newCode(redisKey: string): Promise<EmailCode> {
        const code = {
            code: genCode(),
            createdAt: Date.now(),
        };
        await this.cacheService.set<EmailCode>(redisKey, code, { ttl: 60 * 5 });
        return code;
    }

    async sendRegisterEmail(i18n: I18nContext, email: string): Promise<Result<any>> {
        const codeKey = `register:email:code:${email}`;
        const timeKey = `register:email:code:${email}:send:time`;
        let code = await this.cacheService.get<EmailCode>(codeKey);
        if(code) {
            const lastTime = await this.cacheService.get<number>(timeKey);
            const offset = Date.now() - code.createdAt;
            if(lastTime && Date.now()  - lastTime < 60 * 1000)
                return Result.error({code: 1, message: i18n.t("public.throttle")})
            if(offset > 4 * 60 * 1000)
                code = await this.newCode(codeKey);
        } else {
            code = await this.newCode(codeKey);
        }
        await this.cacheService.set(timeKey, Date.now(), { ttl: 60 });
        const sent = await this.emailService.singleSendMail({
            email,
            subject: i18n.t("mail.title.code"),
            template: "code",
            data: {
                code: code.code
            }
        });
        if(!sent) {
            await this.cacheService.del(codeKey);
            await this.cacheService.del(timeKey);
            return Result.error({code: 2, message: i18n.t("mail.fail")})
        }
        return Result.success(null);
    }

    @Redlock([ADD_ACCOUNT_LOCK_KEY], LOCK_TIME)
    async add(account: Account): Promise<Account> {
        const size = await this.accountRepository.countBy({
            username: account.username,
        });
        if(size === 0) {
            await this.accountRepository.insert(account);
        }
        return this.accountRepository.findOneBy({
            username: account.username,
        })
    }

    async checkRegisterEmail(request: CheckRegisterEmailRequest): Promise<CheckRegisterEmailResult> {
        let account = new Account();
        account.username = request.username;
        account.email = request.email;
        // 插入数据库，并返回一个示例
        account = await this.add(account);

        return {
            token: ""
        };
    }

    findAll(): Promise<Account[]> {
        return this.accountRepository.find();
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

    async login(username: string, password: string): Promise<LoginResult> {
        const account = await this.accountRepository.findOneBy({
            username,
            password,
        })
        if(!account) {
            throw new UnauthorizedException();
        }
        const payload = { sub: account.id, username: account.username };
        return {
            token: await this.jwtService.signAsync(payload),
        };
    }
}
