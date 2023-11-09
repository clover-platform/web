import {Global, Module} from '@nestjs/common';
import { EmailService } from "./email.service";
import {RedlockService} from "./redlock.service";
import {HttpModule} from "@nestjs/axios";
import {CodeService} from "@/public/code.service";

@Global()
@Module({
    imports: [
        HttpModule
    ],
    providers: [
        EmailService,
        RedlockService,
        CodeService
    ],
    controllers: [],
    exports: [
        EmailService,
        RedlockService,
        CodeService
    ]
})
export class PublicModule {}
