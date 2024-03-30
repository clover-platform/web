export const withQuery = (href: string, query: string) => {
    return href + (href.includes("?") ? "&" : "?") + query;
}
