import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { EmailConfig } from "@easy-kit/config/interface";
import { join } from "path";
import { EjsAdapter } from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";

export default MailerModule.forRootAsync({
    useFactory: async (config: ConfigService) => {
        const emailConfig = config.get<EmailConfig>('email');
        const smtpConfig = emailConfig.smtp;
        return {
            transport: {
                host: smtpConfig.host,
                secure: true,
                port: smtpConfig.port,
                auth: {
                    user: smtpConfig.username,
                    pass: smtpConfig.password,
                },
            },
            defaults: {
                from: `"Nice App" <${smtpConfig.username}>`,
            },
            template: {
                dir: join(__dirname, emailConfig.templateDir),
                adapter: new EjsAdapter(),
                options: {
                    strict: false,
                },
            },
        };
    },
    inject: [ConfigService],
});
