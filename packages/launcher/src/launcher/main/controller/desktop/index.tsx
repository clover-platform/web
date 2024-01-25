import { Avatar } from "@atom-ui/core";
import { AddDesktop } from "@/launcher/main/controller/desktop/add";
import { useConfig } from "@/state";
import { DesktopGroup } from "@/interface.ts";
import { DesktopGroupIcon } from "@/launcher/main/controller/desktop/icon";

export const DesktopController = () => {
    const { config, update } = useConfig();

    const onIconClick = (id: string) => {
        update({
            activeGroup: id,
        })
    }

    return <div className={"absolute top-[50%] -translate-y-[50%] bg-black/40 rounded-full left-2 p-2 flex justify-center items-center flex-col z-50"}>
        <div>
            <Avatar
                className={"w-[36px] h-[36px]"}
                src={"/assets/image/avatar.png"}
                alt={"Avatar"}
            />
        </div>
        <div className={"my-3"}>
            {
                config.groups?.map((app: DesktopGroup) => <DesktopGroupIcon
                    active={config.activeGroup === app.id}
                    key={app.id}
                    group={app}
                    onClick={() => onIconClick(app.id)}
                />)
            }
        </div>
        <AddDesktop />
    </div>
};
