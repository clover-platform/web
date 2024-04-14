import {forwardRef, ReactElement, ReactNode} from "react";
import {IconAndroid, IconFlutter, IconIOS, IconJSON} from "@arco-iconbox/react-clover";
import {RadioGroup, RadioGroupItem} from "@atom-ui/core";
import classNames from "classnames";
import {FormatConfigButton} from "@/components/pages/bundle/form/export-format/config/button";
import {JSONConfigForm} from "@/components/pages/bundle/form/export-format/config/form/json";
import {ARBConfigForm} from "@/components/pages/bundle/form/export-format/config/form/arb";

export type ExportFormatConfig = {
    id: string;
    name: string;
    icon: ReactNode;
    configComponent?: ReactElement;
}

export const supportedFormats: ExportFormatConfig[] = [
    {
        id: "android",
        name: "{#安卓资源文件#}",
        icon: <IconAndroid className={"w-8 h-8"}/>,
    },
    {
        id: "ios",
        name: "{#iOS 资源文件#}",
        icon: <IconIOS className={"w-8 h-8"}/>,
    },
    {
        id: "flutter",
        name: "{#Flutter .ARB 文件#}",
        icon: <IconFlutter className={"w-8 h-8"}/>,
        configComponent: <ARBConfigForm />
    },
    {
        id: "json",
        name: "{#JSON 文件#}",
        icon: <IconJSON className={"w-8 h-8"}/>,
        configComponent: <JSONConfigForm />
    }
]

export type ExportFormatProps = {
    value?: string;
    onChange?: (value: string) => void;
};

export const ExportFormat = forwardRef<HTMLInputElement, ExportFormatProps>((props, ref) => {
    const { value } = props;

    return <div className={"bg-white rounded-md border"}>
        <RadioGroup
            ref={ref}
            value={value}
            onValueChange={props.onChange}
            className={"gap-0"}
        >
            {
                supportedFormats.map(format => {
                    return <label key={format.id} className={classNames(
                        "flex items-center border-b p-2",
                        "border-b last:border-b-0 first:rounded-t-md last:rounded-b-md",
                        value === format.id ? "bg-muted" : null,
                    )}>
                        <div className={"w-8 h-8 flex items-center justify-center"}>
                            <RadioGroupItem value={format.id}/>
                        </div>
                        <div className={"w-10 h-8 flex items-center justify-center"}>
                            {format.icon}
                        </div>
                        <div className={"flex-1 ml-2"}>
                            <div className={"text text-gray-800"}>{format.name}</div>
                            <div className={"text-sm text-muted-foreground"}>{format.id}</div>
                        </div>
                        {
                            format.configComponent ? <FormatConfigButton
                                config={format}
                            /> : null
                        }
                    </label>
                })
            }
        </RadioGroup>
    </div>
});
