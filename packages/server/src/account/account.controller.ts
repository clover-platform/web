import {Body, Controller, Get, Param, Post, UseInterceptors} from "@nestjs/common";
import { AccountService } from "./account.service";
import { Account } from "./account.entity";
import { CacheInterceptor, CacheKey, CacheTTL } from "@nestjs/cache-manager";
import { Public } from "../auth/auth.decorator";

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
        @Body() info: {username: string, password: string},
    ): Promise<LoginResult> {
        console.log(info);
        return await this.accountService.login(info.username, info.password);
    }

    @Public()
    @Get("/info/:id")
    async info(@Param("id") id: number): Promise<Account> {
        return await this.accountService.findOne(id);
    }
}
