import { NacosConfigClient } from "nacos";
import { parse } from 'yaml'

export class NacosManager {
    private client: NacosConfigClient;
    private NAMESPACE = process.env.NODE_ENV ? process.env.NODE_ENV : 'public';
    private SERVER_ADDR = `${process.env.NACOS_HOST}:${process.env.NACOS_PORT}`;
    constructor() {
        this.getClient();
    }

    private getClient() {
        this.client = new NacosConfigClient({
            serverAddr: this.SERVER_ADDR,
            namespace: this.NAMESPACE,
            requestTimeout: 6000
        });
    }

    async getAllConfig() {
        const config = await this.client.getConfig(process.env.NACOS_DATA_ID, process.env.NACOS_GROUP || 'DEFAULT_GROUP');
        return parse(config);
    }
}
