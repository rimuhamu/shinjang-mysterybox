import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const supplied_token = req.nextUrl.searchParams.get('token');
  const valid_token = process.env.AUTH_TOKEN;

  if (supplied_token !== valid_token) {
    const homeUrl = new URL('/', req.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/raffle/:path*', '/token-gen', '/api/generate'],
};
