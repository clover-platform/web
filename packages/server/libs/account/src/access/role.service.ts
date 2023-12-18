import {Injectable, Logger} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {In, Repository} from "typeorm";
import {I18nService} from "@easy-kit/public/i18n.service";
import {AccessRole, AccessRoleAuthority} from "@easy-kit/account/access/role.entity";
import {AccessRoleDTO, RoleQueryParams} from "@easy-kit/account/access/access.interface";
import {Result} from "@easy-kit/public/result.entity";
import {PageParams} from "@easy-kit/public/public.interface";
import {PageResult} from "@easy-kit/public/page.result.entity";
import { AccessAuthorityService } from "@easy-kit/account/access/authority.service";
import {AuthAccount, AuthAccountRole} from "@easy-kit/account/auth/account.entity";
import {InjectRedis} from "@liaoliaots/nestjs-redis";
import Redis from "ioredis";

@Injectable()
export class AccessRoleService {
    private logger = new Logger(AccessRoleService.name);

    constructor(
        @InjectRepository(AccessRole) private repository: Repository<AccessRole>,
        @InjectRepository(AccessRoleAuthority) private accessRoleAuthorityRepository: Repository<AccessRoleAuthority>,
        @InjectRepository(AuthAccountRole) private authAccountRoleRepository: Repository<AuthAccountRole>,
        @InjectRepository(AuthAccount) private repositoryAuthAccount: Repository<AuthAccount>,
        private i18n: I18nService,
        @InjectRedis() private readonly redis: Redis,
        private accessAuthorityService: AccessAuthorityService,
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
        const ENABLE_MAP = {
            "2": null,
            "1": true,
            "0": false,
            "": null,
        }
        const enable = ENABLE_MAP[query.enable];
        this.logger.log('enable', enable, query.enable);
        let sql = "(name like :keyword or description like :keyword)";
        if(enable !== null) {
            sql += " and enable = :enable";
        }
        const params = {
            keyword: `%${query.keyword}%`,
            enable,
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

    async detail(id: number): Promise<Result<AccessRoleDTO>> {
        const role = await this.repository.findOne({where: {id}});
        const authorities = await this.accessRoleAuthorityRepository.find({where: {roleId: id}});
        const authorityIds = authorities.map(authority => authority.authorityId);
        const tree = await this.accessAuthorityService.treeByIds(authorityIds);
        return Result.success({
            data: {
                id: role.id,
                name: role.name,
                description: role.description,
                enable: role.enable,
                authorities: authorityIds,
                authorityTree: tree
            }
        });
    }

    async edit(role: AccessRoleDTO): Promise<Result<any>> {
        const {id, name, description, enable} = role;
        const exist = await this.repository.findOne({where: {name}});
        if (exist && exist.id !== id) {
            return Result.error({message: this.i18n.t("access.role.exist")} );
        }
        await this.repository.update({id}, {name, description, enable});
        await this.saveAuthorities(id, role.authorities);
        await this.offlineByRole(id);
        return Result.success();
    }

    async disable(id: number): Promise<Result<any>> {
        await this.repository.update({id}, {enable: false});
        await this.offlineByRole(id);
        return Result.success();
    }

    async enable(id: number): Promise<Result<any>> {
        await this.repository.update({id}, {enable: true});
        await this.offlineByRole(id);
        return Result.success();
    }

    async delete(id: number): Promise<Result<any>> {
        await this.repository.delete({id});
        await this.accessRoleAuthorityRepository.delete({roleId: id});
        await this.offlineByRole(id);
        await this.authAccountRoleRepository.delete({roleId: id});
        return Result.success();
    }

    async enableList(): Promise<Result<AccessRole[]>> {
        const roles = await this.repository.find({where: {enable: true}});
        return Result.success({data: roles});
    }

    async saveRoles(accountId: number, roles: number[]): Promise<Result<any>> {
        await this.authAccountRoleRepository.delete({accountId});
        if(roles && roles.length > 0) {
            const as = roles.map(role => {
                return {accountId, roleId: role}
            });
            await this.authAccountRoleRepository.save(as);
        }
        return Result.success();
    }

    async offlineByRole(roleId: number): Promise<Result<any>> {
        const accounts = await this.authAccountRoleRepository.find({where: {roleId}});
        const accountIds = accounts.map(account => account.accountId);
        if(accountIds.length) {
            const accounts = await this.repositoryAuthAccount.find({where: {id: In(accountIds)}});
            for (const account of accounts) {
                const sessionKey = `session:${account.username}:token`;
                const list = await this.redis.lrange(sessionKey, 0, -1);
                for(let key of list) {
                    const tokenKey = `token:${key}`;
                    await this.redis.del(tokenKey);
                }
                const authoritiesKey = `session:${account.username}:authorities`;
                const apisKey = `session:${account.username}:apis`;
                await this.redis.del(authoritiesKey);
                await this.redis.del(apisKey);
                await this.redis.del(sessionKey);
            }
        }
        return Result.success();
    }

    async getRolesByNames(names: string[]): Promise<AccessRole[]> {
        return await this.repository.find({where: {name: In(names)}});
    }
}
