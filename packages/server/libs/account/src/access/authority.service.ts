import {Injectable, Logger} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AccessAuthority, AccessAuthorityApi} from "@easy-kit/account/access/authority.entity";
import {AccessAuthorityDTO, AuthorityTree} from "@easy-kit/account/access/access.interface";
import {Result} from "@easy-kit/public/result.entity";
import {I18nService} from "@easy-kit/public/i18n.service";

@Injectable()
export class AccessAuthorityService {
    private logger = new Logger(AccessAuthorityService.name);

    constructor(
        @InjectRepository(AccessAuthority) private repository: Repository<AccessAuthority>,
        @InjectRepository(AccessAuthorityApi) private repositoryAccessAuthorityApi: Repository<AccessAuthorityApi>,
        private i18n: I18nService,
    ) {}

    async saveApis(id: number, apis: number[]){
        this.repositoryAccessAuthorityApi.delete({authorityId: id});
        if(apis && apis.length > 0) {
            const as = apis.map(api => {
                return {authorityId: id, apiId: api}
            });
            await this.repositoryAccessAuthorityApi.save(as);
        }
    }

    async add(authority: AccessAuthorityDTO): Promise<Result<any>> {
        this.logger.log("add authority");
        const {parentId, name, key} = authority;
        const exist = await this.repository.findOne({where: {key}});
        if (exist) {
            return Result.error({message: this.i18n.t("access.authority.exist")} );
        }
        const data = await this.repository.save({parentId, name, key});
        this.logger.log(`add authority ${data.id}`);
        await this.saveApis(data.id, authority.apis)
        return Result.success();
    }

    async edit(authority: AccessAuthorityDTO): Promise<Result<any>> {
        this.logger.log("edit authority", authority);
        const {id, parentId, name, key} = authority;
        const exist = await this.repository.findOne({where: {key}});
        if (exist && exist.id !== id) { // 存在且不是自己
            return Result.error({message: this.i18n.t("access.authority.exist")} );
        }
        await this.repository.save({id, parentId, name, key});
        await this.saveApis(id, authority.apis);
        return Result.success();
    }

    pushChildren(id: number, all:AccessAuthority[]): AuthorityTree[] {
        const children: AuthorityTree[] = [];
        all.forEach(item => {
            if (item.parentId === id) {
                children.push({
                    id: item.id,
                    name: item.name,
                    key: item.key,
                    children: this.pushChildren(item.id, all),
                });
            }
        });
        return children;
    }

    async tree(): Promise<AuthorityTree[]> {
        this.logger.log("get authority tree");
        const data = await this.repository.find();
        const tree: AuthorityTree[] = [];
        data.forEach(item => {
            if (!item.parentId) {
                tree.push({
                    id: item.id,
                    name: item.name,
                    key: item.key,
                    children: this.pushChildren(item.id, data),
                });
            }
        });
        return tree;
    }

    async detail(id: number): Promise<AccessAuthorityDTO> {
        this.logger.log(`get authority detail ${id}`);
        const authority = await this.repository.findOne({where:{id}});
        const apis = await this.repositoryAccessAuthorityApi.find({where: {authorityId: id}});
        return {
            id: authority.id,
            parentId: authority.parentId,
            name: authority.name,
            key: authority.key,
            apis: apis.map(api => api.apiId),
        };
    }

}