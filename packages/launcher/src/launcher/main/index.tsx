import { ViewController } from "@/launcher/main/view-controller";
import {Clock} from "@/launcher/main/clock";

export const Main = () => {
    return <div className={"z-[var(--layer-main)] absolute cover-full"}>
        <ViewController />
        <div className={"flex justify-center items-center flex-col h-full"}>
            <Clock/>
            <div>a</div>
            <div className={"flex-1"}>
                icons
            </div>
        </div>
    </div>
}
