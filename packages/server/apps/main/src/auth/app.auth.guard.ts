import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
} from "@nestjs/common";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Cache} from "cache-manager";
import {AccountService} from "@/account/account.service";

@Injectable()
export class AppAuthGuard implements CanActivate {
    constructor(
        @Inject(CACHE_MANAGER) private cacheService: Cache,
        private accountService: AccountService,
    ) {}

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean>  {
        const request = context.switchToHttp().getRequest();
        const sessionUser = request['user'];
        if(sessionUser && sessionUser.username) {
            let info = await this.cacheService.get(`session:${sessionUser.username}:info`);
            if(!info) {
                info = await this.accountService.findByUsername(sessionUser.username);
                await this.cacheService.set(`session:${sessionUser.username}:info`, info, {ttl: 60 * 60 * 24});
            }
            request['userInfo'] = info;
        }
        return true;
    }
}
