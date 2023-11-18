import {
    Card as UICard,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../ui/card"
import {PropsWithChildren, FC, ReactNode} from "react";

export interface CardProps extends PropsWithChildren{
    footer?: ReactNode;
    title?: string;
    description?: string;
    className?: string
}

export const Card: FC<CardProps> = (props) => {
    const {
        title = '',
        description = '',
        className,
        footer
    } = props;

    return <UICard className={className}>
        {
            title || description ? <CardHeader>
                { title ? <CardTitle>{ title }</CardTitle> : null }
                { description ? <CardDescription>{ description }</CardDescription> : null }
            </CardHeader> : null
        }
        <CardContent>{ props.children }</CardContent>
        { footer ? <CardFooter>{ footer }</CardFooter> : null }
    </UICard>
}
