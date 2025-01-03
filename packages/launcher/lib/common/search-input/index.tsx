import { Icon } from "@clover-platform/launcher/common/icon";
import { Input } from "@easykit/design";

export const SearchInput = () => {
    return <div className={"flex justify-center items-center bg-white/60 focus-within:!bg-white/90 rounded-md px-2 py-1 shadow-md w-full max-w-[460px]"}>
        <div className={"h-9 w-9 flex justify-center items-center"}>
            <Icon type={"google"} className={"!text-2xl text-black/60"} />
        </div>
        <div className={"flex-1"}>
            <Input className={"border-0 shadow-none focus-visible:ring-0 w-full"} />
        </div>
    </div>
}
