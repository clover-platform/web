export interface ServerConfig {
    port: number;
}

export interface RedisConfig {
    host: string;
    port: number;
    password: string;
    db: number;
}

export interface SkyWalkingConfig {
    collectorAddress: string;
    serviceName: string;
    serviceInstance: string;
}

export interface EmailConfig {
    endpoint: string;
    accountName: string;
    accessKeyId: string;
    accessKeySecret: string;
    templateDir: string;
}

export interface I18nConfig {
    fallbackLanguage: string;
    path: string;
}

export interface KeyPair {
    publicKey: string;
    privateKey: string;
}

export interface AuthConfig {
    jwtSecret: string;
    aesKey: string;
    transport: KeyPair;
    debug: boolean;
    emailCode: string,
    otpCode: string,
}


