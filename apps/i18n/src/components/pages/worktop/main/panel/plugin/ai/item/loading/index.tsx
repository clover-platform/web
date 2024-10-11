import {Skeleton} from "@easykit/design";

export const AIItemLoading = () => {
    return <div className={"flex bg-muted p-3 rounded-lg justify-center items-center space-x-1"}>
        <div className={"flex-1"}>
            <Skeleton className="h-4 w-8/12" />
        </div>
        <div className={"w-7 h-7 flex justify-center items-center"}>
            <Skeleton className="h-5 w-5 rounded-sm" />
        </div>
    </div>
}
