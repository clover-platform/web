import {IconGithub, IconWechat} from "../../../../../core/icon";

export const ICON_PROPS = {
    color: "white",
    fontSize: 20
}

export const SUPPORT_WAY = [
    {
        id: 'wechat',
        title: "{#微信#}",
        icon: <IconWechat {...ICON_PROPS} />
    },
    {
        id: 'github',
        title: "{#Github#}",
        icon: <IconGithub {...ICON_PROPS} />
    }
]
