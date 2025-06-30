import {JSEncrypt} from 'jsencrypt';

export const PUB_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyq+zsEh4MfFRkwDICISi
g9l+SYtp+pkuUW4SK8NK7p1brTv4HxtiihU3uY5EB7pMoK9pXpKyKSBIRIxxOvze
mk0fpOIgwYB/zuTad18X/TT9U83/nYi6J/zaXajSIiJmjlGo+gH4jhhiP0Z03WS/
TB6zoB/KXVHmpZidrd/dfIegOUfoybU4heobxj+dP/696E/YZN6NGtbW9iASV9y9
V3VEKNBGPK68HEQbOWR3N4h04LSFmuQ1t6fNHShU1LI0tx7vgKG/8yQjv/LKZhVj
4Az8fPVM8QkBOfOuFUIgm/NKpiIFVU/bSCB50UxtyC+5dlFBQrhuaWg1+0h7POsq
KwIDAQAB
-----END PUBLIC KEY-----`

export const encrypt = (text: string): string => {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(PUB_KEY);
  return encryptor.encrypt(text) as string; // 返回 Base64 编码的加密数据
};
