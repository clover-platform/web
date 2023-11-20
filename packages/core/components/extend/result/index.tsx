import { Cross2Icon, CheckIcon } from "@radix-ui/react-icons";
import { IconInfo,  IconWarning } from "@arco-iconbox/react-clover";
import {PropsWithChildren, FC, ReactNode} from "react";
import {cn} from "@clover/core/lib/utils";

export interface ResultProps extends PropsWithChildren {
    status: 'success' | 'error' | 'info' | 'warning';
    title?: string;
    subTitle?: string;
    extra?: ReactNode;
}

const ICON_MAP = {
    success: CheckIcon,
    error: Cross2Icon,
    info: IconInfo,
    warning: IconWarning,
};

export const Result: FC<ResultProps> = (props) => {
    const {
        status= 'info',
        title,
        subTitle,
        extra,
    } = props;

    const Icon = ICON_MAP[status];

    return <div className={"flex justify-center items-center flex-col"}>
        {
            Icon ? <div className={cn(
                'w-12 h-12 flex justify-center items-center rounded-full',
                status === 'success' ? 'bg-success text-success-foreground' : null,
                status === 'error' ? 'bg-error text-error-foreground' : null,
                status === 'info' ? 'bg-secondary text-secondary-foreground' : null,
                status === 'warning' ? 'bg-warning text-warning-foreground' : null,
            )}>
                <Icon className={"w-6 h-6"} />
            </div> : null
        }
        { title ? <div className={"text-lg mt-4"}>{ title }</div> : null }
        { subTitle ? <div className={"mt-4 text-gray-500"}>{ subTitle }</div> : null }
        { extra ? <div className={"mt-4"}>{ extra }</div> : null }
    </div>
};