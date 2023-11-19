import {Body, Controller, Get, Param, Post, Query, Res} from "@nestjs/common";
import {AuthService} from "@easy-kit/account/auth/auth.service";
import {Public} from "@easy-kit/auth/auth.decorator";
import { Response } from 'express';
import {BindRequest} from "@easy-kit/account/auth/auth.interface";

@Controller("/api/account/auth")
export class AuthController {
    constructor(private readonly accountAuthService: AuthService) {}

    @Get("/link/:type")
    @Public()
    async link(@Param() params: {type: string}, @Res() res: Response,) {
        const url = await this.accountAuthService.getUrl(params.type);
        if(url == null) {
            res.redirect("/link/error/")
        }
        res.redirect(url);
    }

    @Get("/link/:type/code")
    @Public()
    async code(@Param() params: {type: string}, @Query() query: {code: string}) {
        return await this.accountAuthService.info(params.type, query.code);
    }

    @Post("/bind")
    @Public()
    async bind(@Body() request: BindRequest) {
        return await this.accountAuthService.bind(request);
    }
}
