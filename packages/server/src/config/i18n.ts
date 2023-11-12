import { ConfigService } from "@nestjs/config";
import { I18nModule, AcceptLanguageResolver } from 'nestjs-i18n';
import { resolve } from "path";

export default I18nModule.forRootAsync({
    useFactory: (configService: ConfigService) => {
        const i18nConfig = configService.get('i18n');
        return {
            fallbackLanguage: i18nConfig.fallbackLanguage,
            loaderOptions: {
                path: resolve('./packages/server/src/i18n/'),
                watch: true,
            },
        };
    },
    resolvers: [
        AcceptLanguageResolver
    ],
    inject: [ConfigService],
});
