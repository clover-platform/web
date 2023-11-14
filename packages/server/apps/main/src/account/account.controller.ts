import {Body, Controller, Get, Logger, Post, Req} from "@nestjs/common";
import {
    CheckRegisterEmailRequest, CheckResetEmailRequest,
    ResetPasswordRequest,
    SetPasswordRequest,
    TokenResult
} from "@easy-kit/account/account.interface";
import { Public } from "@easy-kit/auth/auth.decorator";
import { Result } from "@easy-kit/public/result.entity";
import { Throttle } from "@nestjs/throttler";
import { AccountService } from "@easy-kit/account/account.service";
import { SessionUser } from "@easy-kit/auth/auth.interface";
import {AppAccount} from "@/account/account.entity";
import {AppAccountService} from "@/account/account.service";
import {LoginRequest} from "@/account/account.interface";
import { OTPResult } from "@easy-kit/public/public.interface";

@Controller("/api/account")
export class AppAccountController {
    private logger = new Logger(AppAccountController.name);

    constructor(
        private readonly service: AppAccountService,
        private readonly accountService: AccountService
    ) {}

    @Get("/otp/secret/")
    async otpSecret(@Req() request: Request): Promise<OTPResult|Result<any>> {
        const user: SessionUser = request['user'];
        return await this.accountService.otpSecret(user.sub);
    }

    @Public()
    @Throttle({default: { limit: 10, ttl: 60000 }})
    @Post("/register/email/send")
    async sendRegisterEmail(@Body() request: {email: string}): Promise<Result<any>> {
        return this.service.sendRegisterEmail(request.email);
    }

    @Public()
    @Post("/register/email/check")
    async checkRegisterEmail(@Body() request: CheckRegisterEmailRequest): Promise<TokenResult|Result<any>> {
        return this.service.checkRegisterEmail(request);
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
    @Throttle({default: { limit: 10, ttl: 60000 }})
    @Post("/reset/email/send")
    async sendResetEmail(@Body() request: {email: string}): Promise<Result<any>> {
        return await this.service.sendResetEmail(request.email);
    }

    @Public()
    @Post("/reset/email/check")
    async checkResetEmail(@Body() request: CheckResetEmailRequest): Promise<TokenResult|Result<any>> {
        return this.service.checkResetEmail(request);
    }

    @Post("/reset/password")
    async resetPassword(
        @Req() req: Request,
        @Body() request: ResetPasswordRequest
    ): Promise<TokenResult|Result<any>> {
        const user: SessionUser = req['user'];
        request.id = user.sub;
        return this.accountService.resetPassword(request);
    }

    @Public()
    @Post("/login")
    async login(@Body() request: LoginRequest): Promise<Result<any>> {
        return this.service.login(request.account, request.password);
    }

    @Get("/profile")
    profile(): AppAccount {
        return new AppAccount();
    }
}
