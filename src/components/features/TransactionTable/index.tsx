import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import {
  Transaction,
  formatCurrency,
  formatDate as formatDateTransaction,
  getTransactionAmount,
  translateTransactionType,
} from '@/shared/utils/transactions';
import TransactionDialog from '../TransactionDialog';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog';
import { Button } from '@/components/ui/button';
import { PlusIcon, TrashIcon, PencilIcon } from 'lucide-react';

interface TransactionTableProps {
  transactions: Transaction[];
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
  const [selected, setSelected] = useState<Transaction | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [data, setData] = useState(transactions);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);

  const handleRowClick = (transaction: Transaction) => {
    setSelected(transaction);
    setIsCreating(false);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setSelected(null);
    setIsCreating(true);
    setDialogOpen(true);
  };

  const handleSave = (tx: Transaction) => {
    if (isCreating) {
      setData([...data, tx]);
    } else {
      setData(data.map(t => t.id === tx.id ? tx : t));
    }
    setDialogOpen(false);
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const handleDeleteClick = (id: string) => {
    setTransactionToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (transactionToDelete) {
      setData(data.filter(t => t.id !== transactionToDelete));
      setDeleteDialogOpen(false);
      setTransactionToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setTransactionToDelete(null);
  };

  return (
    <div className='mt-4'>
      <Button
        className='mb-4'
        onClick={handleCreate}
      >
        <PlusIcon className='w-4 h-4' />
        Nova Transação
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((transaction) => (
            <TableRow
              key={transaction.id}
              className='cursor-pointer hover:bg-zinc-700 transition-colors duration-200'
            >
              <TableCell>{transaction.id}</TableCell>
              <TableCell>{formatDateTransaction(transaction.date)}</TableCell>
              <TableCell>{translateTransactionType(transaction.type)}</TableCell>
              <TableCell
                className={
                  getTransactionAmount(transaction) >= 0
                    ? 'text-green-400'
                    : 'text-red-400'
                }
              >
                {formatCurrency(getTransactionAmount(transaction))}
              </TableCell>
              <TableCell className="text-right">
                <Button variant='ghost' size='icon' onClick={() => handleRowClick(transaction)}>
                  <PencilIcon className='w-4 h-4' />
                </Button>
                <Button variant='ghost' size='icon' onClick={() => handleDeleteClick(transaction.id)}>
                  <TrashIcon className='w-4 h-4' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TransactionDialog
        open={dialogOpen}
        transaction={isCreating ? null : selected}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        title="Confirmar Exclusão"
        description="Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita."
      />
    </div>
  );
} 