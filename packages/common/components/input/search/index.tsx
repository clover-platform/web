import {forwardRef} from "react";
import {cn, Input, InputProps} from "@easykit/design";
import {IconSearch} from "@arco-iconbox/react-clover";

const SearchInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {
        className,
        placeholder = t("请输入关键词"),
        ...rest
    } = props;
    return <div className={cn(
        "relative w-[220px]",
        className
    )}>
        <div className={"absolute top-0 left-0 bottom-0 px-3 flex justify-center items-center"}>
            <IconSearch />
        </div>
        <Input
            {...rest}
            ref={ref}
            placeholder={placeholder}
            className={"pl-8"}
        />
    </div>
})

export default SearchInput;
