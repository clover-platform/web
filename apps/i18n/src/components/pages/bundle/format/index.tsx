import { getSupportedFormats } from "@/config/pages/bundle/config";
import type { FC } from 'react'

export type BundleFormatProps = {
  value: string;
}

export const BundleFormat: FC<BundleFormatProps> = (props) => {
  const item = getSupportedFormats().find(f => f.id === props.value);
  return (
    <div className="flex items-center justify-start space-x-1">
      {item?.icon}
      <div>{item?.name}</div>
    </div>
  )
}
