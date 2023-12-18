import {HttpException, HttpStatus, Injectable, Logger} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {In, Repository} from "typeorm";
import {Assets} from "./assets.entity";
import {I18nService} from "@easy-kit/public/i18n.service";
import {ConfigService} from "@nestjs/config";
import {Result} from "@easy-kit/public/result.entity";
import { Client } from 'minio';
import {AssetsConfig} from "@easy-kit/config/interface";
import { v4 as uuidv4 } from 'uuid';
import {Response} from "express";
import {DownloadAssetsParams} from "@easy-kit/assets/assets.interface";

@Injectable()
export class AssetsService {
    private logger = new Logger(AssetsService.name);

    constructor(
        @InjectRepository(Assets) private repository: Repository<Assets>,
        private i18n: I18nService,
        private configService: ConfigService,
    ) {
    }

    private getMinIOClient() {
        const config = this.configService.get<AssetsConfig>("assets");
        return new Client(config.minio)
    }

    async uploadAssets(file: Express.Multer.File, name: string): Promise<Result<any>> {
        try{
            const config = this.configService.get<AssetsConfig>("assets");
            if(config.type === "minio") {
                const client = this.getMinIOClient();
                const exists = await client.bucketExists(config.minio.bucket);
                if(!exists) await client.makeBucket(config.minio.bucket);
                const meta = {
                    'Content-Type': file.mimetype,
                    "Original-Name": encodeURIComponent(file.originalname)
                }
                await client.putObject(config.minio.bucket, name, file.buffer, meta);
            }else{
                Result.error({code: 2, message: this.i18n.t("assets.api.unknown") })
            }
        }catch (e) {
            Result.error({code: 1, message: e.message })
        }
        return Result.success()
    }

    async upload(file: Express.Multer.File, accountId?: number): Promise<Result<string>> {
        const id = uuidv4();
        const apiResult = await this.uploadAssets(file, id);
        if(!apiResult.success) return apiResult;
        const entity = new Assets();
        entity.accountId = accountId;
        entity.id = id;
        entity.name = file.originalname;
        entity.length = file.size;
        entity.contentType = file.mimetype;
        entity.createTime = new Date();
        await this.repository.save(entity);
        return Result.success({data: id});
    }

    async use(ids: string[]): Promise<Result<any>> {
        await this.repository.createQueryBuilder()
            .update()
            .set({temporary: false})
            .whereInIds(ids)
            .execute();
        return Result.success();
    }

    async getAssets(ids: string[]): Promise<Assets[]> {
        return await this.repository.findBy({id: In(ids)});
    }

    async delete(id: string): Promise<Result<any>> {
        const config = this.configService.get<AssetsConfig>("assets");
        if(config.type === "minio") {
            const client = this.getMinIOClient();
            await client.removeObject(config.minio.bucket, id);
        }
        await this.repository.delete(id);
        return Result.success();
    }

    async download(params: DownloadAssetsParams) {
        const config = this.configService.get<AssetsConfig>("assets");
        const assets = await this.repository.findOneBy({id: params.assetsId});
        if(config.type === "minio") {
            const client = this.getMinIOClient();
            const readerStream = await client.getObject(config.minio.bucket, params.assetsId);
            readerStream.on('data', (chunk) => {
                params.res.write(chunk, 'binary');
            });
            params.res.set({
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': 'attachment; filename=' + encodeURIComponent(assets.name),
            });
            readerStream.on('end', () => {
                params.res.end();
            });
            readerStream.on('error', () => {
                throw new HttpException(
                    this.i18n.t("assets.download.error"),
                    HttpStatus.SERVICE_UNAVAILABLE,
                );
            });
        }else{
            throw new HttpException(
                this.i18n.t("assets.download.error"),
                HttpStatus.SERVICE_UNAVAILABLE,
            );
        }
    }
}
