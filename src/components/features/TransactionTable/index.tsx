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
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTransactions } from '@/shared/contexts/TransactionContext';

interface TransactionTableProps {
  transactions: Transaction[];
}

export default function TransactionTable({
  transactions: initialTransactions,
}: TransactionTableProps) {
  const [selected, setSelected] = useState<Transaction | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);
  const { addTransaction, updateTransaction, deleteTransaction } = useTransactions();

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

  const handleSave = async (tx: Omit<Transaction, 'id'>) => {
    try {
      if (isCreating) {
        await addTransaction(tx);
        setSelected(null);
      } else {
        await updateTransaction({ ...tx, id: selected?.id || '' });
      }
      setDialogOpen(false);
    } catch (error) {
      console.error('Erro ao salvar transação:', error);
    }
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const handleDeleteClick = (id: string) => {
    setTransactionToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (transactionToDelete) {
      try {
        await deleteTransaction(transactionToDelete);
        setDeleteDialogOpen(false);
        setTransactionToDelete(null);
      } catch (error) {
        console.error('Erro ao excluir transação:', error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setTransactionToDelete(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Histórico de Transações</h2>
        <Button onClick={handleCreate}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Nova Transação
        </Button>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialTransactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  className="cursor-pointer hover:bg-zinc-800"
                  onClick={() => handleRowClick(transaction)}
                >
                  <TableCell>{formatDateTransaction(new Date('2025-05-31T21:55:15.779Z'))}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{translateTransactionType(transaction.type)}</TableCell>
                  <TableCell className="text-right">
                    <span
                      className={
                        getTransactionAmount(transaction) >= 0
                          ? 'text-green-500'
                          : 'text-red-500'
                      }
                    >
                      {formatCurrency(getTransactionAmount(transaction))}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRowClick(transaction);
                              }}
                            >
                              <PencilIcon className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Editar transação</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(transaction.id);
                              }}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Excluir transação</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <TransactionDialog
        open={dialogOpen}
        transaction={selected}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}
