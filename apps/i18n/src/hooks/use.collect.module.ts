import { myCollect } from '@/rest/module'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export const useCollectModule = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['module:collect'],
    queryFn: () => myCollect(),
  })

  return {
    collect: data,
    loading: isLoading,
  }
}

export const useReloadCollectModule = () => {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({ queryKey: ['module:collect'], exact: false })
  }
}
