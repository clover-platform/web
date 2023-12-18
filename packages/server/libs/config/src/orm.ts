import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigService} from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm/dist/interfaces/typeorm-options.interface";

export default TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => (configService.get<TypeOrmModuleOptions>("database"))
})
