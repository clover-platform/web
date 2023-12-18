import {Body, Controller, Get, Post, Param, Put, Delete} from "@nestjs/common";
import {AccessAuthorityService} from "@easy-kit/account/access/authority.service";
import {AccessAuthorityDTO, AuthorityTree} from "@easy-kit/account/access/access.interface";
import {Result} from "@easy-kit/public/result.entity";

@Controller("/api/access/authority")
export class AccessAuthorityController {
    constructor(private readonly service: AccessAuthorityService) {}

    @Post("/add")
    async add(@Body() authority: AccessAuthorityDTO): Promise<Result<any>> {
        return this.service.add(authority);
    }

    @Get("/tree")
    async tree(): Promise<AuthorityTree[]> {
        return this.service.tree();
    }

    @Get("/:id/detail")
    async detail(@Param() params: {id: number}): Promise<AccessAuthorityDTO> {
        return this.service.detail(params.id);
    }

    @Put("/:id")
    async edit(@Param() params: {id: number}, @Body() authority: AccessAuthorityDTO): Promise<Result<any>> {
        authority.id = Number(params.id);
        return this.service.edit(authority);
    }

    @Delete("/:id")
    async delete(@Param() params: {id: number}): Promise<Result<any>> {
        return this.service.delete(params.id);
    }
}
