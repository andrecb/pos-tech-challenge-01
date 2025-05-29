'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LogInIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const [open, setOpen] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    // Implementar lógica de login aqui
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <LogInIcon className='w-4 h-4' />
          Acessar conta
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className='flex flex-col items-center mb-4'>
            <LogInIcon className='w-8 h-8 text-primary mb-2' />
            <DialogTitle className='text-xl font-bold text-zinc-100'>
              Acessar Conta
            </DialogTitle>
          </div>
          <DialogDescription className='text-sm text-zinc-100 mb-4'>
            Entre com suas credenciais para acessar sua conta
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email' className='text-zinc-100'>Email</Label>
            <Input
              id='email'
              type='email'
              {...register('email')}
              className='bg-zinc-800 border-zinc-700 text-zinc-100'
            />
            {errors.email && (
              <span className='text-red-500 text-sm'>{errors.email.message}</span>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='password' className='text-zinc-100'>Senha</Label>
            <Input
              id='password'
              type='password'
              {...register('password')}
              className='bg-zinc-800 border-zinc-700 text-zinc-100'
            />
            {errors.password && (
              <span className='text-red-500 text-sm'>{errors.password.message}</span>
            )}
          </div>

          <div className='flex'>
            <Button
              type='button'
              variant='link'
              className='text-sm text-primary hover:underline p-0 h-auto'
              onClick={() => {
                // Implementar lógica de recuperação de senha aqui
                console.log('Recuperar senha');
              }}
            >
              Esqueci minha senha
            </Button>
          </div>

          <Button type='submit' className='w-full mt-6'>
            Entrar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
