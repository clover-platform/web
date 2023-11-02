import { Controller, Get, Param, SetMetadata, UseGuards, UseInterceptors } from "@nestjs/common";
import { AccountService } from "./account.service";
import { Account } from "./account.entity";
import { CacheInterceptor, CacheKey, CacheTTL } from "@nestjs/cache-manager";
import { Roles } from "../guard/roles.decorator";
import { RolesGuard } from "../guard/roles.guard";

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

    @UseGuards(RolesGuard)
    @Roles('admin')
    @Get("/:id")
    async info(@Param("id") id: number): Promise<Account> {
        return await this.accountService.findOne(id);
    }
}
