import { FC, PropsWithChildren } from "react";

export interface StepsProps extends PropsWithChildren {
    current?: number;
    className?: string;
}

export interface StepsItemProps extends PropsWithChildren {
    title?: string;
    className?: string;
}

export const StepsItem: FC<StepsItemProps> = (props) => {
    return <div>steps</div>
};

export const Steps: FC<StepsProps> = (props) => {
    return <div>steps</div>
};
