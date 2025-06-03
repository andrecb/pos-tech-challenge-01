import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Transaction, TransactionType } from '@/shared/utils/transactions';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { DatePicker } from '@/components/ui/datePicker';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller } from 'react-hook-form';
import { MaskedInput } from '@/components/ui/masked-input';

const transactionSchema = z.object({
  description: z.string().min(1, 'Descrição é obrigatória'),
  type: z.enum(['income', 'expense', 'transfer'] as const),
  amount: z.number().min(0.01, 'Valor deve ser maior que zero'),
  date: z.date(),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface TransactionDialogProps {
  open: boolean;
  transaction?: Transaction | null;
  onSave: (transaction: Omit<Transaction, 'id'>) => void;
  onCancel: () => void;
}

export default function TransactionDialog({
  open,
  transaction,
  onSave,
  onCancel,
}: TransactionDialogProps) {
  const isEdit = !!transaction;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    control,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: transaction
      ? {
          ...transaction,
          date: new Date(transaction.date),
        }
      : {
          type: 'income',
          amount: 0,
          date: new Date(),
          description: '',
        },
  });

  React.useEffect(() => {
    if (transaction) {
      reset({
        ...transaction,
        date: new Date(transaction.date),
      });
    } else if (!open) {
      reset({
        type: 'income',
        amount: 0,
        date: new Date(),
        description: '',
      });
    }
  }, [transaction, open, reset]);

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setValue('date', new Date(date));
    }
  };

  const onSubmit = (data: TransactionFormData) => {
    onSave(data);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) onCancel();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Editar Transação' : 'Nova Transação'}
          </DialogTitle>
        </DialogHeader>
        <form
          className='flex flex-col gap-4'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='flex flex-col gap-2'>
            <Label htmlFor='description' className='text-zinc-100'>Descrição</Label>
            <Input
              id='description'
              className='bg-zinc-800 border-zinc-700 text-zinc-100'
              {...register('description')}
            />
            {errors.description && (
              <span className='text-sm text-red-500'>{errors.description.message}</span>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='type' className='text-zinc-100'>Tipo</Label>
            <Select
              value={watch('type')}
              onValueChange={(value) => setValue('type', value as TransactionType)}
            >
              <SelectTrigger className='w-full bg-zinc-800 border-zinc-700 text-zinc-100'>
                <SelectValue placeholder='Selecione o tipo' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='income'>Entrada</SelectItem>
                <SelectItem value='expense'>Despesa</SelectItem>
                <SelectItem value='transfer'>Transferência</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <span className='text-sm text-red-500'>{errors.type.message}</span>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='amount' className='text-zinc-100'>Valor</Label>
            <Controller
              name="amount"
              control={control}
              render={({ field: { onChange, value } }) => (
                <MaskedInput
                  value={value}
                  onValueChange={(values) => {
                    onChange(values.floatValue ?? 0);
                  }}
                  mask="currency"
                  placeholder="R$ 0,00"
                />
              )}
            />
            {errors.amount && (
              <span className='text-sm text-red-500'>{errors.amount.message}</span>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='date' className='text-zinc-100'>Data</Label>
            <DatePicker 
              date={watch('date')} 
              setDate={handleDateChange} 
              className='bg-zinc-800 border-zinc-700 text-zinc-100 w-full' 
            />
            {errors.date && (
              <span className='text-sm text-red-500'>{errors.date.message}</span>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline' type='button' onClick={onCancel}>
                Cancelar
              </Button>
            </DialogClose>
            <Button type='submit'>Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
