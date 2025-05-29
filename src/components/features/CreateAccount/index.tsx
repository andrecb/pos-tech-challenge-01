'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserPlusIcon, LockIcon } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const createAccountSchema = z
  .object({
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'Você precisa aceitar os termos de uso',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

type CreateAccountFormData = z.infer<typeof createAccountSchema>;

export function CreateAccount() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
  });

  const onSubmit = (data: CreateAccountFormData) => {
    console.log(data);
    // Implementar lógica de criação de conta aqui
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <UserPlusIcon className='w-4 h-4' />
          Criar Conta
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className='flex flex-col items-center mb-4'>
            <LockIcon className='w-8 h-8 text-primary mb-2' />
            <DialogTitle className='text-xl font-bold text-zinc-100'>
              Criar Nova Conta
            </DialogTitle>
          </div>
          <DialogDescription className='text-sm text-zinc-100 mb-4'>
            Preencha os campos abaixo para criar uma nova conta
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name' className='text-zinc-100'>
              Nome
            </Label>
            <Input
              id='name'
              type='text'
              className='bg-zinc-800 border-zinc-700 text-zinc-100'
              {...register('name')}
            />
            {errors.name && (
              <span className='text-sm text-red-500'>
                {errors.name.message}
              </span>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email' className='text-zinc-100'>
              Email
            </Label>
            <Input
              id='email'
              type='email'
              className='bg-zinc-800 border-zinc-700 text-zinc-100'
              {...register('email')}
            />
            {errors.email && (
              <span className='text-sm text-red-500'>
                {errors.email.message}
              </span>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password' className='text-zinc-100'>
              Senha
            </Label>
            <Input
              id='password'
              type='password'
              className='bg-zinc-800 border-zinc-700 text-zinc-100'
              {...register('password')}
            />
            {errors.password && (
              <span className='text-sm text-red-500'>
                {errors.password.message}
              </span>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='confirmPassword' className='text-zinc-100'>
              Confirmar Senha
            </Label>
            <Input
              id='confirmPassword'
              type='password'
              className='bg-zinc-800 border-zinc-700 text-zinc-100'
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <span className='text-sm text-red-500'>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='acceptTerms' {...register('acceptTerms')} />
            <Label htmlFor='acceptTerms' className='text-sm text-zinc-100'>
              Eu aceito os termos de uso e política de privacidade
            </Label>
          </div>
          {errors.acceptTerms && (
            <span className='text-sm text-red-500'>
              {errors.acceptTerms.message}
            </span>
          )}
          <div className='flex justify-end gap-2 mt-6'>
            <Button
              type='button'
              variant='outline'
              onClick={() => {
                reset();
                setOpen(false);
              }}
            >
              Cancelar
            </Button>
            <Button type='submit'>
              Criar Conta
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
