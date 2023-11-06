import {Module} from "@nestjs/common";
import AppConfig from '../config/app';
import OrmConfig from "../config/orm";
import { DataSource } from 'typeorm';
import { AccountModule } from "../account/account.module";
import CacheConfig from "../config/cache";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "../auth/auth.guard";
import { JWT_SECRET } from "../auth/auth.config";
import { RolesGuard } from "../auth/roles.guard";
import {GlobalModule} from "./global.module";

@Module({
    imports: [
        CacheConfig,
        AppConfig,
        OrmConfig,
        GlobalModule,
        AccountModule,
        JwtModule.register({
            global: true,
            secret: JWT_SECRET,
            signOptions: { expiresIn: '24h' },
        })
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
        }
    ]
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
}