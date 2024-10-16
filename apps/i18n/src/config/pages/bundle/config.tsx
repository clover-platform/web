import { ReactElement, ReactNode } from "react";
import { IconAndroid, IconFlutter, IconIOS, IconJSON } from "@arco-iconbox/react-clover";
import { ARBConfigForm } from "@/components/pages/bundle/form/export-format/config/form/arb";
import { JSONConfigForm } from "@/components/pages/bundle/form/export-format/config/form/json";

export type ExportFormatConfig = {
    id: string;
    name: string;
    icon: ReactNode;
    configComponent?: ReactElement;
    configDefault?: any;
    config?: any;
}

export const SUPPORTED_FORMATS: ExportFormatConfig[] = [
    {
        id: "android",
        name: t("安卓资源文件"),
        icon: <IconAndroid className={"w-8 h-8"}/>,
    },
    {
        id: "ios",
        name: t("iOS 资源文件"),
        icon: <IconIOS className={"w-8 h-8"}/>,
    },
    {
        id: "flutter",
        name: t("Flutter .ARB 文件"),
        icon: <IconFlutter className={"w-8 h-8"}/>,
        configComponent: <ARBConfigForm />,
        configDefault: {
            convert: false
        }
    },
    {
        id: "json",
        name: t("JSON 文件"),
        icon: <IconJSON className={"w-8 h-8"}/>,
        configComponent: <JSONConfigForm />,
        configDefault: {
            convert: false
        }
    }
]
