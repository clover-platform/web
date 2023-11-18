import {FC, PropsWithChildren} from "react";
import {
    Avatar as UIAvatar,
    AvatarFallback,
    AvatarImage,
} from "@clover/core/components/ui/avatar"

export interface AvatarProps extends PropsWithChildren {
    src: string;
    fallback?: string;
    alt?: string;
    className?: string;
}

export const Avatar: FC<AvatarProps> = (props) => {
    return <UIAvatar className={props.className}>
        <AvatarImage src={props.src} alt={props.alt} />
        <AvatarFallback>{props.fallback}</AvatarFallback>
    </UIAvatar>
}
