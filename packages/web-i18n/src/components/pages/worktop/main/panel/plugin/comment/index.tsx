import { CommentEditor } from "@/components/pages/worktop/main/panel/plugin/comment/editor";
import { CommentList } from "@/components/pages/worktop/main/panel/plugin/comment/list";

export const Comment = () => {
    return <div className={"w-full h-full flex justify-center items-center flex-col"}>
        <CommentList />
        <CommentEditor />
    </div>
}
