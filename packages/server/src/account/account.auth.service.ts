import {Injectable, Logger} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Account} from "@/account/account.entity";
import {Repository} from "typeorm";
import {AccountAuthApp} from "@/account/account.auth.entity";

@Injectable()
export class AccountAuthService {
    private logger = new Logger(AccountAuthService.name);

    constructor(
        @InjectRepository(AccountAuthApp) private accountAuthAppRepository: Repository<AccountAuthApp>,
    ) {}

    async getUrl(name: string): Promise<string> {
        const app = await this.accountAuthAppRepository.findOneBy({ name})
        if(!app)
            return null;
        if(name === 'github') {
            return `${app.authorizeUrl}?client_id=${app.clientId}`;
        }
        return null;
    }
}
