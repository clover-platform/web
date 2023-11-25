import {Body, Controller, Get, Logger, Post, Query, Param, Put, Delete} from "@nestjs/common";
import {AccessRoleService} from "@easy-kit/account/access/role.service";
import {Public} from "@easy-kit/auth/auth.decorator";
import {AccessRoleDTO, RoleQueryParams} from "@easy-kit/account/access/access.interface";
import {Result} from "@easy-kit/public/result.entity";
import {PageParams} from "@easy-kit/public/public.interface";
import {PageResult} from "@easy-kit/public/page.result.entity";
import {AccessRole} from "@easy-kit/account/access/role.entity";

@Controller("/api/access/role")
export class AccessRoleController {
    private logger = new Logger(AccessRoleController.name);
    constructor(private readonly service: AccessRoleService) {
    }

    @Post("/create")
    @Public()
    async add(@Body() role: AccessRoleDTO): Promise<Result<any>> {
        return this.service.add(role);
    }

    @Get("/list")
    @Public()
    async list(@Query() page: PageParams, @Query() query: RoleQueryParams): Promise<Result<PageResult<AccessRole>>> {
        return this.service.query(page, query);
    }

    @Get("/:id/detail")
    @Public()
    async detail(@Param() params: {id: number}): Promise<Result<AccessRoleDTO>> {
        return this.service.detail(Number(params.id));
    }

    @Put("/:id")
    @Public()
    async edit(@Param() params: {id: number}, @Body() role: AccessRoleDTO): Promise<Result<any>> {
        role.id = Number(params.id);
        return this.service.edit(role);
    }

    @Put("/:id/disable")
    @Public()
    async disable(@Param() params: {id: number}): Promise<Result<any>> {
        return this.service.disable(Number(params.id));
    }

    @Put("/:id/enable")
    @Public()
    async enable(@Param() params: {id: number}): Promise<Result<any>> {
        return this.service.enable(Number(params.id));
    }

    @Delete("/:id")
    @Public()
    async delete(@Param() params: {id: number}): Promise<Result<any>> {
        return this.service.delete(Number(params.id));
    }
}
