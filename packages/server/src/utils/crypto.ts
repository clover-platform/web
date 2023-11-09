import { createHash } from 'crypto';
import NodeRSA from 'node-rsa';

export const md5 = (data: string) => createHash('md5').update(data).digest("hex");

export const decrypt = (text: string, privateKey: string): string => {
    const key = new NodeRSA(privateKey);
    return key.decrypt(text).toString();
}

export const getKey = () => {
    let key = new NodeRSA({ b: 1024 })
    key.setOptions({ encryptionScheme:'pkcs1'})

    let publicKey = key.exportKey('public') //生成公钥，发给前端用于数据加密
    let privateKey = key.exportKey('private')//生成私钥，用于数据解密

    console.log(privateKey);
    console.log(publicKey);
}
