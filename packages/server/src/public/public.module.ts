import {Global, Module} from '@nestjs/common';
import { EmailService } from "./email.service";
import {RedlockService} from "./redlock.service";
import {HttpModule} from "@nestjs/axios";
import {CodeService} from "@/public/code.service";
import {TokenService} from "@/public/token.service";

@Global()
@Module({
    imports: [
        HttpModule
    ],
    providers: [
        EmailService,
        RedlockService,
        CodeService,
        TokenService
    ],
    controllers: [],
    exports: [
        EmailService,
        RedlockService,
        CodeService,
        TokenService
    ]
})
export class PublicModule {}
