import {Injectable, Logger} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AccessApi} from "@easy-kit/account/access/api.entity";

@Injectable()
export class AccessApiService {
    private logger = new Logger(AccessApiService.name);

    constructor(
        @InjectRepository(AccessApi) private repository: Repository<AccessApi>,
    ) {}

    async sync(apis: {method: string, path: string}[]) {
        this.logger.log("sync all apis");
        const list = await this.repository.find();
        const unique = list.map((api) => `${api.method}${api.path}`);
        const uniqueApis = apis.map((api) => `${api.method}${api.path}`);
        const insert = apis.filter((api) => !unique.includes(`${api.method}${api.path}`));
        const remove = list.filter((api) => !uniqueApis.includes(`${api.method}${api.path}`));
        this.logger.log('insert', insert);
        await this.repository.createQueryBuilder()
            .insert()
            .into(AccessApi)
            .values(insert)
            .execute();
        this.logger.log('remove', remove);
        await this.repository.createQueryBuilder()
            .delete()
            .from(AccessApi)
            .whereInIds(remove.map((api) => api.id))
            .execute();
    }

}
