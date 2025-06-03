'use client';

import {
  ChartLineIcon,
  CreditCardIcon,
  HomeIcon,
  MenuIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function MobileMenu() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="md:hidden relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <MenuIcon className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Link
              className={`flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer hover:bg-zinc-800 rounded-sm ${
                isActive('/dashboard') ? 'bg-zinc-700 text-zinc-100' : ''
              }`}
              href="/dashboard"
            >
              <HomeIcon className="w-4 h-4" />
              <span>Início</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              className={`flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer hover:bg-zinc-800 rounded-sm ${
                isActive('/dashboard/transactions') ? 'bg-zinc-700 text-zinc-100' : ''
              }`}
              href="/dashboard/transactions"
            >
              <CreditCardIcon className="w-4 h-4" />
              <span>Transações</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              className={`flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer hover:bg-zinc-800 rounded-sm ${
                isActive('/dashboard/investments') ? 'bg-zinc-700 text-zinc-100' : ''
              }`}
              href="/dashboard/investments"
            >
              <ChartLineIcon className="w-4 h-4" />
              <span>Investimentos</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
} 