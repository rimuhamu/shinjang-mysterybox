'use server';

import prismadb from '@/lib/prismadb';

export async function getUser(token: string) {
  const currentUser = await prismadb.user.findFirst({
    where: {
      token: token,
    },
  });

  return currentUser;
}
