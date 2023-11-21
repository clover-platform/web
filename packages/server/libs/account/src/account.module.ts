import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountService } from "./account.service";
import {AccountAuthApp, AccountAuthOpenUser} from "@easy-kit/account/auth/auth.entity";
import {AuthController} from "@easy-kit/account/auth/auth.controller";
import {AuthService} from "@easy-kit/account/auth/auth.service";
import {HttpModule} from "@nestjs/axios";
import {AccessApi} from "@easy-kit/account/access/api.entity";
import {AccessApiService} from "@easy-kit/account/access/api.service";
import { AccessApiController } from "@easy-kit/account/access/api.controller";
import {AccessAuthorityController} from "@easy-kit/account/access/authority.controller";
import {AccessAuthority, AccessAuthorityApi} from "@easy-kit/account/access/authority.entity";
import {AccessAuthorityService} from "@easy-kit/account/access/authority.service";

export const AccountOrmModule = TypeOrmModule.forFeature([
    Account,
    AccountAuthApp,
    AccountAuthOpenUser,
    AccessApi,
    AccessAuthority,
    AccessAuthorityApi
]);

@Module({
    imports: [
        HttpModule,
        AccountOrmModule,
    ],
    providers: [
        AccountService,
        AuthService,
        AccessApiService,
        AccessAuthorityService
    ],
    controllers: [
        AuthController,
        AccessApiController,
        AccessAuthorityController
    ],
    exports: [
        AccountOrmModule,
        AccountService,
        AuthService,
        AccessApiService,
        AccessAuthorityService
    ]
})
export class AccountModule {}
