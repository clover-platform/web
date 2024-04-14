import {IconComingSoon} from "@arco-iconbox/react-clover";

export const ComingSoon = () => {
    return <div className={"flex justify-center items-center flex-col p-6 space-y-2"}>
        <IconComingSoon className={"text-3xl opacity-60"} />
        <div className={"text-muted-foreground"}>{"{#即将推出#}"}</div>
    </div>
}
