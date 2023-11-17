import {PropsWithChildren} from "react";

interface LogoProps extends PropsWithChildren {
    title?: string,
    theme?: "light" | "dark",
    size?: number
}

const Logo = (props: LogoProps) => {
    const {
        title = "{#幸运草#}",
        theme = "light",
        size = 32
    } = props;

    let bg = "bg-white";
    let image = "bg-[url(~@/assets/image/logo-dark.svg)]";
    if(theme === "dark") {
        bg = "bg-[#2E3340]";
        image = "bg-[url(~@/assets/image/logo-light.svg)]";
    }

    return <div className={"flex justify-center items-center cursor-default"}>
        <div className={`${image} rounded-sm bg-[length:66%] bg-no-repeat bg-center ${bg}`} style={{width: size, height: size}}/>
        <div className={"ml-[10px] text-[16px] font-bold select-none"}>{title}</div>
    </div>
};

export default Logo;
