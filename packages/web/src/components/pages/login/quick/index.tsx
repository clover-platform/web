import {IconGithub, IconWechat} from "@arco-iconbox/react-clover";

export const ICON_PROPS = {
    color: "white",
    fontSize: 20
}

const SUPPORT_WAY = [
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

const QuickLogin = () => {
    return <div className={"flex flex-wrap justify-center"}>
        {SUPPORT_WAY.map((item) => {
            return <a href={`/api/account/auth/link/${item.id}/`} key={item.id} className={"m-[10px] flex flex-col items-center justify-center"}>
                <div className={"w-[40px] h-[40px] rounded-full bg-[#2E3340] flex items-center justify-center"}>
                    {item.icon}
                </div>
                <div className={"mt-[10px] text-[14px] text-[#666]"}>{item.title}</div>
            </a>
        })}
    </div>
};

export default QuickLogin;
