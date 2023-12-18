import {Module} from "@nestjs/common";
import {Assets} from "./assets.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AssetsService} from "./assets.service";
import {AssetsController} from "./assets.controller";
import {AssetsTasks} from "@easy-kit/assets/assets.task";

export const AssetsOrmModule = TypeOrmModule.forFeature([
    Assets
]);

@Module({
    imports: [
        AssetsOrmModule,
    ],
    providers: [
        AssetsService,
        AssetsTasks,
    ],
    controllers: [
        AssetsController,
    ],
    exports: [
        AssetsOrmModule,
        AssetsService,
        AssetsTasks,
    ]
})
export class AssetsModule {}
