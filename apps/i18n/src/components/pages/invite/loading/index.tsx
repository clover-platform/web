import {Skeleton} from "@easykit/design";

export const InvitePageLoading = () => {
    return <div className={"w-[360px] space-y-4 mt-8"}>
        <div className={"text-base"}>
            <Skeleton className={"h-6 w-6/12"}/>
        </div>
        <div className={"space-y-2"}>
            <div className={"space-x-2 text-muted-foreground flex items-center"}>
                <Skeleton className={"h-4 w-10"}/>
                <Skeleton className={"h-5 w-16"}/>
                <Skeleton className={"h-4 w-10"}/>
            </div>
            <div className={"flex justify-center items-start border shadow rounded-md p-3"}>
                <div className={"mr-2"}>
                    <Skeleton className={"w-12 h-10"}/>
                </div>
                <div className={"flex-1 space-y-1"}>
                    <div className={"text-base"}><Skeleton className={"h-6 w-6/12"}/></div>
                    <div className={"text-muted-foreground"}><Skeleton className={"h-5 w-20"}/></div>
                    <div className={"bg-muted p-2 space-y-1 rounded-md"}>
                        <div className={"flex justify-center items-center"}>
                            <div className={"mr-2"}>
                                <Skeleton className={"w-8 h-6"}/>
                            </div>
                            <div className={"text-md text-muted-foreground flex-1"}>
                                <Skeleton className={"h-4 w-16"}/>
                            </div>
                        </div>
                        <div className={"bg-white h-0.5 -mx-2"}/>
                        <div className={"flex justify-center items-center"}>
                            <div className={"mr-2"}>
                                <Skeleton className={"w-8 h-6"}/>
                            </div>
                            <div className={"text-md text-muted-foreground flex-1"}>
                                <Skeleton className={"h-4 w-16"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={"!mt-8"}>
            <Skeleton className={"h-9 w-full"}/>
        </div>
    </div>
}
