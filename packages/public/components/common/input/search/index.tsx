import {cn, Input, InputProps} from "@easykit/design";
import {IconSearch} from "@arco-iconbox/react-clover";
import {FC} from "react";
import { useTranslation } from "react-i18next";

export const SearchInput: FC<InputProps> = (props) => {
  const { t } = useTranslation();
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
      <IconSearch/>
    </div>
    <Input
      {...rest}
      placeholder={placeholder}
      className={"pl-8"}
    />
  </div>
}
