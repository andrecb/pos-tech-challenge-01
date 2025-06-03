import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

async function updateBalance(amount: number, type: string) {
  const currentBalance = await prisma.balance.findFirst();

  let newTotalAmount: number;
  if (type === 'income') {
    newTotalAmount = (currentBalance?.totalAmount || 0) + amount;
  } else {
    newTotalAmount = (currentBalance?.totalAmount || 0) - amount;
  }

  if (currentBalance) {
    await prisma.balance.update({
      where: { id: currentBalance.id },
      data: { totalAmount: newTotalAmount },
    });
  } else {
    await prisma.balance.create({
      data: { totalAmount: newTotalAmount },
    });
  }
}


export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: {
        date: 'desc',
      },
    });
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ message: 'Error fetching transactions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { description, amount, type, date } = await request.json();

    if (!description || typeof amount !== 'number' || !type) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        description,
        amount,
        type,
        date: date ? new Date(date) : new Date(),
      },
    });

    await updateBalance(amount, type);

    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json({ message: 'Error creating transaction' }, { status: 500 });
  }
}