import {Inject, Injectable} from "@nestjs/common";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Cache} from "cache-manager";
import {ConfigService} from "@nestjs/config";
import {AuthConfig} from "@easy-kit/config/interface";

@Injectable()
export class AccessService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheService: Cache,
        private configService: ConfigService,
    ) {
    }

    async authorities(username: string): Promise<string[]> {
        const authoritiesKey = `session:${username}:authorities`;
        return await this.cacheService.get<string[]>(authoritiesKey);
    }

    async has(username: string, perms: string[] | string, every: boolean = false): Promise<boolean> {
        const config = this.configService.get<AuthConfig>("auth");
        if(username === config.su) return true;
        const authorities = await this.authorities(username);
        if (authorities) {
            let list: string[] = [];
            if(typeof perms === 'string'){
                list = [perms];
            }else{
                list = perms;
            }
            return list[every ? 'every': 'some'](p => authorities.includes(p));
        }
        return false;
    }
}
