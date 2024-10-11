import classNames from "classnames";
import { Skeleton } from "@easykit/design";

export const ResultItemLoading = () => {
    return <div className={classNames(
        "border rounded-md",
        "hover:shadow-md",
    )}>
        <div className={"bg-muted px-3 py-2 flex justify-center items-start"}>
            <div className={"flex-1 mr-2 py-1"}>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-6/12" />
                </div>
            </div>
            <div className={"space-x-1 flex justify-center items-center"}>
                <Skeleton className={"h-8 w-8 rounded-md"} />
                <Skeleton className={"h-8 w-8 rounded-md"} />
            </div>
        </div>
        <div className={"p-2 space-y-2"}>
            <div className={"flex justify-start items-center space-x-2"}>
                <div className={"flex justify-start items-center"}>
                    <Skeleton className={"h-8 w-8 rounded-full"} />
                    <span className={"text-muted-foreground ml-1"}>
                        <Skeleton className="h-4 w-10" />
                    </span>
                </div>
                <div className={"text-muted-foreground"}>
                    <Skeleton className="h-4 w-10" />
                </div>
            </div>
        </div>
    </div>
}
