import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountService } from "./account.service";
import { AccountController } from "./account.controller";
import {AccountAuthApp} from "@/account/account.auth.entity";
import {AccountAuthController} from "@/account/account.auth.controller";
import {AccountAuthService} from "@/account/account.auth.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Account,
            AccountAuthApp
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
