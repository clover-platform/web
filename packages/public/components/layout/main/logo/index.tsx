import Logo from "@clover/public/components/common/logo";
import {tt} from "@clover/public/locale";

export const LayoutLogo = () => {
  return <div className={"flex justify-start items-center space-x-xs"}>
    <Logo/>
    <div className={"text-xl font-medium opacity-70"}>{tt("幸运草")}</div>
  </div>
}
