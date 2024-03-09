'use server';

import prismadb from '@/lib/prismadb';

interface PatchUserProps {
  token: string;
  tickets: number;
  isExpired: boolean;
}

export async function patchUser({ token, tickets, isExpired }: PatchUserProps) {
  const updatedUser = await prismadb.user.update({
    where: {
      token: token,
    },
    data: {
      tickets: tickets,
      isExpired: isExpired,
    },
  });

  return updatedUser;
}
