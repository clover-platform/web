import { Module } from "@nestjs/common";
import AppConfig from './config/app';
import OrmConfig from "./config/orm";
import { DataSource } from 'typeorm';
import { AccountModule } from "./account/account.module";

@Module({
    imports: [
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
