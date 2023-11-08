import {Form, FormItemProps, Message, Image} from "@arco-design/web-react";
import {useEffect, useState} from "react";
import {otpSecret} from "@/rest/auth";
import {IconCopy} from "@arco-design/web-react/icon";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const SecretItem = (props: FormItemProps) => {
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
        otpData?.url && import('qrcode').then((QRCode) => {
            QRCode.toDataURL(otpData.url).then((result) => {
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

    return <Form.Item label={"{#身份验证 App 密钥#}"}>
        <div className={"flex justify-center items-center"}>
            <Image
                width={200}
                preview={false}
                src={qrcode}
                alt={"{#二维码#}"}
            />
        </div>
        <div className={"break-all py-[5px] px-[10px] bg-[#F2F3F5]"}>
            {otpData.secret}
            <CopyToClipboard text={otpData.secret} onCopy={onCopy}>
                <IconCopy className={"ml-[10px]"} />
            </CopyToClipboard>
        </div>
        <div className={"text-center mt-[10px] opacity-50"}>
            {"{#使用身份验证 App 扫码二维码或复制密钥到 App 。#}"}
        </div>
    </Form.Item>
};

export default SecretItem;
