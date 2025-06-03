import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    let balance = await prisma.balance.findFirst();

    if (!balance) {
      balance = await prisma.balance.create({
        data: { totalAmount: 0 },
      });
    }
    return NextResponse.json(balance, { status: 200 });
  } catch (error) {
    console.error('Error fetching balance:', error);
    return NextResponse.json({ message: 'Error fetching balance' }, { status: 500 });
  }
}