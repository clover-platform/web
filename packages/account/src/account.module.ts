import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountService } from "./account.service";
import {AccountAuthApp, AccountAuthOpenUser} from "@easy-kit/account/account.auth.entity";
import {AccountAuthController} from "@easy-kit/account/account.auth.controller";
import {AccountAuthService} from "@easy-kit/account/account.auth.service";
import {HttpModule} from "@nestjs/axios";

export const AccountOrmModule = TypeOrmModule.forFeature([
    Account,
    AccountAuthApp,
    AccountAuthOpenUser
]);

@Module({
    imports: [
        HttpModule,
        AccountOrmModule,
    ],
    providers: [
        AccountService,
        AccountAuthService
    ],
    controllers: [
        AccountAuthController
    ],
    exports: [
        AccountService,
        AccountAuthService,
        AccountOrmModule
    ]
})
export class AccountModule {}
