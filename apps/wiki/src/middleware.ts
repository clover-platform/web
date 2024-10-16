import { NextResponse, NextRequest } from "next/server";

let locales = ['en-us', 'zh-cn']

// Get the preferred locale, similar to the above or using a library
const getLocale = (request: NextRequest) => {
    return "zh-cn";
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    // Pass the original URL to the redirected page
    const url = new URL(request.url);
    const origin = url.origin;
    request.headers.append('next-url', request.url);
    request.headers.append('next-origin', origin);
    request.headers.append('next-pathname', pathname);

    // Check if there is any supported locale in the pathname
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
