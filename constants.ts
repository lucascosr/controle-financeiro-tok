import { Transaction } from './types';

export const CATEGORIES = {
  pf: {
    income: ['Salário', 'Freelance', 'Investimentos', 'Vendas', 'Presentes', 'Outros'],
    expense: ['Moradia', 'Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Educação', 'Compras', 'Assinaturas', 'Outros']
  },
  pj: {
    income: ['Venda de Serviços', 'Venda de Produtos', 'Investimentos', 'Empréstimos', 'Outros'],
    expense: ['Fornecedores', 'Pessoal/Folha', 'Impostos', 'Aluguel Comercial', 'Marketing', 'Software/SaaS', 'Manutenção', 'Despesas Administrativas', 'Outros']
  }
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  // PF Data
  {
    id: '1',
    description: 'Salário Mensal',
    amount: 5000,
    type: 'income',
    category: 'Salário',
    date: '2023-10-01',
    context: 'pf'
  },
  {
    id: '2',
    description: 'Aluguel Apartamento',
    amount: 1500,
    type: 'expense',
    category: 'Moradia',
    date: '2023-10-05',
    context: 'pf'
  },
  {
    id: '3',
    description: 'Supermercado',
    amount: 650.50,
    type: 'expense',
    category: 'Alimentação',
    date: '2023-10-08',
    context: 'pf'
  },
  // PJ Data
  {
    id: '4',
    description: 'Projeto Consultoria Tech',
    amount: 8500,
    type: 'income',
    category: 'Venda de Serviços',
    date: '2023-10-15',
    context: 'pj'
  },
  {
    id: '5',
    description: 'Licença Adobe/Figma',
    amount: 250.00,
    type: 'expense',
    category: 'Software/SaaS',
    date: '2023-10-18',
    context: 'pj'
  },
  {
    id: '6',
    description: 'DAS - Simples Nacional',
    amount: 510.00,
    type: 'expense',
    category: 'Impostos',
    date: '2023-10-20',
    context: 'pj'
  }
];