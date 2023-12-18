import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Assets} from "@easy-kit/assets/assets.entity";

@Injectable()
export class AssetsTasks {
    private readonly logger = new Logger(AssetsTasks.name);


    constructor(
        @InjectRepository(Assets) private repository: Repository<Assets>,
    ) {}

    @Cron('0 0 1 * * *')
    clean() {
        this.logger.log('clean assets.');
        this.repository.delete({temporary: true});
    }
}
