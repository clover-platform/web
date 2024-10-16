import { IconGithub, IconWechat } from "@arco-iconbox/react-clover";

export const ICON_PROPS = {
    color: "white",
    fontSize: 20
}

export const SUPPORT_WAY = [
    {
        id: 'wechat',
        title: t("微信"),
        icon: <IconWechat {...ICON_PROPS} />
    },
    {
        id: 'github',
        title: t("Github"),
        icon: <IconGithub {...ICON_PROPS} />
    }
]
