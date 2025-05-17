import { NextRequest, NextResponse } from 'next/server';
import { SQUARE_TOKEN } from './constants/cookie.token';

export function middleware(request: NextRequest) {
  const squareId = request.cookies.get(SQUARE_TOKEN.description!)?.value;
  const publicPages = ['/connect'];
  const isHomePage = request.nextUrl.pathname === '/';

  const isPublicPage = publicPages.some((page) =>
    request.nextUrl.pathname.startsWith(page)
  ) || isHomePage;

  if (!squareId && !isPublicPage) {
    return NextResponse.redirect(new URL('/connect', request.nextUrl));
  }

  if (squareId && isPublicPage) {
    return NextResponse.redirect(
      new URL(`/square/${squareId}`, request.nextUrl)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/connect', '/square/:squareId'],
};
