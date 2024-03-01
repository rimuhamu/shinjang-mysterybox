import prismadb from '@/libs/prismadb';
import { NextRequest, NextResponse } from 'next/server';
import { uid } from 'rand-token';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name } = body;

  const token = uid(16);

  try {
    const user = await prismadb.user.create({
      data: { name, token },
    });
    console.log(user);
    console.log('api called');
    return NextResponse.json(user);
  } catch (error) {
    console.log('[GENERATE_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
