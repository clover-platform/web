import {CanActivate, ExecutionContext, Inject, Injectable, Logger, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {IS_PUBLIC_KEY, JWT_SECRET} from "./auth.config";
import {Reflector} from "@nestjs/core";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Cache} from "cache-manager";

@Injectable()
export class AuthGuard implements CanActivate {
    private logger = new Logger(AuthGuard.name);
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
    ) {}

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean>  {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        const jwtToken = await this.cacheService.get<string>(`token:${token}`);
        if(!jwtToken) {
            throw new UnauthorizedException();
        }
        try {
            request['user'] = await this.jwtService.verifyAsync(
                jwtToken,
                {
                    secret: JWT_SECRET
                }
            );
        } catch(e) {
            this.logger.error(e);
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers['authorization']?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
