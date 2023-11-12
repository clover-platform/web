import { ConfigService } from "@nestjs/config";
import { I18nModule, AcceptLanguageResolver } from 'nestjs-i18n';
import { resolve } from "path";
import {I18nConfig} from "@easy-kit/config/interface";

export default I18nModule.forRootAsync({
    useFactory: (configService: ConfigService) => {
        const i18nConfig = configService.get<I18nConfig>('i18n');
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
