export type DesktopApp = {
    id: string;
    size: string;
    supportSize: string[];
    color: string;
    title: string;
    type: "image" | "widget";
    image?: string;
    triggerType: "window" | "url";
    window?: any;
    url?: string;
}

export type LauncherConfig = {
    view: {
        mode: "full" | "simple";
        test?: number;
    },
    background?: {
        type: "image" | "color";
        image?: string;
    };
    apps?: DesktopApp[]
}
