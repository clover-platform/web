import { ImgHTMLAttributes, FC } from "react";

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

export const Image: FC<ImageProps> = (props) => {
    return <div>
        <img src={props.src} alt={props.alt} />
    </div>
};
