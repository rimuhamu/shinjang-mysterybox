import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const supplied_token = cookies().get('token')?.value;
  const valid_token = process.env.NEXT_PUBLIC_AUTH_TOKEN;
  console.log(supplied_token);

  if (supplied_token !== valid_token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/token-gen'],
};
