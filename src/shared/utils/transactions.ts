export type TransactionType = 'transfer' | 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: Date | string;
  description: string;
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatDate = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    return 'Data inválida';
  }
  
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(dateObj);
};

export const getMonthYear = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    return 'Data inválida';
  }
  const month = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(dateObj);
  const year = dateObj.getFullYear();
  return `${month} ${year}`;
};

export const translateTransactionType = (type: TransactionType) => {
  const types: Record<TransactionType, string> = {
    transfer: 'Transferência',
    income: 'Entrada',
    expense: 'Despesa',
  };
  return types[type];
};

export const getTransactionAmount = (transaction: Transaction) => {
  if (transaction.type === 'expense' || transaction.type === 'transfer') {
    return -transaction.amount;
  }
  return transaction.amount;
};

export const groupTransactionsByMonth = (transactions: Transaction[]) => {
  return transactions.reduce((acc, transaction) => {
    const monthYear = getMonthYear(transaction.date);
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(transaction);
    return acc;
  }, {} as Record<string, Transaction[]>);
}; 