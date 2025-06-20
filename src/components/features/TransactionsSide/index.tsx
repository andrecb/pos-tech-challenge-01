'use client';

import {
  formatCurrency,
  formatDate,
  getTransactionAmount,
  groupTransactionsByMonth,
  translateTransactionType,
} from '@/shared/utils/transactions';
import { useTransactions } from '@/shared/contexts/TransactionContext';

const TransactionSkeleton = () => {
  return (
    <div className='flex flex-col gap-2 mb-4'>
      <div className='h-4 w-24 bg-zinc-800 rounded animate-pulse' />
      <div className='flex flex-col gap-2 bg-zinc-800 rounded-lg p-4'>
        {[1, 2, 3].map((index) => (
          <div key={index} className='flex items-center justify-between'>
            <div className='flex flex-col gap-2'>
              <div className='h-4 w-32 bg-zinc-700 rounded animate-pulse' />
              <div className='h-3 w-20 bg-zinc-700 rounded animate-pulse' />
            </div>
            <div className='h-4 w-24 bg-zinc-700 rounded animate-pulse' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Transactions() {
  const { transactions, isLoading } = useTransactions();
  const groupedTransactions = groupTransactionsByMonth(transactions);

  if (isLoading) {
    return (
      <div className='bg-zinc-900 rounded-lg p-4 pr-2 flex flex-col gap-4 max-w-full xl:max-w-[300px] w-full h-[500px] xl:h-full overflow-y-auto'>
        <h2 className='text-lg font-bold'>Extrato</h2>
        <div className='flex-1 overflow-y-auto pr-2'>
          {[1, 2, 3].map((index) => (
            <TransactionSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='bg-zinc-900 rounded-lg p-4 pr-2 flex flex-col gap-4 max-w-full xl:max-w-[300px] w-full h-[500px] xl:h-full overflow-y-auto'>
      <h2 className='text-lg font-bold'>Extrato</h2>
      <div className='flex-1 overflow-y-auto pr-2'>
        {Object.entries(groupedTransactions).map(
          ([monthYear, transactions]) => (
            <div key={monthYear} className='flex flex-col gap-2 mb-4'>
              <h3 className='text-sm font-semibold text-zinc-400 capitalize'>
                {monthYear}
              </h3>
              <div className='flex flex-col gap-2 bg-zinc-800 rounded-lg p-4'>
                {transactions.map((transaction) => {
                  const amount = getTransactionAmount(transaction);
                  return (
                    <div
                      key={transaction.id}
                      className='flex items-center justify-between group relative transition-colors duration-200 '
                    >
                      <div className='flex flex-col'>
                        <span className='text-zinc-300'>
                          {translateTransactionType(transaction.type)}
                        </span>
                        <span className='text-xs text-zinc-500'>
                          {formatDate(transaction.date)}
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span
                          className={`${
                            transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                          }`}
                        >
                          {formatCurrency(amount)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
