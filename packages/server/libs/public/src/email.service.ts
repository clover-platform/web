import { Injectable, Logger } from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import OpenApiUtil from '@alicloud/openapi-util';
import * as $Util from '@alicloud/tea-util';
import * as ejs from 'ejs';
import { join } from "path";
import { I18nContext } from "nestjs-i18n";
import {EmailConfig} from "@easy-kit/config/interface";
import {MailerService} from "@nestjs-modules/mailer";
import { AppContext } from "@easy-kit/public/app.context";

@Injectable()
export class EmailService {

    constructor(
        private configService: ConfigService,
        private appContext: AppContext,
    ) {}

    private readonly logger = new Logger(EmailService.name);

    private createClient(): OpenApi {
        const allConfig = this.configService.get<EmailConfig>("email");
        const emailConfig = allConfig.alidm;
        let config = new $OpenApi.Config({
            // 必填，您的 AccessKey ID
            accessKeyId: emailConfig.accessKeyId,
            // 必填，您的 AccessKey Secret
            accessKeySecret: emailConfig.accessKeySecret,
        });
        // Endpoint 请参考 https://api.aliyun.com/product/Dm
        config.endpoint = emailConfig.endpoint;
        return new OpenApi(config);
    }

    private createApiInfo(): $OpenApi.Params {
        return new $OpenApi.Params({
            // 接口名称
            action: "SingleSendMail",
            // 接口版本
            version: "2015-11-23",
            // 接口协议
            protocol: "HTTPS",
            // 接口 HTTP 方法
            method: "POST",
            authType: "AK",
            style: "RPC",
            // 接口 PATH
            pathname: `/`,
            // 接口请求体内容格式
            reqBodyType: "json",
            // 接口响应体内容格式
            bodyType: "json",
        });
    }

    async singleSendMail(data: {
        email: string,
        subject: string,
        data: any,
        template: string,
    }): Promise<boolean> {
        const emailConfig = this.configService.get<EmailConfig>("email");
        if(emailConfig.type === "alidm") {
            return await this.singleSendMailByAlidm(data);
        } else {
            return await this.singleSendMailBySMTP(data);
        }
    }

    async singleSendMailBySMTP(data: {
        email: string,
        subject: string,
        data: any,
        template: string,
    }) {
        const service = this.appContext.app.get(MailerService);
        try {
            await service.sendMail({
                to: data.email,
                subject: data.subject,
                template: `${data.template}.${I18nContext.current().lang}.ejs`,
                context: {
                    ...data.data,
                    title: data.subject
                }
            });
            return true;
        } catch (e) {
            this.logger.error(e);
            return false;
        }
    }

    async singleSendMailByAlidm(data: {
        email: string,
        subject: string,
        data: any,
        template: string,
    }) {
        const emailConfig = this.configService.get<EmailConfig>("email").alidm;
        let client = this.createClient();
        let params = this.createApiInfo();
        let queries : {[key: string ]: any} = { };
        queries["AccountName"] = emailConfig.accountName;
        queries["AddressType"] = 1;
        queries["ReplyToAddress"] = true;
        queries["ToAddress"] = data.email;
        queries["Subject"] = data.subject;
        queries["HtmlBody"] = await this.renderTemplate(data.template, {
            ...data.data,
            title: data.subject
        });
        let runtime = new $Util.RuntimeOptions({ });
        let request = new $OpenApi.OpenApiRequest({
            query: OpenApiUtil.query(queries),
        });
        try{
            const { statusCode } = await client.callApi(params, request, runtime);
            return statusCode === 200;
        } catch (e) {
            this.logger.error(e);
            return false;
        }
    }

    async renderTemplate(template: string, data: any): Promise<string> {
        const emailConfig = this.configService.get<EmailConfig>("email");
        const lang = I18nContext.current().lang;
        return await ejs.renderFile(join(__dirname, `${emailConfig.templateDir}/${template}.${lang}.ejs`), data);
    }

}
