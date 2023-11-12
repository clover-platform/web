import {Inject, Injectable, Logger, UnauthorizedException} from "@nestjs/common";
import {TokenOptions, TokenResult} from "@/account/account.interface";
import {md5} from "@clover-lib/common/utils/crypto";
import ms from "ms";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Cache} from "cache-manager";
import {JwtService} from "@nestjs/jwt";
import {JWT_SECRET} from "@/auth/auth.config";
import {SessionUser} from "@/auth/auth.interface";

@Injectable()
export class TokenService {

    private logger = new Logger(TokenService.name);

    constructor(
        @Inject(CACHE_MANAGER) private cacheService: Cache,
        private jwtService: JwtService,
    ) {}

    async create(payload: object, options: TokenOptions): Promise<TokenResult> {
        const token = await this.jwtService.signAsync(payload, { expiresIn: options.expiresIn });
        const hash = md5(token);
        const tokenKey = `token:${hash}`;
        const ttl = ms(options.expiresIn)/1000;
        await this.cacheService.set(tokenKey,token, { ttl });
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
            return await this.jwtService.verifyAsync(
                jwtToken,
                {
                    secret: JWT_SECRET
                }
            );
        } catch(e) {
            this.logger.error(e);
            throw new UnauthorizedException();
        }
    }

}
