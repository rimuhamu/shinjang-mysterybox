'use server';

import prismadb from '@/lib/prismadb';

export async function getTokens() {
  const availableTokens = await prismadb.user.findMany({
    select: { token: true, isExpired: true },
  });

  return availableTokens;
}
