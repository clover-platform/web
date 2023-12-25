import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AccountController} from "@/account/account.controller";
import {AccountService} from "@/account/account.service";
import {Account} from "@/account/account.entity";
import {AuthAccountModule} from "@easy-kit/account";

@Module({
    imports: [
        AuthAccountModule,
        TypeOrmModule.forFeature([
            Account
        ])
    ],
    providers: [
        AccountService,
    ],
    controllers: [
        AccountController,
    ],
    exports: [
        AccountService
    ]
})
export class AccountModule {}
