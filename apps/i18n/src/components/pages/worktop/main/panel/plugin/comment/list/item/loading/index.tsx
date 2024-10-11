import { Skeleton } from "@easykit/design";

export const CommentListItemLoading = () => {
    return <div className={"mx-3 flex justify-center items-start"}>
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className={"ml-1 flex-1"}>
            <div className={"bg-muted rounded-md p-2"}>
                <div className={"text-muted-foreground text-xs"}>
                    <Skeleton className="h-3 w-10" />
                </div>
                <div className={"mt-1"}>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-6/12 mt-1" />
                </div>
            </div>
            <div className={"mt-1 text-muted-foreground pl-1 text-xs"}>
                <Skeleton className="h-3 w-10" />
            </div>
        </div>
    </div>
}
