import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigService} from "@nestjs/config";

export default TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => (configService.get("database"))
})
