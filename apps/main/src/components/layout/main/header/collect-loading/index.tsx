import {Skeleton} from "@easykit/design";
import React from "react";

export const CollectLoadingItem = () => {
  return <div className={"p-2 hover:bg-secondary rounded-md flex justify-center items-center space-x-2 cursor-pointer group"}>
    <Skeleton className={"w-8 h-8 rounded-md"}/>
    <div className={"flex-1 flex justify-start items-center"}>
      <span><Skeleton className={"h-6 w-24"}/></span>
      <span className={"opacity-60 ml-1"}><Skeleton className={"h-6 w-12"}/></span>
    </div>
  </div>
}
