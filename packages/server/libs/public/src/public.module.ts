import {Global, Module} from '@nestjs/common';
import { EmailService } from "./email.service";
import {RedlockService} from "./redlock.service";
import {HttpModule} from "@nestjs/axios";
import {CodeService} from "@easy-kit/public/code.service";
import {TokenService} from "@easy-kit/public/token.service";
import {I18nService} from "@easy-kit/public/i18n.service";
import { OTPService } from "@easy-kit/public/otp.service";
import RedisConfig from "@easy-kit/config/redis";
import { AppContext } from "@easy-kit/public/app.context";

@Global()
@Module({
    imports: [
        RedisConfig,
        HttpModule,
    ],
    providers: [
        EmailService,
        RedlockService,
        CodeService,
        TokenService,
        I18nService,
        OTPService,
        AppContext,
    ],
    controllers: [],
    exports: [
        EmailService,
        RedlockService,
        CodeService,
        TokenService,
        I18nService,
        OTPService,
        AppContext
    ]
})
export class PublicModule {}
