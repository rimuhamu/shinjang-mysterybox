'use server';

import prismadb from '@/lib/prismadb';

export async function getTokens() {
  const valid_tokens = await prismadb.user.findMany({
    select: { token: true },
  });
  return valid_tokens;
}
