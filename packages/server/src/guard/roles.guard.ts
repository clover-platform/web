import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
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
