import { Sheet, SheetContent, SheetTrigger } from "@atom-ui/core";
import { IconMenu } from "@arco-iconbox/react-clover";
import { Action } from "@clover/public/components/common/action";

export const MenuSheet = () => {
    return <Sheet open={true}>
        <SheetTrigger asChild>
            <Action className={"!px-1.5 h-8"}>
                <IconMenu className={"text-lg"} />
            </Action>
        </SheetTrigger>
        <SheetContent side={"left"} closable={false} className={"w-96 p-0 flex gap-0"}>
            <div className={"w-32 border-r"}>1</div>
            <div className={"flex-grow"}>2</div>
        </SheetContent>
    </Sheet>
}
