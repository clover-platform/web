import {Body, Controller, Get, Post, Param, Put} from "@nestjs/common";
import {AccessAuthorityService} from "@easy-kit/account/access/authority.service";
import {Public} from "@easy-kit/auth/auth.decorator";
import {AccessAuthorityDTO, AuthorityTree} from "@easy-kit/account/access/access.interface";
import {Result} from "@easy-kit/public/result.entity";

@Controller("/api/access/authority")
export class AccessAuthorityController {
    constructor(private readonly service: AccessAuthorityService) {}

    @Post("/add")
    @Public()
    async add(@Body() authority: AccessAuthorityDTO): Promise<Result<any>> {
        return this.service.add(authority);
    }

    @Get("/tree")
    @Public()
    async tree(): Promise<AuthorityTree[]> {
        return this.service.tree();
    }

    @Get("/:id/detail")
    @Public()
    async detail(@Param() params: {id: number}): Promise<AccessAuthorityDTO> {
        return this.service.detail(params.id);
    }

    @Put("/edit")
    @Public()
    async edit(@Body() authority: AccessAuthorityDTO): Promise<Result<any>> {
        return this.service.edit(authority);
    }
}
