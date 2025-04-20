import {isBoolean} from "es-toolkit";
import {ReadonlyURLSearchParams} from "next/dist/client/components/navigation.react-server";

export const withQuery = (href: string, withQuery: boolean | string[] | undefined, query: ReadonlyURLSearchParams) => {
  if (Array.isArray(withQuery)) {
    const q = withQuery.map((name: string) => {
      const value = query.get(name);
      return `${name}=${value}`;
    }).join("&");
    return href + (href.includes("?") ? "&" : "?") + q;
  } else if (isBoolean(withQuery)) {
    if (withQuery) return href + (href.includes("?") ? "&" : "?") + query.toString();
  }
  return href;
}
