import { Skeleton } from "@atom-ui/core";

export const InviteLinkItemLoading = () => {
    return <div className={"space-y-2"}>
        <div className={"text-muted-foreground"}>
            <Skeleton className={"h-6 w-48"}/>
        </div>
        <Skeleton className={"h-10 w-full"}/>
        <div>
            <Skeleton className={"h-6 w-32"}/>
        </div>
    </div>
}
