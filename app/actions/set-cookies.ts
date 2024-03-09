'use server';

import { cookies } from 'next/headers';

export async function setCookies(token: string) {
  cookies().set({
    name: 'token',
    value: token,
    httpOnly: true,
    path: '/',
  });
}
