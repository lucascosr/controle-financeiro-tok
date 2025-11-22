export type TransactionType = 'income' | 'expense';
export type ContextType = 'pf' | 'pj';

export interface User {
  name: string;
  email: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  context: ContextType;
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  icon: string;
  color: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface MonthlyDataPoint {
  name: string;
  income: number;
  expense: number;
}