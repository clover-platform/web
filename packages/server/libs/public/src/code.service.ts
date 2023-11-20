import { Inject, Injectable, Logger } from "@nestjs/common";
import {Result} from "@easy-kit/public/result.entity";
import {CheckCodeParams, SendCodeParams} from "@easy-kit/public/public.interface";
import {EmailCode} from "@easy-kit/public/public.interface";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Cache} from "cache-manager";
import {EmailService} from "@easy-kit/public/email.service";
import {genCode} from "@easy-kit/common/utils/random";
import {I18nService} from "@easy-kit/public/i18n.service";
import { ConfigService } from "@nestjs/config";
import { AuthConfig } from "@easy-kit/config/interface";

@Injectable()
export class CodeService {
    private logger = new Logger(CodeService.name);
    constructor(
        @Inject(CACHE_MANAGER) private cacheService: Cache,
        private emailService: EmailService,
        private i18n: I18nService,
        private configService: ConfigService,
    ) {}

    private async newCode(redisKey: string): Promise<EmailCode> {
        const authConfig = this.configService.get<AuthConfig>("auth");
        const code = {
            code: authConfig.debug ? `${authConfig.emailCode}` : genCode(),
            createdAt: Date.now(),
        };
        await this.cacheService.set<EmailCode>(redisKey, code, { ttl: 60 * 5 });
        return code;
    }

    async send(params: SendCodeParams): Promise<Result<any>> {
        const { email, action } = params;
        const codeKey = `email:code:${action}:${email}`;
        const timeKey = `email:code:${action}:${email}:send:time`;
        let code = await this.cacheService.get<EmailCode>(codeKey);
        if(code) {
            const lastTime = await this.cacheService.get<number>(timeKey);
            const offset = Date.now() - code.createdAt;
            if(lastTime && Date.now()  - lastTime < 60 * 1000)
                return Result.error({code: 1, message: this.i18n.t("public.throttle")})
            if(offset > 4 * 60 * 1000)
                code = await this.newCode(codeKey);
        } else {
            code = await this.newCode(codeKey);
        }
        await this.cacheService.set(timeKey, Date.now(), { ttl: 60 });
        const authConfig = this.configService.get<AuthConfig>("auth");
        if(!authConfig.debug) { // 如果不调试，则真的发送验证码
            const sent = await this.emailService.singleSendMail({
                email,
                subject: this.i18n.t(`mail.title.code.${action}`),
                template: "code",
                data: {
                    code: code.code
                }
            });
            if(!sent) {
                await this.cacheService.del(codeKey);
                await this.cacheService.del(timeKey);
                return Result.error({code: 2, message: this.i18n.t("mail.fail")})
            }
        }
        return Result.success(null);
    }

    async check(params: CheckCodeParams): Promise<boolean> {
        const { email, action } = params;
        const codeKey = `email:code:${action}:${email}`;
        let code = await this.cacheService.get<EmailCode>(codeKey);
        return !(!code || code.code !== params.code);
    }

}