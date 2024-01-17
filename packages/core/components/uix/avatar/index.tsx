import * as React from 'react';
import {
    Avatar as UIAvatar,
    AvatarFallback,
    AvatarImage,
} from "@atom-ui/core/components/ui/avatar"

export interface AvatarProps extends React.PropsWithChildren {
    src: string;
    fallback?: string;
    alt?: string;
    className?: string;
}

export const Avatar: React.FC<AvatarProps> = (props) => {
    return <UIAvatar className={props.className}>
        <AvatarImage src={props.src} alt={props.alt} />
        <AvatarFallback>{props.fallback}</AvatarFallback>
    </UIAvatar>
}
