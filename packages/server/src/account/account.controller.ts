import { Controller, Get, Param, Post, Query, SetMetadata, UseGuards, UseInterceptors } from "@nestjs/common";
import { AccountService } from "./account.service";
import { Account } from "./account.entity";
import { CacheInterceptor, CacheKey, CacheTTL } from "@nestjs/cache-manager";
import { Public, Roles } from "../auth/auth.decorator";

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

    @Public()
    @Post("/login")
    async login(
        @Query("username") username: string,
        @Query("password") password: string
    ): Promise<LoginResult> {
        return await this.accountService.login(username, password);
    }

    @Public()
    @Get("/info/:id")
    async info(@Param("id") id: number): Promise<Account> {
        return await this.accountService.findOne(id);
    }
}
