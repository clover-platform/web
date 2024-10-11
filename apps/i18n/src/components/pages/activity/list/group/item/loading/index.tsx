import {Skeleton} from "@easykit/design";

export const ActivityListGroupItemLoading = () => {
    return <div className={"flex justify-center items-start"}>
        <div className={"relative"}>
            <Skeleton className={"w-10 h-10 rounded-full"}/>
            <div
                className={"absolute bottom-0 -right-2 h-6 w-6 bg-white border rounded-full flex justify-center items-center"}
            >
                <Skeleton className={"h-6 w-6 rounded-full"}/>
            </div>
        </div>
        <div className={"flex-1 mx-4 min-h-10 flex justify-start items-center"}>
            <Skeleton className={"w-6/12 h-5"}/>
        </div>
        <div className={"text-muted-foreground min-h-10 flex justify-start items-center"}>
            <Skeleton className={"w-10 h-5"}/>
        </div>
    </div>
}
