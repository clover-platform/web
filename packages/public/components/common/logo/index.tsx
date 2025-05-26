import classNames from "classnames";
import { type PropsWithChildren, useMemo } from 'react'

interface LogoProps extends PropsWithChildren {
  type?: "normal" | "light" | "dark";
  size?: number;
  className?: string;
}

const Logo = (props: LogoProps) => {
  const { type = 'normal', size = 32, className } = props

  let bg = "bg-transparent";
  let image = "bg-[url(@clover/public/assets/image/logo/normal.png)]";
  if (type === "dark") {
    bg = "bg-[#2E3340]";
    image = "bg-[url(@clover/public/assets/image/logo/light.png)]";
  } else if (type === "light") {
    bg = "bg-white";
    image = "bg-[url(@clover/public/assets/image/logo/dark.png)]";
  }

  const margin = useMemo(() => Math.floor(size * 0.1), [size]);
  const imageSize = useMemo(() => size - (margin * 2), [size, margin]);

  return (
    <div className={classNames('flex items-center justify-center rounded-sm', bg, className)}>
      <div
        className={`${image} bg-center bg-contain bg-no-repeat`}
        style={{
          width: imageSize,
          height: imageSize,
          margin,
        }}
      />
    </div>
  )
};

export default Logo;
