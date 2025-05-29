export type TransactionType = 'transfer' | 'deposit' | 'withdraw';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: string;
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(dateString));
};

export const getMonthYear = (dateString: string) => {
  const date = new Date(dateString);
  const month = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(date);
  const year = date.getFullYear();
  return `${month} ${year}`;
};

export const translateTransactionType = (type: TransactionType) => {
  const types: Record<TransactionType, string> = {
    transfer: 'Transferência',
    deposit: 'Depósito',
    withdraw: 'Retirada',
  };
  return types[type];
};

export const getTransactionAmount = (transaction: Transaction) => {
  if (transaction.type === 'withdraw' || transaction.type === 'transfer') {
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