import { Skeleton } from "@easykit/design";

const LOADING_ITEM = [0,1,2,3,4,5,6,7,8]

export const EntryLoading = () => {
    return LOADING_ITEM.map((item) => {
        return <div key={item} className={"flex justify-center items-center px-2 py-1 rounded-sm my-0.5 cursor-pointer"}>
            <div className={"w-6 h-6 flex justify-center items-center"}>
                <Skeleton className="w-5 h-5 rounded-full" />
            </div>
            <div className={"flex-1"}>
                <Skeleton className="h-5 w-8/12" />
            </div>
        </div>
    })
}
