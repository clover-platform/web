import { Body, Controller, Get, Param, Post, UseInterceptors } from "@nestjs/common";
import { CheckRegisterEmailRequest, CheckRegisterEmailResult } from "@/account/account.interface";
import { Account } from "./account.entity";
import { CacheInterceptor, CacheKey, CacheTTL } from "@nestjs/cache-manager";
import { Public } from "@/auth/auth.decorator";
import { Redlock } from "@/public/redlock.decorator";
import { Result } from "@/public/result.entity";
import { Throttle } from "@nestjs/throttler";
import { AccountService } from "@/account/account.service";
import { I18n, I18nContext } from "nestjs-i18n";

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
    @Post("/register/email/check")
    async checkRegisterEmail(@Body() request: CheckRegisterEmailRequest): Promise<CheckRegisterEmailResult> {
        return this.accountService.checkRegisterEmail(request);
    }

    @Public()
    @Throttle({default: { limit: 10, ttl: 60000 }})
    @Post("/register/email/send")
    async sendRegisterEmail(@Body() request: {email: string}, @I18n() i18n: I18nContext): Promise<Result<any>> {
        return await this.accountService.sendRegisterEmail(i18n, request.email);
    }

    @Public()
    @Get("/info/:id")
    async info(@Param("id") id: number): Promise<Account> {
        return await this.accountService.findOne(id);
    }

    @Public()
    @Get("/test")
    @Redlock(["test"], 5000)
    test(): string {
        return "test";
    }

    @Get("/profile")
    profile(): Account {
        return new Account();
    }
}
