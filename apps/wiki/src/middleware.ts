import { NextResponse, NextRequest } from "next/server";

let locales = ['en-us', 'zh-cn']

// Get the preferred locale, similar to the above or using a library
const getLocale = (request: NextRequest) => {
    return "zh-cn";
}

export function middleware(request: NextRequest) {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )
    if (pathnameHasLocale) return

    // Redirect if there is no locale
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        '/((?!api|assets|favicon|site.web|android-chrome|apple-touch-icon).*)',
    ],
}
