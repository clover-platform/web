import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OTPResult, OTPVerifyData } from "@easy-kit/public/public.interface";
import { authenticator } from "otplib";
import { I18nService } from "@easy-kit/public/i18n.service";
import { AuthConfig } from "@easy-kit/config/interface";

@Injectable()
export class OTPService {

    constructor(
        private i18n: I18nService,
        private configService: ConfigService) {}

    private readonly logger = new Logger(OTPService.name);

    async generate(username: string): Promise<OTPResult> {
        const secret = authenticator.generateSecret();
        const url = authenticator.keyuri(username, this.i18n.t('public.app'), secret);
        this.logger.log(username, url);
        return {
            secret,
            qrcode: url,
        };
    }

    verify(data: OTPVerifyData): boolean {
        const authConfig = this.configService.get<AuthConfig>("auth");
        if(authConfig.debug) {
            return data.token === `${authConfig.otpCode}`;
        }
        return authenticator.verify(data);
    }

}
