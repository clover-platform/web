import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from "@nestjs/core";
import {IS_PUBLIC_KEY} from "./auth.config";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }

        const roles = this.reflector.get<string[]>('roles', context.getHandler()); // 从控制器注解中得到的角色组信息。
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const hasRole = () => user.roles.some((role) => roles.includes(role)); // 是否匹配到角色
        return user && user.roles && hasRole();
    }
}
