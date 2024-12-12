import { Clock } from "@clover-platform/launcher/common/clock";
import { SearchInput } from "@clover-platform/launcher/common/search-input";

export const Header = () => {
    return <div className={"my-10 flex justify-center items-center flex-col w-full relative z-50"}>
        <SearchInput />
        <Clock className={"text-[28px] mt-[20px]"} />
    </div>
}
