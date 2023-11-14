import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AppAccountController} from "@/account/account.controller";
import {AppAccountService} from "@/account/account.service";
import {AppAccount} from "@/account/account.entity";
import {AccountModule} from "@easy-kit/account";

@Module({
    imports: [
        AccountModule,
        TypeOrmModule.forFeature([
            AppAccount
        ])
    ],
    providers: [
        AppAccountService,
    ],
    controllers: [
        AppAccountController
    ],
})
export class AppAccountModule {}
