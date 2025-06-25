import { CommentEditor } from './editor'
import { CommentList } from './list'

export const Comment = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <CommentList />
      <CommentEditor />
    </div>
  )
}
