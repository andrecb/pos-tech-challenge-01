'use client';

import Image from 'next/image';
import Link from 'next/link';
// import { CreateAccount } from '../CreateAccount';
// import { Login } from '../Login';
import { usePathname, useRouter } from 'next/navigation';
import { LogOutIcon, SettingsIcon, UserIcon, MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MobileMenu } from '../MobileMenu';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);

  const user = {
    name: 'Usuário',
  };

  if (pathname.startsWith('/not-found')) {
    return null;
  }

  return (
    <header className='py-2 md:py-4 border-b border-zinc-700'>
      <div className='container px-4 md:px-6'>
        <div className='flex items-center justify-between'>
          <Link href='/'>
            <Image 
              src='/logo.webp' 
              alt='Logo' 
              width={100} 
              height={50} 
              className='w-[100px] md:w-[160px] h-auto'
            />
          </Link>

          <div className='flex items-center gap-2 md:gap-4'>
            {!pathname.includes('dashboard') && (
              <>
                <div className='hidden md:flex items-center gap-4'>
                  {/* <CreateAccount />
                  <Login /> */}
                  <Button variant='outline' onClick={() => router.push('/dashboard')}>
                    Acessar Dashboard
                  </Button>
                </div>
                <div className='md:hidden'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='outline' size='icon' className='h-8 w-8'>
                        <MenuIcon className='w-4 h-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='w-48'>
                      {/* <DropdownMenuItem asChild>
                        <div className='w-full'>
                          <div className='flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer hover:bg-zinc-800 rounded-sm'>
                            <UserPlusIcon className='w-4 h-4' />
                            <span>Criar Conta</span>
                          </div>
                          <div className='hidden'>
                            <CreateAccount />
                          </div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <div className='w-full'>
                          <div className='flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer hover:bg-zinc-800 rounded-sm'>
                            <LogInIcon className='w-4 h-4' />
                            <span>Acessar conta</span>
                          </div>
                          <div className='hidden'>
                            <Login />
                          </div>
                        </div>
                      </DropdownMenuItem> */}
                      <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                        <div className='flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer hover:bg-zinc-800 rounded-sm'>
                          <UserIcon className='w-4 h-4' />
                          <span>Acessar Dashboard</span>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            )}
            {pathname.includes('dashboard') && (
              <div className='flex items-center gap-2 md:gap-4'>
                <MobileMenu />
                <div className='flex items-center gap-2'>
                  <span className='text-sm hidden md:inline'>Olá, {user.name}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='outline' size='icon' className='h-8 w-8 md:h-10 md:w-10'>
                        <UserIcon className='w-4 h-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem>
                        <div 
                          className='flex items-center gap-2 cursor-pointer'
                          onClick={() => setShowSettingsDialog(true)}
                        >
                          <SettingsIcon className='w-4 h-4' />
                          Configurações
                        </div>
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
              </div>
            )}
          </div>
        </div>
      </div>
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configurações</DialogTitle>
            <DialogDescription>
              As configurações ainda não estão disponíveis. Em breve você poderá personalizar sua experiência!
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </header>
  );
}
