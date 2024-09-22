import { FC } from "react";
import { SUPPORTED_FORMATS } from "@/config/pages/bundle/config";

export type BundleFormatProps = {
    value: string;
}

export const BundleFormat: FC<BundleFormatProps> = (props) => {
    const item = SUPPORTED_FORMATS.find(f => f.id === props.value);
    return <div className={"flex justify-start items-center space-x-1"}>
        { item?.icon }
        <div>{ item?.name }</div>
    </div>
}
