import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import OpenApiUtil from '@alicloud/openapi-util';
import * as $Util from '@alicloud/tea-util';

@Injectable()
export class EmailService {

    constructor(private configService: ConfigService) {}

    private createClient(): OpenApi {
        const emailConfig = this.configService.get("email");
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
        body: string,
    }): Promise<boolean> {
        const emailConfig = this.configService.get("email");
        let client = this.createClient();
        let params = this.createApiInfo();
        let queries : {[key: string ]: any} = { };
        queries["AccountName"] = emailConfig.accountName;
        queries["AddressType"] = 1;
        queries["ReplyToAddress"] = true;
        queries["ToAddress"] = data.email;
        queries["Subject"] = data.subject;
        queries["HtmlBody"] = data.body;
        // runtime options
        let runtime = new $Util.RuntimeOptions({ });
        let request = new $OpenApi.OpenApiRequest({
            query: OpenApiUtil.query(queries),
        });
        try{
            const { httpStatus } = await client.callApi(params, request, runtime);
            console.log(httpStatus);
            return httpStatus === 200;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

}
