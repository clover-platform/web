import {Injectable, Logger} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AccessAuthority, AccessAuthorityApi} from "@easy-kit/account/access/authority.entity";
import {AccessAuthorityDTO, AuthorityTree} from "@easy-kit/account/access/access.interface";
import {Result} from "@easy-kit/public/result.entity";
import {I18nService} from "@easy-kit/public/i18n.service";
import { uniq } from "lodash";
import {AccessRoleAuthority} from "@easy-kit/account/access/role.entity";

@Injectable()
export class AccessAuthorityService {
    private logger = new Logger(AccessAuthorityService.name);

    constructor(
        @InjectRepository(AccessAuthority) private repository: Repository<AccessAuthority>,
        @InjectRepository(AccessAuthorityApi) private repositoryAccessAuthorityApi: Repository<AccessAuthorityApi>,
        @InjectRepository(AccessRoleAuthority) private repositoryAccessRoleAuthority: Repository<AccessRoleAuthority>,
        private i18n: I18nService,
    ) {}

    async saveApis(id: number, apis: number[]){
        await this.repositoryAccessAuthorityApi.delete({authorityId: id});
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
        await this.repository.update({id}, {parentId, name, key});
        await this.saveApis(id, authority.apis);
        return Result.success();
    }

    pushChildren(id: number, all:AccessAuthority[]): AuthorityTree[] {
        const children: AuthorityTree[] = [];
        all.forEach(item => {
            if (item.parentId === id) {
                children.push({
                    ...item,
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
                    ...item,
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

    private findNodeById = (nodes: AuthorityTree[], id: number): AuthorityTree => {
        for(let node of nodes) {
            if(node.id === id) {
                return node;
            }
            if(node.children) {
                const n = this.findNodeById(node.children, id);
                if(n) return n;
            }
        }
        return null;
    }

    private getIds(node: AuthorityTree) {
        const ids = [node.id];
        if(node.children) {
            node.children.forEach((n) => {
                ids.push(...this.getIds(n));
            });
        }
        return ids;
    }

    async delete(id: number): Promise<Result<any>> {
        this.logger.log(`delete authority ${id}`);
        const tree = await this.tree();
        const node = this.findNodeById(tree, Number(id));
        const ids = this.getIds(node);
        await this.repository.createQueryBuilder()
            .delete()
            .where("id in (:ids)", {ids})
            .execute()
        await this.repositoryAccessAuthorityApi.createQueryBuilder()
            .delete()
            .where("authorityId in (:ids)", {ids})
            .execute()
        await this.repositoryAccessRoleAuthority.createQueryBuilder()
            .delete()
            .where("authorityId in (:ids)", {ids})
            .execute()
        return Result.success();
    }

    private getAllParentIds(full: AuthorityTree[], id: number) {
        const ids = [];
        const node = this.findNodeById(full, id);
        let parentId = node.parentId;
        while(parentId) {
            ids.push(parentId);
            const node = this.findNodeById(full, parentId);
            parentId = node.parentId;
        }
        return ids;
    }

    private filterTreeByIds(tree: AuthorityTree[], ids: number[]): AuthorityTree[] {
        const newTree: AuthorityTree[] = [];
        tree.forEach(node => {
            if(ids.includes(node.id)) {
                newTree.push(node);
            }
            if(node.children) {
                node.children = this.filterTreeByIds(node.children, ids);
            }
        });
        return newTree;
    }

    async treeByIds(ids: number[]): Promise<AuthorityTree[]> {
        const fullTree = await this.tree();
        const allIds = [...ids];
        ids.forEach(id => {
            const allParentIds = this.getAllParentIds(fullTree, id);
            allIds.push(...allParentIds)
        });
        const uniqIds = uniq(allIds);
        console.log(uniqIds);
        return this.filterTreeByIds(fullTree, uniqIds)
    }

}
