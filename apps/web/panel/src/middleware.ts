import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    // страница авторизации
    const isAuthPage = pathname.startsWith("/auth");

    // если токен есть и юзер пытается зайти на /auth → отправляем на главную (или куда нужно)
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // если токена нет и юзер НЕ на странице /auth → редиректим на /auth
    if (!token && !isAuthPage) {
        return NextResponse.redirect(new URL("/auth", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|logo.svg|logo.png|icons/).*)",
    ],
};