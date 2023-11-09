import {Controller, Get, Param, Res} from "@nestjs/common";
import {AccountAuthService} from "@/account/account.auth.service";
import {Public} from "@/auth/auth.decorator";
import { Response } from 'express';

@Controller("/api/account/auth")
export class AccountAuthController {
    constructor(private readonly accountAuthService: AccountAuthService) {}

    @Get("/link/:type")
    @Public()
    async link(@Param() params: {type: string}, @Res() res: Response,) {
        const url = await this.accountAuthService.getUrl(params.type);
        if(url == null) {
            res.redirect("/link/error/")
        }
        res.redirect(url);
    }
}
