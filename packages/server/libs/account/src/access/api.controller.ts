import { Controller, Get } from "@nestjs/common";
import { AccessApiService } from "@easy-kit/account/access/api.service";
import { AccessApi } from "@easy-kit/account/access/api.entity";

@Controller("/api/access/api")
export class AccessApiController {
    constructor(private readonly service: AccessApiService) {}
    @Get("/list")
    async list(): Promise<AccessApi[]> {
        return this.service.list();
    }
}
