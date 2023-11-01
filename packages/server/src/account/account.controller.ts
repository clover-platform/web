import { Controller, Get, Param, UseInterceptors } from "@nestjs/common";
import { AccountService } from "./account.service";
import { Account } from "./account.entity";
import { CacheInterceptor, CacheKey, CacheTTL } from "@nestjs/cache-manager";

@Controller("/api/account")
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @UseInterceptors(CacheInterceptor)
    @CacheKey('account:list')
    @CacheTTL(5000)
    @Get("/list")
    async list(): Promise<Account[]> {
        return await this.accountService.findAll();
    }

    @Get("/:id")
    async info(@Param("id") id: number): Promise<Account> {
        return await this.accountService.findOne(id);
    }
}
