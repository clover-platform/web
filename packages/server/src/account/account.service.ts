import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import redlock from "../plugin/redlock";

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
    ) {}

    findAll(): Promise<Account[]> {
        return this.accountRepository.find();
    }

    async findOne(id: number): Promise<Account | null> {
        const lock = await redlock.acquire(["account:by:id"], 5000);
        await new Promise((resolve) => {
            setTimeout(resolve, 2000);
        })
        let account = await this.cacheService.get<Account | null>(id.toString());
        if(!account) {
            account = await this.accountRepository.findOneBy({ id });
            await this.cacheService.set(id.toString(), account);
        }
        await lock.release();
        return account;
    }

    async remove(id: number): Promise<void> {
        await this.accountRepository.delete(id);
    }
}
