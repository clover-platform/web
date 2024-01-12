export type LauncherConfig = {
    view: {
        mode: "full" | "simple";
        test?: number;
    },
    background?: {
        type: "image" | "color";
        image?: string;
    };
}
