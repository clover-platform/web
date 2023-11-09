import { ConfigModule } from '@nestjs/config';
import {NacosManager} from "./nacos";

export default ConfigModule.forRoot({
    envFilePath: ['.env', '.env.local'],
    load: [async () => {
        const configManager = new NacosManager();
        return await configManager.getAllConfig();
    }],
    isGlobal: true,
    cache: true
})
