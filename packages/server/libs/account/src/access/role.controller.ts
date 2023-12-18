import {Body, Controller, Get, Post, Query, Param, Put, Delete} from "@nestjs/common";
import {AccessRoleService} from "@easy-kit/account/access/role.service";
import {AccessRoleDTO, RoleQueryParams} from "@easy-kit/account/access/access.interface";
import {Result} from "@easy-kit/public/result.entity";
import {PageParams} from "@easy-kit/public/public.interface";
import {PageResult} from "@easy-kit/public/page.result.entity";
import {AccessRole} from "@easy-kit/account/access/role.entity";

@Controller("/api/access/role")
export class AccessRoleController {
    constructor(private readonly service: AccessRoleService) {
    }

    @Post("/create")
    async add(@Body() role: AccessRoleDTO): Promise<Result<any>> {
        return this.service.add(role);
    }

    @Get("/list")
    async list(@Query() page: PageParams, @Query() query: RoleQueryParams): Promise<Result<PageResult<AccessRole>>> {
        return this.service.query(page, query);
    }

    @Get("/enable")
    async enableList(): Promise<Result<AccessRole[]>> {
        return this.service.enableList();
    }

    @Get("/:id/detail")
    async detail(@Param() params: {id: number}): Promise<Result<AccessRoleDTO>> {
        return this.service.detail(Number(params.id));
    }

    @Put("/:id")
    async edit(@Param() params: {id: number}, @Body() role: AccessRoleDTO): Promise<Result<any>> {
        role.id = Number(params.id);
        return this.service.edit(role);
    }

    @Put("/:id/disable")
    async disable(@Param() params: {id: number}): Promise<Result<any>> {
        return this.service.disable(Number(params.id));
    }

    @Put("/:id/enable")
    async enable(@Param() params: {id: number}): Promise<Result<any>> {
        return this.service.enable(Number(params.id));
    }

    @Delete("/:id")
    async delete(@Param() params: {id: number}): Promise<Result<any>> {
        return this.service.delete(Number(params.id));
    }
}
