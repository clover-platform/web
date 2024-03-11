import { PropsWithChildren, useMemo } from "react";
import classNames from "classnames";

interface LogoProps extends PropsWithChildren {
    type?: "normal" | "light" | "dark";
    size?: number;
    className?: string;
}

const Logo = (props: LogoProps) => {
    const {
        type = "normal",
        size = 32,
        className,
    } = props;

    let bg = "bg-transparent";
    let image = "bg-[url(~@/assets/image/logo/normal.png)]";
    if(type === "dark") {
        bg = "bg-[#2E3340]";
        image = "bg-[url(~@/assets/image/logo/light.png)]";
    }else if(type === "light"){
        bg = "bg-white";
        image = "bg-[url(~@/assets/image/logo/dark.png)]";
    }

    const margin = useMemo(() => Math.floor(size * 0.1), [size]);
    const imageSize = useMemo(() => size - (margin * 2), [size, margin]);

    return <div className={classNames(
        "flex justify-center items-center cursor-default rounded-sm",
        bg,
        className
    )}>
        <div
            className={`${image} bg-contain bg-no-repeat bg-center`}
            style={{
                width: imageSize,
                height: imageSize,
                margin
            }}
        />
    </div>
};

export default Logo;
