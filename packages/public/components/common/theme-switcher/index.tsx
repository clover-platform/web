import {IconDark, IconLight, IconSystem} from "@arco-iconbox/react-clover";
import {useTheme} from "next-themes";
import classNames from "classnames";
import {FC, useEffect, useState} from "react";

export type Theme = {
    name: string;
    icon: any;
}

const themes: Theme[] = [
    {
        name: "light",
        icon: IconLight
    },
    {
        name: "system",
        icon: IconSystem
    },
    {
        name: "dark",
        icon: IconDark
    }
]

const BUTTON_SIZE = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10"
}

const ICON_SIZE = {
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg"
}

export type ThemeSwitcherProps = {
    size?: "sm" | "md" | "lg";
    activeClassName?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = (props) => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme();
    const { size = "md", activeClassName = "bg-secondary" } = props;

    useEffect(() => {
        setMounted(true)
    }, [])

    return <div className={"border rounded-full p-1 flex"} key={`switcher-${mounted}`}>
        {
            themes.map((item) => {
                const Icon = item.icon;
                return <div key={item.name} className={classNames(
                    BUTTON_SIZE[size],
                    "flex justify-center items-center rounded-full cursor-pointer",
                    theme === item.name ? activeClassName : ""
                )} onClick={() => setTheme(item.name)} suppressHydrationWarning={true}>
                    <Icon className={ICON_SIZE[size]} />
                </div>
            })
        }
    </div>
}
