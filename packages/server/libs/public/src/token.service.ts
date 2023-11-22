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

@Injectable()
export class TokenService {

    private logger = new Logger(TokenService.name);

    constructor(
        @Inject(CACHE_MANAGER) private cacheService: Cache,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async create(payload: object, options: TokenOptions): Promise<TokenResult> {
        const authConfig = this.configService.get<AuthConfig>("auth");
        const token = await this.jwtService.signAsync(payload, {
            secret: authConfig.jwtSecret,
            expiresIn: options.expiresIn
        });
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

}
