import { FormItem, useMessage, Image } from "@clover/core";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import {otpSecret} from "@/rest/auth";
import { CopyIcon } from "@radix-ui/react-icons";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const SecretItem: FC<PropsWithChildren> = (props) => {
    const Message = useMessage();
    const [loading, setLoading] = useState(false);
    const [otpData, setOtpData] = useState({} as any);
    const [qrcode, setQrcode] = useState('' as any);

    const loadSecret = async () => {
        setLoading(true);
        const { success, message, data } = await otpSecret();
        setLoading(false);
        if(success) {
            setOtpData(data);
        }else{
            Message.error(message);
        }
    }

    useEffect(() => {
        otpData?.qrcode && import('qrcode').then((QRCode) => {
            QRCode.toDataURL(otpData.qrcode).then((result) => {
                setQrcode(result);
            });
        });
    }, [otpData]);

    useEffect(() => {
        loadSecret().then();
    }, []);

    const onCopy = () => {
        Message.success("{#复制成功#}")
    }

    return <FormItem name={"qrcode"} label={"{#身份验证 App 密钥#}"}>
        <div className={"flex items-center flex-col"}>
            <div className={"flex justify-center items-center"}>
                <Image
                    width={200}
                    height={200}
                    src={qrcode}
                    alt={"{#二维码#}"}
                />
            </div>
            <div className={"break-all my-[10px] py-[5px] px-[10px] bg-[#F2F3F5] inline-block"}>
                {otpData.secret}
                <CopyToClipboard text={otpData.secret} onCopy={onCopy}>
                    <CopyIcon className={"ml-[10px]"} />
                </CopyToClipboard>
            </div>
            <div className={"text-center opacity-50"}>
                {"{#使用身份验证 App 扫码二维码或复制密钥到 App 。#}"}
            </div>
        </div>
    </FormItem>
};

export default SecretItem;
