'use client';

import { getGreeting, formatDate } from '@/shared/utils/date';
import { useState } from 'react';
import {
  Eye,
  EyeOff,
  CreditCard,
  Wallet,
  PiggyBank,
  ArrowLeftRight,
} from 'lucide-react';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { formatCurrency } from '@/shared/utils/transactions';
import { usePathname } from 'next/navigation';
import TransactionTable from '../TransactionTable';
import { Transaction } from '@/shared/utils/transactions';

export function DashboardContent() {
  const pathname = usePathname();

  const greeting = getGreeting();
  const currentDate = formatDate();
  const [balance, setBalance] = useState(10000);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const services = [
    {
      title: 'Cartão de Crédito',
      description: 'Gerencie seu cartão de crédito',
      icon: CreditCard,
      onClick: () => console.log('Cartão de Crédito'),
    },
    {
      title: 'Carteira',
      description: 'Acesse sua carteira digital',
      icon: Wallet,
      onClick: () => console.log('Carteira'),
    },
    {
      title: 'Investimentos',
      description: 'Acompanhe seus investimentos',
      icon: PiggyBank,
      onClick: () => console.log('Investimentos'),
    },
    {
      title: 'Transferências',
      description: 'Faça transferências entre contas',
      icon: ArrowLeftRight,
      onClick: () => console.log('Transferências'),
    },
  ];

  // MOCK DE TRANSAÇÕES (igual ao TransactionsSide)
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

  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='bg-zinc-900 rounded-lg p-4'>
        <span className='text-zinc-400'>{currentDate}</span>
        <h1 className='text-2xl font-bold'>{greeting}, André!</h1>

        <div className='w-full h-[2px] bg-zinc-800 rounded-lg my-4' />

        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            <span className='text-zinc-400'>Seu saldo</span>
            <button
              onClick={toggleBalanceVisibility}
              className='text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer'
            >
              {isBalanceVisible ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          <span className='text-3xl font-bold'>
            {isBalanceVisible ? formatCurrency(balance) : '••••••••'}
          </span>
        </div>
      </div>

      {pathname === '/dashboard' && (
        <div className='bg-zinc-900 rounded-lg p-4 flex flex-col gap-4'>
          <span className='text-lg font-bold'>Serviços disponíveis</span>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                onClick={service.onClick}
              />
            ))}
          </div>
        </div>
      )}

      {pathname === '/dashboard/transactions' && (
        <div className='bg-zinc-900 rounded-lg p-4 h-full'>
          <span className='text-lg font-bold'>Transações</span>
          <TransactionTable transactions={mockTransactions} />
        </div>
      )}
    </div>
  );
}
