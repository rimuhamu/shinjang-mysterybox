import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const suppliedToken = cookies().get('token')?.value;
  const validToken = process.env.NEXT_PUBLIC_AUTH_TOKEN;
  console.log(suppliedToken);

  if (suppliedToken !== validToken) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/token-gen'],
};
