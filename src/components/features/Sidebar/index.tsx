'use client';

import {
  ChartLineIcon,
  CreditCardIcon,
  HomeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div
      className={`bg-zinc-900 rounded-lg p-4 h-full flex flex-col gap-2 transition-all duration-300 overflow-hidden ${
        isExpanded ? 'max-w-[250px]' : 'max-w-18'
      } w-full relative`}
    >
      <div className={`flex items-center ${isExpanded ? 'justify-between' : 'justify-center'} mb-2 relative`}>
        <span
          className={`whitespace-nowrap pl-2 ${
            isExpanded ? 'flex w-auto' : 'hidden w-0'
          }`}
        >
          Menu
        </span>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className='bg-zinc-700 p-1 rounded-full hover:bg-zinc-600 transition-colors cursor-pointer z-10'
        >
          {isExpanded ? (
            <ChevronLeftIcon className='w-4 h-4' />
          ) : (
            <ChevronRightIcon className='w-4 h-4' />
          )}
        </button>
      </div>

      <Link
        className='flex items-center gap-2 hover:text-zinc-100 hover:bg-zinc-700 rounded-md p-2 px-3'
        href='/dashboard'
      >
        <HomeIcon className='w-4 h-4 flex-shrink-0' />
        <span
          className={`whitespace-nowrap ${
            isExpanded ? 'visible w-auto' : 'invisible w-0'
          }`}
        >
          Início
        </span>
      </Link>
      <Link
        className='flex items-center gap-2 hover:text-zinc-100 hover:bg-zinc-700 rounded-md p-2 px-3'
        href='/dashboard/transactions'
      >
        <CreditCardIcon className='w-4 h-4 flex-shrink-0' />
        <span
          className={`whitespace-nowrap ${
            isExpanded ? 'visible w-auto' : 'invisible w-0'
          }`}
        >
          Transações
        </span>
      </Link>
      <Link
        className='flex items-center gap-2 hover:text-zinc-100 hover:bg-zinc-700 rounded-md p-2 px-3'
        href='/dashboard/investments'
      >
        <ChartLineIcon className='w-4 h-4 flex-shrink-0' />
        <span
          className={`whitespace-nowrap ${
            isExpanded ? 'visible w-auto' : 'invisible w-0'
          }`}
        >
          Investimentos
        </span>
      </Link>
    </div>
  );
}
