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
import { useTransactions } from '@/shared/contexts/TransactionContext';

export function DashboardContent() {
  const pathname = usePathname();
  const { transactions, balance, isLoading } = useTransactions();
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const greeting = getGreeting();
  const currentDate = formatDate();

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
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <span className="text-zinc-400">Carregando transações...</span>
            </div>
          ) : (
            <TransactionTable transactions={transactions} />
          )}
        </div>
      )}
    </div>
  );
}
