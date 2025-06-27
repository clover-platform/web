import { SIZE } from '@/app/(worktop)/[module]/[fileId]/worktop/components/main/panel/entry'
import { all as allEntry, count, detail } from '@/rest/entry'
import { languages as allLanguage } from '@/rest/module'
import { all as allFile } from '@/rest/source'
import {
  countState,
  currentEntryState,
  currentFileState,
  currentLanguageState,
  currentPageState,
  entriesState,
  filesState,
  languagesState,
} from '@/state/worktop'
import { useMessage } from '@easykit/design'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export const useWorktopState = () => {
  const search = useSearchParams()
  const [, setCurrentEntry] = useAtom(currentEntryState)
  const target = search.get('target') || ''
  const { module, fileId } = useParams()
  const [, setLanguages] = useAtom(languagesState)
  const [, setFiles] = useAtom(filesState)
  const [currentLanguage, setCurrentLanguage] = useAtom(currentLanguageState)
  const [currentFile, setCurrentFile] = useAtom(currentFileState)
  const [, setCount] = useAtom(countState)
  const queryClient = useQueryClient()

  useEffect(() => {
    setCurrentFile(fileId as string)
    setCurrentLanguage(target)
    setCurrentEntry(0)
  }, [fileId, target, setCurrentFile, setCurrentLanguage, setCurrentEntry])

  const { data: result, isLoading: loading } = useQuery({
    queryKey: ['worktop:state', module],
    queryFn: async ({ queryKey }) => {
      const languages = await allLanguage(queryKey[1] as string)
      const files = await allFile(queryKey[1] as string)
      return {
        languages,
        files,
      }
    },
  })
  const { data: countResult } = useQuery({
    queryKey: ['worktop:count', module, currentFile || 'all', currentLanguage],
    queryFn: () =>
      count({
        module: module as string,
        language: currentLanguage,
        fileId: currentFile === 'all' ? undefined : Number(currentFile),
      }),
    enabled: !!currentLanguage,
  })

  useEffect(() => {
    if (countResult) setCount(countResult)
  }, [countResult, setCount])

  useEffect(() => {
    if (result) {
      setLanguages(result.languages || [])
      setFiles(result.files || [])
    }
  }, [result, setLanguages, setFiles])

  useEffect(() => {
    return () => {
      setLanguages([])
      setFiles([])
      setCount({
        total: 0,
        translated: 0,
        verified: 0,
      })
      setCurrentFile('all')
      setCurrentLanguage('')
      setCurrentEntry(0)
      queryClient.invalidateQueries({ queryKey: ['worktop:entries'], exact: false })
      queryClient.invalidateQueries({ queryKey: ['worktop:count'], exact: false })
      queryClient.invalidateQueries({ queryKey: ['worktop:state'], exact: false })
    }
  }, [setLanguages, setFiles, setCount, setCurrentFile, setCurrentLanguage, setCurrentEntry, queryClient])

  return loading
}

export const useQuerySync = () => {
  const router = useRouter()
  const { module, fileId } = useParams()
  const [currentLanguage] = useAtom(currentLanguageState)
  const query = [`target=${currentLanguage}`].join('&')
  useEffect(() => {
    router.replace(`/${module}/${fileId || 'all'}/worktop?${query}`)
  }, [query, router, module, fileId])
}

export const useEntriesLoader = () => {
  const { module } = useParams()
  const [entries, setEntries] = useAtom(entriesState)
  const [currentFile] = useAtom(currentFileState)
  const [files] = useAtom(filesState)
  const [currentLanguage] = useAtom(currentLanguageState)
  const file = files.find((b) => b.id === Number(currentFile))
  const [page, setPage] = useAtom(currentPageState)
  const [current, setCurrent] = useAtom(currentEntryState)
  const [keyword, setKeyword] = useState<string>('')
  const paramsRef = useRef({})
  const queryClient = useQueryClient()
  const { data: originEntries, isLoading: loading } = useQuery({
    queryKey: ['worktop:entries', module, file?.id || 'all', currentLanguage],
    queryFn: () =>
      allEntry({
        ...paramsRef.current,
        fileId: file?.id,
        module: module as string,
        language: currentLanguage,
      }),
    enabled: !!currentLanguage,
  })

  const load = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['worktop:entries'], exact: false })
  }, [queryClient])

  const filteredEntries = useMemo(() => {
    if (!currentLanguage) return []
    return originEntries?.data?.filter((entry) => entry.value.includes(keyword)) || []
  }, [originEntries, keyword, currentLanguage])

  const pages = useMemo(() => {
    return Math.ceil((filteredEntries?.length || 0) / SIZE)
  }, [filteredEntries])

  const pageEntries = useMemo(() => {
    const startIndex = (page - 1) * SIZE // 计算起始索引
    return filteredEntries.slice(startIndex, startIndex + SIZE) // 使用 slice 获取分页数据
  }, [filteredEntries, page])

  useEffect(() => {
    setEntries(pageEntries)
  }, [pageEntries, setEntries])

  return {
    load,
    loading,
    entries,
    setPage,
    setCurrent,
    setKeyword,
    pages,
    page,
    current,
    keyword,
  }
}

export const useEntriesUpdater = () => {
  const { module } = useParams()
  const [entries, setEntries] = useAtom(entriesState)
  const [currentLanguage] = useAtom(currentLanguageState)
  const [files] = useAtom(filesState)
  const queryClient = useQueryClient()
  const msg = useMessage()

  const { mutateAsync } = useMutation({
    mutationFn: detail,
    onError: (error) => {
      msg.error(error.message)
    },
  })

  const update = async (id: number) => {
    const entry = entries.find((e) => e.id === id)
    const file = files.find((b) => b.id === entry?.fileId)
    if (!file?.id) return
    const result = await mutateAsync({
      id,
      language: currentLanguage,
      module: module as string,
      fileId: file.id,
    })
    setEntries(entries.map((entry) => (entry.id === id ? result! : entry)))
    queryClient.invalidateQueries({ queryKey: ['worktop:count'], exact: false })
  }

  const remove = async (id: number) => {
    setEntries(entries.filter((entry) => entry.id !== id))
    queryClient.invalidateQueries({ queryKey: ['worktop:count'], exact: false })
  }

  return {
    update,
    entries,
    remove,
  }
}
