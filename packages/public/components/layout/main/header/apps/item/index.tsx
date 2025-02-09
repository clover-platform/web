import {FC} from "react";
import {AppsItemProps} from "@clover/public/rest/config";

export const AppsItem: FC<AppsItemProps> = (props) => {
    const { title, description } = props;
    return <div className={"flex items-start space-x-2 cursor-pointer hover:bg-secondary-foreground/5 p-2 rounded-md"}>
        <div className="h-10 w-10 bg-secondary rounded-md" />
        <div className="space-y-1 flex-1">
            <div className={"leading-5"}>{ title }</div>
            <div className={"leading-3 text-xs text-secondary-foreground/50"}>{ description }</div>
        </div>
    </div>
}
