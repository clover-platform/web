import { SIZE } from '@/app/(worktop)/[module]/worktop/components/main/panel/entry'
import { all as allEntry, count, detail } from '@/rest/entry'
import { languages as allLanguage } from '@/rest/module'
import { all as allFile } from '@/rest/source'
import {
  countState,
  currentEntryState,
  currentFileState,
  currentLanguageState,
  currentPageState,
  entriesLoadingState,
  entriesState,
  filesState,
  languagesState,
} from '@/state/worktop'
import type { Entry } from '@/types/module/entry'
import type { File } from '@/types/module/source'
import type { Language } from '@/types/public'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export const useWorktopState = () => {
  const search = useSearchParams()
  const [, setCurrentEntry] = useAtom(currentEntryState)
  const file = search.get('file') || ''
  const target = search.get('target') || ''
  const { module } = useParams()
  const [, setLanguages] = useAtom(languagesState)
  const [, setFiles] = useAtom(filesState)
  const [, setCurrentLanguage] = useAtom(currentLanguageState)
  const [, setCurrentBranch] = useAtom(currentFileState)

  useEffect(() => {
    setCurrentBranch(file)
    setCurrentLanguage(target)
    setCurrentEntry(0)
  }, [file, target, setCurrentBranch, setCurrentLanguage, setCurrentEntry])

  const { data: result, isLoading: loading } = useQuery({
    queryKey: ['worktop:state', module],
    queryFn: async ({ queryKey }) => {
      const languagesResult = await allLanguage(queryKey[1] as string)
      const filesResult = await allFile(queryKey[1] as string)
      let languages: Language[] = []
      let files: File[] = []
      if (languagesResult.success) languages = languagesResult.data || []
      if (filesResult.success) files = filesResult.data || []
      return {
        languages,
        files,
      }
    },
  })

  useEffect(() => {
    if (result) {
      setLanguages(result.languages)
      setFiles(result.files)
    }
  }, [result, setLanguages, setFiles])

  return loading
}

export const useQuerySync = () => {
  const router = useRouter()
  const [currentLanguage] = useAtom(currentLanguageState)
  const [currentFile] = useAtom(currentFileState)
  const query = [`target=${currentLanguage}`, `file=${currentFile}`].join('&')
  useEffect(() => {
    router.replace(`?${query}`)
  }, [query, router])
}

export const useEntriesLoader = () => {
  const { module } = useParams()
  const [originEntries, setOriginEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useAtom(entriesLoadingState)
  const [entries, setEntries] = useAtom(entriesState)
  const [currentFile] = useAtom(currentFileState)
  const [files] = useAtom(filesState)
  const [currentLanguage] = useAtom(currentLanguageState)
  const [, setCount] = useAtom(countState)
  const file = files.find((b) => b.name === currentFile)
  const [page, setPage] = useAtom(currentPageState)
  const [current, setCurrent] = useAtom(currentEntryState)
  const [keyword, setKeyword] = useState<string>('')
  const paramsRef = useRef({})

  const filteredEntries = useMemo(() => {
    return originEntries?.filter((entry) => entry.value.includes(keyword)) || []
  }, [originEntries, keyword])

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

  const load = useCallback(async () => {
    setLoading(true)
    const params = {
      ...paramsRef.current,
      branch: file?.name,
      module: module as string,
      language: currentLanguage,
    }
    paramsRef.current = params
    const { success, data } = await allEntry(params)
    if (success) {
      setOriginEntries(data.data)
    }
    setLoading(false)
  }, [file, module, currentLanguage, setLoading])

  const loadCount = useCallback(async () => {
    const countResult = await count({
      module: module as string,
      language: currentLanguage,
      branch: currentFile,
    })
    if (countResult.success) setCount(countResult.data!)
  }, [module, currentLanguage, currentFile, setCount])

  useEffect(() => {
    if (currentLanguage) load().then()
    if (currentLanguage) loadCount().then()
  }, [currentLanguage, load, loadCount])

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
  const [currentFile] = useAtom(currentFileState)
  const [, setCount] = useAtom(countState)
  const [files] = useAtom(filesState)

  const update = async (id: number) => {
    const entry = entries.find((e) => e.id === id)
    const file = files.find((b) => b.id === entry?.fileId)
    if (!file?.name) return
    const result = await detail({
      id,
      language: currentLanguage,
      module: module as string,
      branch: file.name,
    })
    if (result.success) {
      setEntries(entries.map((entry) => (entry.id === id ? result.data! : entry)))
      loadCount().then()
    }
  }

  const remove = async (id: number) => {
    setEntries(entries.filter((entry) => entry.id !== id))
    loadCount().then()
  }

  const loadCount = async () => {
    const countResult = await count({
      module: module as string,
      language: currentLanguage,
      branch: currentFile,
    })
    if (countResult.success) setCount(countResult.data!)
  }

  return {
    update,
    entries,
    remove,
  }
}
