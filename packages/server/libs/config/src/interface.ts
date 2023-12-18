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

export interface EmailAliConfig {
    endpoint: string;
    accountName: string;
    accessKeyId: string;
    accessKeySecret: string;
}

export interface EmailSMTPConfig {
    host: string;
    port: number;
    username: string;
    password: string;
}

export interface EmailConfig {
    type: "alidm" | "smtp";
    alidm?: EmailAliConfig;
    smtp?: EmailSMTPConfig;
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
    su: string;
    defaultRole?: string;
    jwtSecret: string;
    aesKey: string;
    transport: KeyPair;
    debug: boolean;
    emailCode: string,
    otpCode: string,
    resetOtpCode: string,
    commonAccess: string[],
    initPassword: string;
}

export interface MinioConfig {
    endPoint: string;
    port: number;
    useSSL: boolean;
    accessKey: string;
    secretKey: string;
    bucket: string;
}

export interface AssetsConfig {
    type: "minio" | "aliyun" | "local";
    minio?: MinioConfig;
    downloadPeriod: string;
}


