import { Clock } from "@/common/clock";
import { SearchInput } from "@/common/search-input";

export const Header = () => {
    return <div className={"my-10 flex justify-center items-center flex-col mb-5"}>
        <SearchInput />
        <Clock className={"text-[28px] mt-[20px]"} />
    </div>
}
