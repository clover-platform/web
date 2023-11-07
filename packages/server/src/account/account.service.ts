import { Injectable, Inject, UnauthorizedException, Catch } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';
import { Redlock } from "../public/redlock.decorator";
import { ADD_ACCOUNT_LOCK_KEY, LOCK_TIME } from "./account.const";
import { Result } from "../public/result.entity";
import {EmailService} from "../public/email.service";
import e from "express";

export interface CheckRegisterEmailRequest {
    username: string;
    email: string;
    code: string;
}

export interface CheckRegisterEmailResult {
    token: string;
}

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account) private accountRepository: Repository<Account>,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
        private jwtService: JwtService,
        private emailService: EmailService,
    ) {}

    async sendRegisterEmail(email: string): Promise<Result<any>> {
        // await this.emailService.singleSendMail({
        //     email,
        //     subject: "注册",
        //     body: "注册成功",
        // });
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
