import { Transaction } from '@/shared/utils/transactions';

export class TransactionService {
  private static instance: TransactionService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = '/api/transactions';
  }

  public static getInstance(): TransactionService {
    if (!TransactionService.instance) {
      TransactionService.instance = new TransactionService();
    }
    return TransactionService.instance;
  }

  public async getTransactions(): Promise<Transaction[]> {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) {
        throw new Error('Erro ao buscar transações');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
      throw error;
    }
  }

  public async createTransaction(transaction: Omit<Transaction, 'id' | 'date'>): Promise<Transaction> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar transação');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao criar transação:', error);
      throw error;
    }
  }

  public async updateTransaction(transaction: Transaction): Promise<Transaction> {
    try {
      const response = await fetch(`${this.baseUrl}/${transaction.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar transação');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar transação:', error);
      throw error;
    }
  }

  public async deleteTransaction(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir transação');
      }
    } catch (error) {
      console.error('Erro ao excluir transação:', error);
      throw error;
    }
  }
} 