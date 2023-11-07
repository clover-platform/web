import {Module} from "@nestjs/common";
import AppConfig from '../config/app';
import OrmConfig from "../config/orm";
import { AccountModule } from "@/account/account.module";
import CacheConfig from "../config/cache";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "@/auth/auth.guard";
import { JWT_SECRET } from "@/auth/auth.config";
import { RolesGuard } from "@/auth/roles.guard";
import { PublicModule } from "@/public/public.module";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

@Module({
    imports: [
        CacheConfig,
        AppConfig,
        OrmConfig,
        PublicModule,
        AccountModule,
        JwtModule.register({
            global: true,
            secret: JWT_SECRET,
            signOptions: { expiresIn: '24h' },
        }),
        ThrottlerModule.forRoot([{
            ttl: 60000,
            limit: 120,
        }]),
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
