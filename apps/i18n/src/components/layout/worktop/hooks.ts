import { SIZE } from '@/components/pages/worktop/main/panel/entry'
import { all } from '@/rest/branch'
import { all as allEntry, count, detail } from '@/rest/entry'
import { languages } from '@/rest/module'
import {
  branchesState,
  countState,
  currentBranchState,
  currentEntryState,
  currentLanguageState,
  currentPageState,
  entriesLoadingState,
  entriesState,
  languagesState,
} from '@/state/worktop'
import type { Entry } from '@/types/module/entry'
import { useAtom } from 'jotai'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export const useWorktopState = () => {
  const search = useSearchParams()
  const [, setCurrentEntry] = useAtom(currentEntryState)
  const branch = search.get('branch') || ''
  const target = search.get('target') || ''
  const [loading, setLoading] = useState(true)
  const { module } = useParams()
  const [, setLanguages] = useAtom(languagesState)
  const [, setBranches] = useAtom(branchesState)
  const [, setCurrentLanguage] = useAtom(currentLanguageState)
  const [, setCurrentBranch] = useAtom(currentBranchState)

  const load = useCallback(async () => {
    setLoading(true)
    const languagesResult = await languages(module as string)
    const branchesResult = await all(module as string)
    setLoading(false)
    if (languagesResult.success) setLanguages(languagesResult.data || [])
    if (branchesResult.success) setBranches(branchesResult.data || [])
    setCurrentBranch(branch)
    setCurrentLanguage(target)
    setCurrentEntry(0)
  }, [module, setLanguages, setBranches, setCurrentBranch, setCurrentLanguage, setCurrentEntry, branch, target])

  useEffect(() => {
    load()
  }, [load])

  return loading
}

export const useQuerySync = () => {
  const router = useRouter()
  const [currentLanguage] = useAtom(currentLanguageState)
  const [currentBranch] = useAtom(currentBranchState)
  const query = [`target=${currentLanguage}`, `branch=${currentBranch}`].join('&')
  useEffect(() => {
    router.replace(`?${query}`)
  }, [query, router])
}

export const useEntriesLoader = () => {
  const { module } = useParams()
  const [originEntries, setOriginEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useAtom(entriesLoadingState)
  const [entries, setEntries] = useAtom(entriesState)
  const [currentBranch] = useAtom(currentBranchState)
  const [branches] = useAtom(branchesState)
  const [currentLanguage] = useAtom(currentLanguageState)
  const [, setCount] = useAtom(countState)
  const branch = branches.find((b) => b.name === currentBranch)
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
      branch: branch?.name,
      module: module as string,
      language: currentLanguage,
    }
    paramsRef.current = params
    const { success, data } = await allEntry(params)
    if (success) {
      setOriginEntries(data.data)
    }
    setLoading(false)
  }, [branch, module, currentLanguage, setLoading])

  const loadCount = useCallback(async () => {
    const countResult = await count({
      module: module as string,
      language: currentLanguage,
      branch: currentBranch,
    })
    if (countResult.success) setCount(countResult.data!)
  }, [module, currentLanguage, currentBranch, setCount])

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
  const [currentBranch] = useAtom(currentBranchState)
  const [, setCount] = useAtom(countState)
  const [branches] = useAtom(branchesState)

  const update = async (id: number) => {
    const entry = entries.find((e) => e.id === id)
    const branch = branches.find((b) => b.id === entry?.branchId)
    if (!branch?.name) return
    const result = await detail({
      id,
      language: currentLanguage,
      module: module as string,
      branch: branch.name,
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
      branch: currentBranch,
    })
    if (countResult.success) setCount(countResult.data!)
  }

  return {
    update,
    entries,
    remove,
  }
}
