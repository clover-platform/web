import {FlagIcon} from "@/components/common/flag-icon";
import {FC} from "react";
import {COUNTRIES} from "@/components/common/flag-icon/config";
import classNames from "classnames";

export type LanguageIconProps = {
    code: string;
    className?: string;
}

export const LanguageIcon: FC<LanguageIconProps> = (props) => {
    const { code} = props;
    const area = (code.split("-")[1] || code).toLowerCase();
    const inCountries = !!COUNTRIES.find((item) => item.code === area);
    return <div className={classNames(
        "rounded-sm overflow-hidden flex justify-center items-center",
        "w-8 h-6 bg-muted",
        props.className,
    )}>
        { inCountries ? <FlagIcon code={area} className={"!w-8 !h-6"} /> : <span className={"leading-none font-bold text-muted-foreground"}>{code}</span> }
    </div>
}
