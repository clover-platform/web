import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';
import { Redlock } from "../plugin/redlock.decorator";

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account) private accountRepository: Repository<Account>,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
        private jwtService: JwtService
    ) {}

    findAll(): Promise<Account[]> {
        return this.accountRepository.find();
    }

    @Redlock(["account:by:id"], 5000)
    async findOne(id: number): Promise<Account | null> {
        console.log('id', id);
        await new Promise((resolve) => {
            setTimeout(resolve, 2000);
        })
        let account = await this.cacheService.get<Account | null>(id.toString());
        if(!account) {
            account = await this.accountRepository.findOneBy({ id });
            if(!account) {
                return null;
            }
            await this.cacheService.set(id.toString(), account);
        }
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
