import { ViewController } from "@/launcher/main/view-controller";

export const Main = () => {
    return <div className={"z-[var(--layer-main)] absolute cover-full"}>
        <ViewController />
        <div className={"font-[led] text-2xl"}>
            2023-01-01 12:00:00
        </div>
    </div>
}
