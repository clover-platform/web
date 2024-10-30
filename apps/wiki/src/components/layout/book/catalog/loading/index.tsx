import {Skeleton} from "@easykit/design";
import {FC, PropsWithChildren} from "react";

const ItemWrapper: FC<PropsWithChildren> = (props) => {
    return <div className={"w-full px-1.5 py-1.5 my-0.5"}>{props.children}</div>
}

export const CatalogLoading = () => {
    return <>
        <ItemWrapper>
            <Skeleton className={"h-6"}/>
        </ItemWrapper>
        <ItemWrapper>
            <Skeleton className={"h-6 ml-5"}/>
        </ItemWrapper>
        <ItemWrapper>
            <Skeleton className={"h-6 ml-5"}/>
        </ItemWrapper>
        <ItemWrapper>
            <Skeleton className={"h-6 ml-5"}/>
        </ItemWrapper>
        <ItemWrapper>
            <Skeleton className={"h-6"}/>
        </ItemWrapper>
    </>
}
