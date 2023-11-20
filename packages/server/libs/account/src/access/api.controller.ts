import { Controller, Delete, Get, Put } from "@nestjs/common";
import { Public } from "@easy-kit/auth/auth.decorator";
import { AccessApiService } from "@easy-kit/account/access/api.service";
import { AccessApi } from "@easy-kit/account/access/api.entity";

@Controller("/api/access/api")
export class AccessApiController {
    constructor(private readonly service: AccessApiService) {}

    @Get("/list")
    @Public()
    async list(): Promise<AccessApi[]> {
        return this.service.list();
    }
}
