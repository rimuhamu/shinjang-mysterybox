'use server';
import prismadb from '@/lib/prismadb';
import { TGeneratorValidator } from '@/lib/validators/generator-validator';
import { uid } from 'rand-token';

export async function generateToken(data: TGeneratorValidator) {
  const { name, tickets } = data;
  const token = uid(16);
  const user = await prismadb.user.create({
    data: { name, tickets, token },
  });
  console.log('action called');
  return user;
}
