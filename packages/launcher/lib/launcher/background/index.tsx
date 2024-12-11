import { useConfig } from "@clover/launcher/state";
import classNames from "classnames";

export const Background = () => {
    const { config } = useConfig();

    return <div
        style={{
            backgroundImage: config.background?.type === "image" ? `url(${config.background.image})` : undefined,
        }}
        className={classNames(
            "z-[var(--layer-bg)] absolute cover-full",
            "bg-no-repeat bg-center bg-cover",
        )}
    />
};
