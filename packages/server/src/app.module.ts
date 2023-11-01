import { Module } from "@nestjs/common";
import AppConfig from './config/app';
import OrmConfig from "./config/orm";
import { DataSource } from 'typeorm';
import { AccountModule } from "./account/account.module";
import CacheConfig from "./config/cache";

@Module({
    imports: [
        CacheConfig,
        AppConfig,
        OrmConfig,
        AccountModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
}
