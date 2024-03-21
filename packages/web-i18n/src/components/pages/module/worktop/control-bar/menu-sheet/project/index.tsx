import { Input, Separator } from "@atom-ui/core";

export const MenuProjectSheet = () => {
    return <>
        <div className={"text-xl font-bold"}>{"{#项目#}"}</div>
        <ul className={"space-y-1"}>
            <li>link 1</li>
            <li>link 2</li>
        </ul>
        <Separator />
        <div className={"text-muted-foreground"}>{"{#打开项目#}"}</div>
        <Input placeholder={"{#搜索项目#}"} />
        <ul className={"space-y-1"}>
            <li>project 1</li>
            <li>project 2</li>
        </ul>
    </>
}
