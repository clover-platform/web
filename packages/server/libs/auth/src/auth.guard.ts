import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Inject,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {IS_PUBLIC_KEY} from "./auth.config";
import {Reflector} from "@nestjs/core";
import {TokenService} from "@easy-kit/public/token.service";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Cache} from "cache-manager";
import pathToRegexp from 'path-to-regexp';
import { ConfigService } from "@nestjs/config";
import { AuthConfig } from "@easy-kit/config/interface";

interface Api {
    method: string;
    path: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private tokenService: TokenService,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
        private configService: ConfigService,
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
        const sessionUser = await this.tokenService.verify(token);
        if(!sessionUser) {
            throw new UnauthorizedException();
        }
        request['user'] = sessionUser;
        const config = this.configService.get<AuthConfig>('auth');
        if(config.su === sessionUser.username) {
            return true;
        }
        if(config.commonAccess.includes(this.getPath(request))) {
            return true;
        }
        const apis = await this.cacheService.get<Api[]>(`session:${sessionUser.username}:apis`);
        const checked = this.checkApis(apis, request);
        if(!checked) {
            throw new ForbiddenException();
        }
        return true;
    }

    private checkApis(apis: Api[], request: Request): boolean {
        const hit = apis.filter(api => {
            return pathToRegexp(api.path).test(this.getPath(request)) && api.method.toUpperCase() === request.method.toUpperCase();
        })
        return !!hit.length;
    }

    private getPath(request: Request): string {
        return (request as any).route.path;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers['authorization']?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
