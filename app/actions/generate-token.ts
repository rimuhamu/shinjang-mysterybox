'use server';
import prismadb from '@/lib/prismadb';
import { TGeneratorValidator } from '@/lib/validators/generator-validator';
import crypto from 'crypto';

export async function generateToken(data: TGeneratorValidator) {
  const { name, tickets } = data;
  const isExpired = false;
  const token = crypto.randomUUID();
  const user = await prismadb.user.create({
    data: { name, tickets, token, isExpired },
  });
  console.log('SERVER_ACTION: Token generated.');
  return user;
}
