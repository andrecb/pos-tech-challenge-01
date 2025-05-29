'use client';

import {
  Transaction,
  formatCurrency,
  formatDate,
  getTransactionAmount,
  groupTransactionsByMonth,
  translateTransactionType,
} from '@/shared/utils/transactions';

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'transfer',
    amount: 100,
    date: '2024-03-15',
  },
  {
    id: '2',
    type: 'deposit',
    amount: 1000,
    date: '2024-03-10',
  },
  {
    id: '3',
    type: 'withdraw',
    amount: 200,
    date: '2024-02-20',
  },
  {
    id: '4',
    type: 'deposit',
    amount: 500,
    date: '2024-02-05',
  },
  {
    id: '5',
    type: 'withdraw',
    amount: 150,
    date: '2024-02-18',
  },
  {
    id: '6',
    type: 'transfer',
    amount: 250,
    date: '2023-12-22',
  },
  {
    id: '7',
    type: 'deposit',
    amount: 1200,
    date: '2023-12-10',
  },
  {
    id: '8',
    type: 'withdraw',
    amount: 300,
    date: '2023-11-30',
  },
  {
    id: '9',
    type: 'transfer',
    amount: 400,
    date: '2023-11-15',
  },
  {
    id: '10',
    type: 'deposit',
    amount: 800,
    date: '2023-10-25',
  },
];

export default function Transactions() {
  const groupedTransactions = groupTransactionsByMonth(mockTransactions);

  return (
    <div className='bg-zinc-900 rounded-lg p-4 pr-2 flex flex-col gap-4 max-w-full xl:max-w-[300px] w-full min-h-[500px] h-full overflow-y-auto'>
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
                            transaction.type === 'deposit' ? 'text-green-400' : 'text-red-400'
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
