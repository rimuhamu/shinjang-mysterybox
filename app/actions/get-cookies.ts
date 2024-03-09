'use server';

import { cookies } from 'next/headers';

export async function getCookies(name: string) {
  return cookies().get(name)?.value!;
}
