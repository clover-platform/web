import {FC, PropsWithChildren, useEffect, useState} from "react";
import {Image, PopoverContent, PopoverTrigger, useMessage} from "@easykit/design";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {CopyIcon, InfoCircledIcon} from "@radix-ui/react-icons";
import {Popover} from "@easykit/design";
import {t} from '@clover/public/utils/i18next';

export interface OtpInfoProps extends PropsWithChildren {
  secret: string;
  qrcode: string;
  loading?: boolean;
}

const getApps = () => [
  {
    name: t("腾讯身份验证器"),
    icon: "/assets/main/image/2fa/tencent.webp"
  },
  {
    name: t("谷歌身份验证器"),
    icon: "/assets/main/image/2fa/google.webp"
  },
  {
    name: t("微软身份验证器"),
    icon: "/assets/main/image/2fa/microsoft.webp"
  }
]

export const OtpInfo: FC<OtpInfoProps> = (props) => {
  const {secret, qrcode} = props;
  const msg = useMessage();
  const [qrcodeImage, setQrcodeImage] = useState("");

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    qrcode && import('qrcode').then((QRCode) => {
      QRCode.toDataURL(qrcode).then((result) => {
        setQrcodeImage(result);
      });
    });
  }, [qrcode]);

  const onCopy = () => {
    msg.success(t("复制成功"))
  }

  return <div className={"flex items-center flex-col"}>
    <div className={"flex justify-center items-center"}>
      {
        qrcodeImage ? <Image src={qrcodeImage} alt={"QRCode"} width={150} height={150}/> :
          <div className={"w-[150px] h-[150px] bg-secondary"}/>
      }
    </div>
    <div className={"my-2 py-1 px-3 bg-secondary flex justify-center items-center text-sm"}>
      {secret || "--"}
      <CopyToClipboard text={secret} onCopy={onCopy}>
        <CopyIcon className={"ml-[10px]"}/>
      </CopyToClipboard>
    </div>
    <div className={"text-center flex justify-center items-center"}>
      <Popover>
        <PopoverTrigger asChild={true}>
          <InfoCircledIcon className={"mr-2"}/>
        </PopoverTrigger>
        <PopoverContent className={"w-[300px]"}>
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{t("支持主流的验证器")}</h4>
            <p className="text-sm text-muted-foreground">
              {t("请在应用市场下载适合您手机的应用使用")}
            </p>
            <div className={"space-y-2"}>
              {
                getApps().map((app, index) => {
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
      <span className={"text-left text-sm"}>{t("使用身份验证应用，扫码二维码或复制密钥到应用。")}</span>
    </div>
  </div>
}
