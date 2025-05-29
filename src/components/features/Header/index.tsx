'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CreateAccount } from '../CreateAccount';
import { Login } from '../Login';
import { usePathname, useRouter } from 'next/navigation';
import { LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const user = {
    name: 'André Barros',
  };

  if (pathname.startsWith('/not-found')) {
    return null;
  }

  return (
    <header className='py-4 border-b border-zinc-700'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          <Link href='/'>
            <Image src='/logo.webp' alt='Logo' width={180} height={50} />
          </Link>

          <div className='flex items-center gap-4'>
            {!pathname.includes('dashboard') && (
              <>
                <CreateAccount />
                <Login />
              </>
            )}
            {pathname.includes('dashboard') && (
              <div className='flex items-center gap-2'>
                <span className='text-sm'>Olá, {user.name}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline' size='icon'>
                      <UserIcon className='w-4 h-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem>
                      <Link className='flex items-center gap-2' href='/dashboard/settings'>
                        <SettingsIcon className='w-4 h-4' />
                        Configurações
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        localStorage.removeItem('token');
                        router.push('/');
                      }}
                    >
                      <LogOutIcon className='w-4 h-4' />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
