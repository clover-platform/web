import dayjs from 'dayjs';
import { FC, useEffect, useState } from "react";
import classNames from "classnames";

export type ClockProps = {
    className?: string;
}

export const Clock: FC<ClockProps> = (props) => {
    const [time, setTime] = useState(dayjs().format("HH:mm:ss"));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(dayjs().format("HH:mm:ss"));
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, []);
    return <div className={classNames(
        "font-[led] text-[40px] text-white/80 drop-shadow-[0_0_8px_rgba(0,0,0,0.6)] leading-[40px]",
        props.className,
    )}>
        { time }
    </div>
};
