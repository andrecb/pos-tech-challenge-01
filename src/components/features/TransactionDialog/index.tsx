import React, { useState, useEffect } from 'react';
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
import { Transaction } from '@/shared/utils/transactions';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { DatePicker } from '@/components/ui/datePicker';

interface TransactionDialogProps {
  open: boolean;
  transaction?: Transaction | null;
  onSave: (transaction: Transaction) => void;
  onCancel: () => void;
}

export default function TransactionDialog({
  open,
  transaction,
  onSave,
  onCancel,
}: TransactionDialogProps) {
  const isEdit = !!transaction;
  const [edit, setEdit] = useState<Transaction>(
    transaction || { id: '', type: 'deposit', amount: 0, date: '' }
  );

  useEffect(() => {
    setEdit(transaction || { id: '', type: 'deposit', amount: 0, date: '' });
  }, [transaction]);

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEdit({ ...edit, [name]: name === 'amount' ? Number(value) : value });
  };

  const handleSave = () => {
    if (!edit.id) {
      // Gera um id simples para nova transação
      edit.id = Math.random().toString(36).substring(2, 9);
    }
    onSave(edit);
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
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className='flex flex-col gap-2'>
            <Label htmlFor='type' className='text-zinc-100'>Tipo</Label>
            <Select
              value={edit.type}
              onValueChange={(value) =>
                setEdit({ ...edit, type: value as Transaction['type'] })
              }
              name='type'
            >
              <SelectTrigger className='w-full bg-zinc-800 border-zinc-700 text-zinc-100'>
                <SelectValue placeholder='Selecione o tipo' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='transfer'>Transferência</SelectItem>
                <SelectItem value='deposit'>Depósito</SelectItem>
                <SelectItem value='withdraw'>Retirada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='amount' className='text-zinc-100'>Valor</Label>
            <Input
              id='amount'
              name='amount'
              type='number'
              value={edit.amount}
              onChange={handleEditChange}
              min={0}
              className='bg-zinc-800 border-zinc-700 text-zinc-100'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='date' className='text-zinc-100'>Data</Label>
            <DatePicker date={edit.date} setDate={handleEditChange} className='bg-zinc-800 border-zinc-700 text-zinc-100 w-full' />
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
