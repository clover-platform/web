import { Avatar } from "@atom-ui/core";
import { AddDesktop } from "@/launcher/main/controller/desktop/add";
import { useConfig } from "@/state";
import { DesktopGroup } from "@/interface.ts";
import { Icon } from "@/common/icon";

const renderIcon = (app: DesktopGroup) => {
    return <div key={app.id} className={"my-2 w-[36px] h-[36px] flex justify-center items-center hover:bg-white/20 rounded-sm group"}>
        <Icon type={app.icon} className={"text-[24px] text-white/60 group-hover:text-white"} />
    </div>
}

export const DesktopController = () => {
    const { config } = useConfig();

    return <div className={"absolute top-[50%] -translate-y-[50%] bg-black/40 rounded-full left-2 p-2 flex justify-center items-center flex-col"}>
        <div>
            <Avatar
                className={"w-[36px] h-[36px]"}
                src={"/assets/image/avatar.png"}
                alt={"Avatar"}
            />
        </div>
        <div className={"my-3"}>
            { config.groups?.map(renderIcon) }
        </div>
        <AddDesktop />
    </div>
};
