import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AuthAccount, AuthAccountRole} from './auth/account.entity';
import { AuthAccountService } from "./auth/account.service";
import { AuthApp, AuthOpenUser } from "@easy-kit/account/auth/auth.entity";
import {AuthController} from "@easy-kit/account/auth/auth.controller";
import {AuthService} from "@easy-kit/account/auth/auth.service";
import {HttpModule} from "@nestjs/axios";
import {AccessApi} from "@easy-kit/account/access/api.entity";
import {AccessApiService} from "@easy-kit/account/access/api.service";
import { AccessApiController } from "@easy-kit/account/access/api.controller";
import {AccessAuthorityController} from "@easy-kit/account/access/authority.controller";
import {AccessAuthority, AccessAuthorityApi} from "@easy-kit/account/access/authority.entity";
import {AccessAuthorityService} from "@easy-kit/account/access/authority.service";
import {AccessRole, AccessRoleAuthority} from "@easy-kit/account/access/role.entity";
import {AccessRoleService} from "@easy-kit/account/access/role.service";
import {AccessRoleController} from "@easy-kit/account/access/role.controller";
import {AccessService} from "@easy-kit/account/access/access.service";

export const AccountOrmModule = TypeOrmModule.forFeature([
    AuthAccount,
    AuthAccountRole,
    AuthApp,
    AuthOpenUser,
    AccessApi,
    AccessAuthority,
    AccessAuthorityApi,
    AccessRole,
    AccessRoleAuthority
]);

@Module({
    imports: [
        HttpModule,
        AccountOrmModule,
    ],
    providers: [
        AuthAccountService,
        AuthService,
        AccessApiService,
        AccessAuthorityService,
        AccessRoleService,
        AccessService
    ],
    controllers: [
        AuthController,
        AccessApiController,
        AccessAuthorityController,
        AccessRoleController
    ],
    exports: [
        AccountOrmModule,
        AuthAccountService,
        AuthService,
        AccessApiService,
        AccessAuthorityService,
        AccessRoleService,
        AccessService
    ]
})
export class AuthAccountModule {}
