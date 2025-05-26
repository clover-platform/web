import {isBoolean} from "es-toolkit";
import type { ReadonlyURLSearchParams } from 'next/dist/client/components/navigation.react-server'

export const withQuery = (href: string, withQuery: boolean | string[] | undefined, query: ReadonlyURLSearchParams) => {
  if (Array.isArray(withQuery)) {
    const q = withQuery
      .map((name: string) => {
        const value = query.get(name)
        return `${name}=${value}`
      })
      .join('&')
    return href + (href.includes('?') ? '&' : '?') + q
  }
  if (isBoolean(withQuery) && withQuery) return href + (href.includes('?') ? '&' : '?') + query.toString()
  return href
}
