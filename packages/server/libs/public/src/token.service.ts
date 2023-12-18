import {Inject, Injectable, Logger, UnauthorizedException} from "@nestjs/common";
import {TokenOptions, TokenResult} from "@easy-kit/account/auth/account.interface";
import {md5} from "@easy-kit/common/utils/crypto";
import ms from "ms";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Cache} from "cache-manager";
import {JwtService} from "@nestjs/jwt";
import {SessionUser} from "@easy-kit/auth/auth.interface";
import {ConfigService} from "@nestjs/config";
import {AuthConfig} from "@easy-kit/config/interface";
import Redis from "ioredis";
import { InjectRedis } from "@liaoliaots/nestjs-redis";

@Injectable()
export class TokenService {

    private logger = new Logger(TokenService.name);

    constructor(
        @Inject(CACHE_MANAGER) private cacheService: Cache,
        @InjectRedis() private readonly redis: Redis,
        // or // @InjectRedis(DEFAULT_REDIS_NAMESPACE) private readonly redis: Redis
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async create(payload: any, options: TokenOptions): Promise<TokenResult> {
        const authConfig = this.configService.get<AuthConfig>("auth");
        const token = await this.jwtService.signAsync(payload, {
            secret: authConfig.jwtSecret,
            expiresIn: options.expiresIn
        });
        const hash = md5(token);
        const tokenKey = `token:${hash}`;
        const sessionKey = `session:${payload.username}:token`;
        const ttl = ms(options.expiresIn);
        await this.cacheService.set(tokenKey,token, { ttl: ttl/1000 });
        const list = await this.redis.lrange(sessionKey, 0, -1);
        for(let key of list) {
            const exists = await this.redis.exists(`token:${key}`);
            if(exists) continue;
            this.redis.lrem(sessionKey, 1, key)
        }
        await this.redis.lpush(sessionKey, hash);
        return {
            token: hash,
            expiresIn: Date.now() + ttl
        };
    }

    async verify(token: string): Promise<SessionUser|null> {
        const jwtToken = await this.cacheService.get<string>(`token:${token}`);
        if(!jwtToken) {
            throw new UnauthorizedException();
        }
        try {
            const authConfig = this.configService.get<AuthConfig>("auth");
            return await this.jwtService.verifyAsync(
                jwtToken,
                { secret: authConfig.jwtSecret }
            );
        } catch(e) {
            this.logger.error(e);
            throw new UnauthorizedException();
        }
    }

    async logout(token: string): Promise<number> {
        const sessionUser = await this.verify(token);
        const tokenKey = `token:${token}`;
        const sessionKey = `session:${sessionUser.username}:token`;
        await this.cacheService.del(tokenKey);
        await this.redis.lrem(sessionKey, 1, token);
        return this.redis.llen(sessionKey);
    }

}
