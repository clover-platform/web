import {Injectable, Logger, Res} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {I18nService} from "@easy-kit/public/i18n.service";
import {AccessRole, AccessRoleAuthority} from "@easy-kit/account/access/role.entity";
import {AccessRoleDTO, RoleQueryParams} from "@easy-kit/account/access/access.interface";
import {Result} from "@easy-kit/public/result.entity";
import {PageParams} from "@easy-kit/public/public.interface";
import {types} from "sass";
import List = types.List;
import {PageResult} from "@easy-kit/public/page.result.entity";

@Injectable()
export class AccessRoleService {
    private logger = new Logger(AccessRoleService.name);

    constructor(
        @InjectRepository(AccessRole) private repository: Repository<AccessRole>,
        @InjectRepository(AccessRoleAuthority) private accessRoleAuthorityRepository: Repository<AccessRoleAuthority>,
        private i18n: I18nService,
    ) {
    }

    async saveAuthorities(id: number, authorities: number[]) {
        await this.accessRoleAuthorityRepository.delete({roleId: id});
        if (authorities && authorities.length > 0) {
            const as = authorities.map(authority => {
                return {roleId: id, authorityId: authority}
            });
            await this.accessRoleAuthorityRepository.save(as);
        }
    }

    async add(role: AccessRoleDTO): Promise<Result<any>> {
        this.logger.log("add role");
        const {name, description} = role;
        const exist = await this.repository.findOne({where: {name}});
        if (exist) {
            return Result.error({message: this.i18n.t("access.role.exist")} );
        }
        const data = await this.repository.save({name, description});
        this.logger.log(`add role ${data.id}`);
        await this.saveAuthorities(data.id, role.authorities);
        return Result.success();
    }

    async query(page: PageParams, query: RoleQueryParams):Promise<Result<PageResult<AccessRole>>> {
        const sql = "(name like :keyword or description like :keyword)";
        const params = {
            keyword: `%${query.keyword}%`
        };
        const total = await this.repository.createQueryBuilder()
            .select()
            .where(sql, params)
            .getCount()
        const all = await this.repository.createQueryBuilder()
            .select()
            .where(sql, params)
            .skip(page.size * (page.page - 1))
            .take(page.size)
            .getMany();
        return Result.success({data: PageResult.of<AccessRole>(total, all)});
    }
}
