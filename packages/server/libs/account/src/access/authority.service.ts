import {Injectable, Logger} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AccessAuthority, AccessAuthorityApi} from "@easy-kit/account/access/authority.entity";
import {AddAuthorityRequest, AuthorityTree} from "@easy-kit/account/access/access.interface";
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

    async add(authority: AddAuthorityRequest): Promise<Result<any>> {
        this.logger.log("add authority");
        const {parentId, name, key} = authority;
        const exist = await this.repository.findOne({where: {key}});
        if (exist) {
            return Result.error({message: this.i18n.t("access.authority.exist")} );
        }
        const data = await this.repository.save({parentId, name, key});
        this.logger.log(`add authority ${data.id}`);
        if(authority.apis && authority.apis.length > 0) {
            const apis = authority.apis.map(api => {
                return {authorityId: data.id, apiId: api}
            });
            await this.repositoryAccessAuthorityApi.save(apis);
        }
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

}
