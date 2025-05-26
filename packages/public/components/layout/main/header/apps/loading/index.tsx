import {AppsLoadingItem} from "@clover/public/components/layout/main/header/apps/loading/item";

export const AppsLoading = () => {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <AppsLoadingItem key={i} />
      ))}
    </div>
  )
}
