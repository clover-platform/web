import NodeRSA from 'node-rsa';

export const PUB_KEY = "-----BEGIN PUBLIC KEY-----\n" +
"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwiNHAj3j50tNPpfxB3u9PTsw+\n" +
"Ej1AED7nhL63nCkmR7SVwAUGUE18syMhH8qXvWiJye7MhuPqRC6ZFgWsYVf0X1C+\n" +
"K9ttn94x9TYeHxsMZ7FtxqLKkbnzejfeUtMcCA1gqcixw726PaYQGdL6th3FpETn\n" +
"/xX8ILgb91eCK7QuTQIDAQAB\n" +
"-----END PUBLIC KEY-----"

export const encrypt = (text: string): string => {
    const key = new NodeRSA(PUB_KEY);
    return key.encrypt(text, 'base64').toString();
}
