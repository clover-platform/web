import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private usersRepository: Repository<Account>,
    ) {}

    findAll(): Promise<Account[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<Account | null> {
        return this.usersRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
