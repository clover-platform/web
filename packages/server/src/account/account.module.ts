import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountService } from "./account.service";
import { AccountController } from "./account.controller";
import {AccountAuthApp, AccountAuthOpenUser} from "@/account/account.auth.entity";
import {AccountAuthController} from "@/account/account.auth.controller";
import {AccountAuthService} from "@/account/account.auth.service";
import {HttpModule} from "@nestjs/axios";

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forFeature([
            Account,
            AccountAuthApp,
            AccountAuthOpenUser
        ])
    ],
    providers: [
        AccountService,
        AccountAuthService
    ],
    controllers: [
        AccountController,
        AccountAuthController
    ],
})
export class AccountModule {}
