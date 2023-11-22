import {Injectable, Logger} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {I18nService} from "@easy-kit/public/i18n.service";
import {AccessRole, AccessRoleAuthority} from "@easy-kit/account/access/role.entity";

@Injectable()
export class AccessRoleService {
    private logger = new Logger(AccessRoleService.name);

    constructor(
        @InjectRepository(AccessRole) private repository: Repository<AccessRole>,
        @InjectRepository(AccessRoleAuthority) private accessRoleAuthorityRepository: Repository<AccessRoleAuthority>,
        private i18n: I18nService,
    ) {
    }
}
