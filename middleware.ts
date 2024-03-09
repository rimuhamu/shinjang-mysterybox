import { NextRequest, NextResponse } from 'next/server';
import { getCookies } from './app/actions/get-cookies';

export async function middleware(req: NextRequest) {
  const suppliedToken = await getCookies('token');
  const validToken = process.env.NEXT_PUBLIC_AUTH_TOKEN;
  console.log('token cookies: ', suppliedToken);

  if (suppliedToken !== validToken) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/token-gen'],
};
