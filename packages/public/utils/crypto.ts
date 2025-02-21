import {JSEncrypt} from 'jsencrypt';

export const PUB_KEY = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwiNHAj3j50tNPpfxB3u9PTsw+
Ej1AED7nhL63nCkmR7SVwAUGUE18syMhH8qXvWiJye7MhuPqRC6ZFgWsYVf0X1C+
K9ttn94x9TYeHxsMZ7FtxqLKkbnzejfeUtMcCA1gqcixw726PaYQGdL6th3FpETn
/xX8ILgb91eCK7QuTQIDAQAB
-----END PUBLIC KEY-----`;

export const encrypt = (text: string): string => {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(PUB_KEY);
  return encryptor.encrypt(text) as string; // 返回 Base64 编码的加密数据
};
