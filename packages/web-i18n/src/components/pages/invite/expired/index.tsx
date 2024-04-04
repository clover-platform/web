import {LinkBreak2Icon} from "@radix-ui/react-icons";

export const InvitePageExpired = () => {
    return <div className={"flex justify-center items-center flex-col"}>
        <div className={"my-6 opacity-60"}>
            <LinkBreak2Icon className={"w-12 h-12"} />
        </div>
        <div className={"text-muted-foreground"}>{"{#邀请链接已过期#}"}</div>
    </div>
}
