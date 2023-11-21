import {Body, Controller, Get, Post} from "@nestjs/common";
import {AccessAuthorityService} from "@easy-kit/account/access/authority.service";
import {Public} from "@easy-kit/auth/auth.decorator";
import {AddAuthorityRequest, AuthorityTree} from "@easy-kit/account/access/access.interface";
import {Result} from "@easy-kit/public/result.entity";

@Controller("/api/access/authority")
export class AccessAuthorityController {
    constructor(private readonly service: AccessAuthorityService) {}

    @Post("/add")
    @Public()
    async add(@Body() authority: AddAuthorityRequest): Promise<Result<any>> {
        return this.service.add(authority);
    }

    @Get("/tree")
    @Public()
    async tree(): Promise<AuthorityTree[]> {
        return this.service.tree();
    }
}
