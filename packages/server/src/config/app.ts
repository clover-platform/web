import { ConfigModule } from '@nestjs/config';

export default ConfigModule.forRoot({
    envFilePath: [
        'env/.env',
        `env/.env.${process.env.NODE_ENV}`
    ]
})
