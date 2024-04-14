import { IconGithub, IconWechat } from "@arco-iconbox/react-clover";
import {FIX_ICON_PROPS} from "@easy-kit/common/utils/icon";

export const ICON_PROPS = {
    color: "white",
    fontSize: 20
}

export const SUPPORT_WAY = [
    {
        id: 'wechat',
        title: "{#微信#}",
        icon: <IconWechat {...FIX_ICON_PROPS} {...ICON_PROPS} />
    },
    {
        id: 'github',
        title: "{#Github#}",
        icon: <IconGithub {...FIX_ICON_PROPS} {...ICON_PROPS} />
    }
]
