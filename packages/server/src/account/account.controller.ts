import {Body, Controller, Get, Post, Req} from "@nestjs/common";
import {
    CheckRegisterEmailRequest,
    OTPSecretResult,
    SetPasswordRequest,
    TokenResult
} from "@/account/account.interface";
import { Account } from "./account.entity";
import { Public } from "@/auth/auth.decorator";
import { Result } from "@/public/result.entity";
import { Throttle } from "@nestjs/throttler";
import { AccountService } from "@/account/account.service";
import {SessionUser} from "@/auth/auth.interface";

@Controller("/api/account")
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    // @UseInterceptors(CacheInterceptor)
    // @CacheKey('account:list')
    // @CacheTTL(5000)
    // @Get("/list")
    // async list(): Promise<Account[]> {
    //     return await this.accountService.findAll();
    // }

    @Get("/otp/secret/")
    async otpSecret(@Req() request: Request): Promise<OTPSecretResult|Result<any>> {
        const user: SessionUser = request['user'];
        return await this.accountService.otpSecret(user.sub);
    }

    @Post("/register/password/set")
    async setPassword(
        @Req() req: Request,
        @Body() request: SetPasswordRequest
    ): Promise<TokenResult|Result<any>> {
        const user: SessionUser = req['user'];
        request.id = user.sub;
        return this.accountService.setPassword(request);
    }

    @Public()
    @Post("/register/email/check")
    async checkRegisterEmail(@Body() request: CheckRegisterEmailRequest): Promise<TokenResult|Result<any>> {
        return this.accountService.checkRegisterEmail(request);
    }

    @Public()
    @Throttle({default: { limit: 10, ttl: 60000 }})
    @Post("/register/email/send")
    async sendRegisterEmail(@Body() request: {email: string}): Promise<Result<any>> {
        return await this.accountService.sendRegisterEmail(request.email);
    }

    @Get("/profile")
    profile(): Account {
        return new Account();
    }
}
