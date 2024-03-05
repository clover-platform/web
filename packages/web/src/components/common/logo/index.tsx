import { PropsWithChildren, useMemo } from "react";

interface LogoProps extends PropsWithChildren {
    type?: "normal" | "light" | "dark",
    size?: number
}

const Logo = (props: LogoProps) => {
    const {
        type = "normal",
        size = 32
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

    return <div className={"flex justify-center items-center cursor-default"}>
        <div
            className={`${image} rounded-sm bg-contain bg-no-repeat bg-center ${bg}`}
            style={{
                width: imageSize,
                height: imageSize,
                margin
            }}
        />
    </div>
};

export default Logo;
