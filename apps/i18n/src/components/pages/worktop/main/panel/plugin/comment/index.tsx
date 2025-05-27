import { CommentEditor } from "@/components/pages/worktop/main/panel/plugin/comment/editor";
import { CommentList } from "@/components/pages/worktop/main/panel/plugin/comment/list";

export const Comment = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <CommentList />
      <CommentEditor />
    </div>
  )
}
