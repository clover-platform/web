import { DesktopApp } from "@clover/launcher/interface";
import { FC, useMemo } from "react";
import classNames from "classnames";
import "./style.css";

export type DesktopIconProps = {} & DesktopApp;

export const DesktopIcon: FC<DesktopIconProps> = (props) => {
    const {
        type,
        title,
        image,
        color,
    } = props;

    const iconObject = useMemo(() => {
        if(type === "image") {
            return <div
                style={{backgroundImage: `url(${image})`}}
                className={"w-full h-full bg-no-repeat bg-center bg-contain"}
            />
        }else if(type === "widget"){
            // const Widget = SystemWidgets[id];
            return <></> // <Widget />;
        }
        return <></>;
    }, [type, image])

    return <div
        className={classNames(
            "desktop-icon",
            `size-${props.size}`,
        )}
    >
        <div className={"icon-inner"}>
            <div className={"icon-container"} style={{backgroundColor: color}}>
                { iconObject }
            </div>
            <div className={"title"}>
                { title }
            </div>
        </div>
    </div>
}
