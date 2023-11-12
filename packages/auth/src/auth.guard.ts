import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {IS_PUBLIC_KEY} from "./auth.config";
import {Reflector} from "@nestjs/core";
import {TokenService} from "@easy-kit/public/token.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private tokenService: TokenService,
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
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers['authorization']?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
