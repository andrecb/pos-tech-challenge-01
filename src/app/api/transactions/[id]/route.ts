import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

async function readjustBalanceOnUpdate(oldAmount: number, oldType: string, newAmount: number, newType: string) {
    const currentBalance = await prisma.balance.findFirst();
    if (!currentBalance) return;

    let adjustedAmount = currentBalance.totalAmount;

    if (oldType === 'income') {
        adjustedAmount -= oldAmount;
    } else {
        adjustedAmount += oldAmount;
    }

    if (newType === 'income') {
        adjustedAmount += newAmount;
    } else {
        adjustedAmount -= newAmount;
    }

    await prisma.balance.update({
        where: { id: currentBalance.id },
        data: { totalAmount: adjustedAmount },
    });
}

async function readjustBalanceOnDelete(deletedAmount: number, deletedType: string) {
    const currentBalance = await prisma.balance.findFirst();
    if (!currentBalance) return;

    let adjustedAmount = currentBalance.totalAmount;

    if (deletedType === 'income') {
        adjustedAmount -= deletedAmount;
    } else {
        adjustedAmount += deletedAmount;
    }

    await prisma.balance.update({
        where: { id: currentBalance.id },
        data: { totalAmount: adjustedAmount },
    });
}


export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });
    if (!transaction) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
    }
    return NextResponse.json(transaction, { status: 200 });
  } catch (error) {
    console.error(`Error fetching transaction ${id}:`, error);
    return NextResponse.json({ message: 'Error fetching transaction' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    const { description, amount, type, date } = await request.json();

    if (!description || typeof amount !== 'number' || !type) {
        return NextResponse.json({ message: 'Missing required fields for update' }, { status: 400 });
    }

    const oldTransaction = await prisma.transaction.findUnique({ where: { id } });
    if (!oldTransaction) {
      return NextResponse.json({ message: 'Transaction not found for update' }, { status: 404 });
    }

    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data: {
        description,
        amount,
        type,
        date: date ? new Date(date) : oldTransaction.date,
      },
    });

    await readjustBalanceOnUpdate(oldTransaction.amount, oldTransaction.type, amount, type);

    return NextResponse.json(updatedTransaction, { status: 200 });
  } catch (error) {
    console.error(`Error updating transaction ${id}:`, error);
    return NextResponse.json({ message: 'Error updating transaction' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    const deletedTransaction = await prisma.transaction.delete({
      where: { id },
    });

    await readjustBalanceOnDelete(deletedTransaction.amount, deletedTransaction.type);

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(`Error deleting transaction ${id}:`, error);
    return NextResponse.json({ message: 'Error deleting transaction' }, { status: 500 });
  }
}