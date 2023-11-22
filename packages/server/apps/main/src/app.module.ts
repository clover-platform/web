import {Module} from "@nestjs/common";
import AppConfig from '@easy-kit/config/app';
import JWTConfig from "@easy-kit/config/jwt";
import OrmConfig from "@easy-kit/config/orm";
import I18nConfig from '@easy-kit/config/i18n';
import ThrottlerConfig from '@easy-kit/config/throttler';
import CacheConfig from "@easy-kit/config/cache";
import {APP_GUARD} from "@nestjs/core";
import { AuthGuard } from "@easy-kit/auth/auth.guard";
import { RolesGuard } from "@easy-kit/auth/roles.guard";
import { PublicModule } from "@easy-kit/public/public.module";
import { ThrottlerGuard } from "@nestjs/throttler";
import { AuthAccountModule } from "@easy-kit/account";
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
        AuthAccountModule,
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
