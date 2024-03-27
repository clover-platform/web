import {Action} from "@clover/public/components/common/action";
import {IconChatGPT, IconComment, IconGoogleTranslate} from "@arco-iconbox/react-clover";
import {Tooltip} from "@atom-ui/core";
import {ReactNode, useMemo, useState} from "react";
import {ComingSoon} from "@/components/pages/module/worktop/main/panel/plugin/coming-soon";
import {Comment} from "@/components/pages/module/worktop/main/panel/plugin/comment";

export type Plugin = {
    id: string;
    name: string;
    icon: ReactNode;
    panel: ReactNode;
}

export const plugins: Plugin[] = [
    {
        id: "comment",
        name: "{#评论#}",
        icon: <IconComment className={"text-lg"} />,
        panel: <Comment />
    },
    {
        id: "google",
        name: "{#谷歌翻译#}",
        icon: <IconGoogleTranslate className={"text-lg"} />,
        panel: <ComingSoon />
    },
    {
        id: "ai",
        name: "{#AI建议#}",
        icon: <IconChatGPT className={"text-lg"} />,
        panel: <ComingSoon />
    }
]

export const PluginPanel = () => {
    const [activePlugin, setActivePlugin] = useState<string>("comment");

    const plugin = useMemo(() => {
        return plugins.find(plugin => plugin.id === activePlugin);
    }, [activePlugin])

    return <div className={"w-full h-full flex justify-center items-stretch"}>
        <div className={"flex-1 flex justify-center items-center flex-col"}>
            <div className={"w-full text-base font-medium px-3 py-3"}>
                { plugin?.name }
            </div>
            <div className={"flex-1 w-full"}>
                { plugin?.panel }
            </div>
        </div>
        <div className={"bg-muted border-l p-2"}>
            {
                plugins.map((plugin, index) => {
                    return <Tooltip content={plugin.name} side={"left"} key={plugin.name}>
                        <Action onClick={() => setActivePlugin(plugin.id)} active={activePlugin === plugin.id} className={index < plugins.length - 1 ? "mb-2" : ""}>
                            {plugin.icon}
                        </Action>
                    </Tooltip>
                })
            }
        </div>
    </div>
}
