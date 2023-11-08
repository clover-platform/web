import {Module} from "@nestjs/common";
import AppConfig from '../config/app';
import JWTConfig from "../config/jwt";
import OrmConfig from "../config/orm";
import I18nConfig from '../config/i18n';
import ThrottlerConfig from '../config/throttler';
import CacheConfig from "../config/cache";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";
import { PublicModule } from "@/public/public.module";
import { ThrottlerGuard } from "@nestjs/throttler";
import { AccountModule } from "@/account/account.module";

@Module({
    imports: [
        CacheConfig,
        AppConfig,
        OrmConfig,
        JWTConfig,
        ThrottlerConfig,
        I18nConfig,
        PublicModule,
        AccountModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard
        },
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ]
})
export class AppModule {}
