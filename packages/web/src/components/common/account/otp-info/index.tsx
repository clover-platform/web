import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Image, PopoverContent, PopoverTrigger, useMessage } from "@atom-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {CopyIcon, InfoCircledIcon} from "@radix-ui/react-icons";
import { Popover } from "@atom-ui/core";

export interface OtpInfo extends PropsWithChildren{
    secret: string;
    qrcode: string;
    loading?: boolean;
}

const apps = [
    {
        name: "{#腾讯身份验证器#}",
        icon: "/assets/image/2fa/tencent.webp"
    },
    {
        name: "{#谷歌身份验证器#}",
        icon: "/assets/image/2fa/google.webp"
    },
    {
        name: "{#微软身份验证器#}",
        icon: "/assets/image/2fa/microsoft.webp"
    }
]

const OtpInfo: FC<OtpInfo> = (props) => {
    const { secret, qrcode } = props;
    const msg = useMessage();
    const [qrcodeImage, setQrcodeImage] = useState("");

    useEffect(() => {
        qrcode && import('qrcode').then((QRCode) => {
            QRCode.toDataURL(qrcode).then((result) => {
                setQrcodeImage(result);
            });
        });
    }, [qrcode]);

    const onCopy = () => {
        msg.success("{#复制成功#}")
    }

    return <div className={"flex items-center flex-col"}>
        <div className={"flex justify-center items-center"}>
            <Image
                width={200}
                height={200}
                src={qrcodeImage}
                alt={"{#二维码#}"}
            />
        </div>
        <div className={"break-all my-[10px] py-[5px] px-[10px] bg-[#F2F3F5] inline-block"}>
            {secret}
            <CopyToClipboard text={secret} onCopy={onCopy}>
                <CopyIcon className={"ml-[10px]"} />
            </CopyToClipboard>
        </div>
        <div className={"text-center flex justify-center items-center"}>
            <span className={"opacity-50"}>
                {"{#使用#}"}
            </span>
            <Popover>
                <PopoverTrigger>
                    <span className={"flex justify-center items-center mx-1"}>
                        <InfoCircledIcon className={"mr-1"} />
                        {"{#身份验证应用#}"}
                    </span>
                </PopoverTrigger>
                <PopoverContent className={"w-[300px]"}>
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">{"{#支持主流的验证器#}"}</h4>
                        <p className="text-sm text-muted-foreground">
                            {"{#请在应用市场下载适合您手机的应用使用#}"}
                        </p>
                        <div className={"space-y-2"}>
                            {
                                apps.map((app, index) => {
                                    return <div key={index} className={"flex items-center space-x-2"}>
                                        <Image
                                            width={32}
                                            height={32}
                                            src={app.icon}
                                            alt={app.name}
                                            className={"shadow rounded-md overflow-hidden"}
                                        />
                                        <span>{app.name}</span>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </PopoverContent>
            </Popover>

            <span className={"opacity-50"}>
                {"{#扫码二维码或复制密钥到应用。#}"}
            </span>
        </div>
    </div>
};

export default OtpInfo;
