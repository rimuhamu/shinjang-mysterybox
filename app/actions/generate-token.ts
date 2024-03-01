'use server';
import prismadb from '@/libs/prismadb';
import { uid } from 'rand-token';

export async function generateToken(name: string) {
  const token = uid(16);
  const user = await prismadb.user.create({
    data: { name, token },
  });
  console.log('action called');
  return user;
}