import { Controller, Get } from '@nestjs/common';
import { AccountService } from "./account.service";
import { Account } from "./account.entity";

@Controller("/api/account")
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Get("/list")
    async getHello(): Promise<Account[]> {
        return await this.accountService.findAll();
    }
}
