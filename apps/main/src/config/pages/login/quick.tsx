import { IconGithub, IconWechat } from "@arco-iconbox/react-clover";
import { t } from '@easykit/common/utils/locale';

export const ICON_PROPS = {
    color: "white",
    fontSize: 20
}

export const getSupportWay = () => [
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
