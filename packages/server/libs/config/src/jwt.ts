import { JwtModule } from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import { AuthConfig } from "@easy-kit/config/interface";

export default JwtModule.registerAsync({
    global: true,
    useFactory: (configService: ConfigService) => {
        const authConfig = configService.get<AuthConfig>('i18n');
        return {
            secret: authConfig.jwtSecret,
            signOptions: { expiresIn: '24h' },
        };
    },
    inject: [ConfigService],
})
