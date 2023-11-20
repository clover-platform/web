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

export const AccountOrmModule = TypeOrmModule.forFeature([
    Account,
    AccountAuthApp,
    AccountAuthOpenUser,
    AccessApi
]);

@Module({
    imports: [
        HttpModule,
        AccountOrmModule,
    ],
    providers: [
        AccountService,
        AuthService,
        AccessApiService
    ],
    controllers: [
        AuthController,
        AccessApiController
    ],
    exports: [
        AccountService,
        AuthService,
        AccessApiService,
        AccountOrmModule,
    ]
})
export class AccountModule {}
