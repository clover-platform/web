import { useCallback, useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { myCollect } from '@/rest/project'
import { loadedProjectCollectState, projectCollectState } from '@/state/collect'

export const useCollectProject = () => {
  const [loaded, setLoaded] = useAtom(loadedProjectCollectState)
  const [projectCollect, setProjectCollect] = useAtom(projectCollectState)
  const [loading, setLoading] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setLoaded(true)
    const { success, data } = await myCollect()
    if (success) {
      setProjectCollect(data!)
    }
    setLoading(false)
  }, [setLoaded, setProjectCollect])

  useEffect(() => {
    if (!loaded) {
      load().then()
    }
  }, [loaded, load])

  return { loaded, loading, load, collect: projectCollect }
}
