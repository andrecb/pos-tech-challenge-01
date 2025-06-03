'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction } from '@/shared/utils/transactions';
import { TransactionService } from '@/shared/services/TransactionService';
import { BalanceService } from '@/shared/services/BalanceService';

interface TransactionContextData {
  transactions: Transaction[];
  balance: number;
  isLoading: boolean;
  refreshTransactions: () => Promise<void>;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  updateTransaction: (transaction: Transaction) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData);

interface TransactionProviderProps {
  children: ReactNode;
}

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const transactionService = TransactionService.getInstance();
  const balanceService = BalanceService.getInstance();

  const refreshTransactions = async () => {
    try {
      const [transactionsData, currentBalance] = await Promise.all([
        transactionService.getTransactions(),
        balanceService.getBalance()
      ]);
      setTransactions(transactionsData);
      setBalance(currentBalance);
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
    }
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    try {
      await transactionService.createTransaction(transaction);
      await refreshTransactions();
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
      throw error;
    }
  };

  const updateTransaction = async (transaction: Transaction) => {
    try {
      await transactionService.updateTransaction(transaction);
      await refreshTransactions();
    } catch (error) {
      console.error('Erro ao atualizar transação:', error);
      throw error;
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await transactionService.deleteTransaction(id);
      await refreshTransactions();
    } catch (error) {
      console.error('Erro ao excluir transação:', error);
      throw error;
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await refreshTransactions();
      } catch (error) {
        console.error('Erro ao carregar dados iniciais:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        balance,
        isLoading,
        refreshTransactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error('useTransactions deve ser usado dentro de um TransactionProvider');
  }

  return context;
} 