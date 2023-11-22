import {Controller} from "@nestjs/common";
import {AccessRoleService} from "@easy-kit/account/access/role.service";

@Controller("/api/access/role")
export class AccessRoleController {
    constructor(private readonly service: AccessRoleService) {
    }
}
