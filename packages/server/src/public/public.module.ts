import {Global, Module} from '@nestjs/common';
import { EmailService } from "./email.service";
import {RedlockService} from "./redlock.service";
import {HttpModule} from "@nestjs/axios";

@Global()
@Module({
    imports: [
        HttpModule
    ],
    providers: [
        EmailService,
        RedlockService
    ],
    controllers: [],
    exports: [
        EmailService,
        RedlockService
    ]
})
export class PublicModule {}
