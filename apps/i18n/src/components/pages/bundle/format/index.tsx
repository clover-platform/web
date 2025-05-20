import { FC } from "react";
import { getSupportedFormats } from "@/config/pages/bundle/config";

export type BundleFormatProps = {
  value: string;
}

export const BundleFormat: FC<BundleFormatProps> = (props) => {
  const item = getSupportedFormats().find(f => f.id === props.value);
  return <div className={"flex justify-start items-center space-x-1"}>
    {item?.icon}
    <div>{item?.name}</div>
  </div>
}
