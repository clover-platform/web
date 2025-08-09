'use client'

import { InvitePageExpired } from './expired'
import { InvitePageJoined } from './joined'
import { InvitePageLoading } from './loading'
import { InvitePageBody } from './page'

import { useCallback, useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { useSearchParams } from 'next/navigation'
import { isLoginState } from '@clover/public/state/account'
import { detail as detailRest } from '@/rest/member.invite'
import type { InviteDetail } from '@/types/module'

export const InvitePage = () => {
  const search = useSearchParams()
  const token = search.get('t')
  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useState<InviteDetail | undefined>()
  const [expired, setExpired] = useState<boolean>(false)
  const [joined, setJoined] = useState<boolean>(false)
  const [module, setModule] = useState<string>()
  const [isLogin] = useAtom(isLoginState)

  const load = useCallback(async () => {
    setLoading(true)
    const { success, data, code } = await detailRest(token!)
    if (success) {
      setDetail(data as InviteDetail)
    } else if (code === 10033) {
      setExpired(true)
    } else if (code === 10032) {
      setJoined(true)
      setModule(data as string)
    } else {
      // 其他情况
      setExpired(true)
    }
    setLoading(false)
  }, [token])

  useEffect(() => {
    load().then()
  }, [load])

  return loading ? (
    <InvitePageLoading />
  ) : (
    <>
      {expired && <InvitePageExpired />}
      {joined && <InvitePageJoined module={module!} />}
      {!(expired || joined) && <InvitePageBody detail={detail} isLogin={isLogin} loading={loading} />}
    </>
  )
}
