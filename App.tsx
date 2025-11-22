import React, { useState, useMemo, useEffect } from 'react';
import { 
  Plus, 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Home, 
  ShoppingCart, 
  Car, 
  Coffee, 
  Heart, 
  GraduationCap, 
  ShoppingBag, 
  Briefcase, 
  DollarSign, 
  Smartphone,
  MoreHorizontal,
  Building2,
  User as UserIcon,
  PieChart,
  FileText,
  Wrench,
  LogOut
} from 'lucide-react';
import { Transaction, ContextType, User } from './types';
import { INITIAL_TRANSACTIONS } from './constants';
import { DashboardCharts } from './components/DashboardCharts';
import { TransactionModal } from './components/TransactionModal';
import { AIAdvisor } from './components/AIAdvisor';
import { LoginScreen } from './components/LoginScreen';

// Icon Mapping
const getCategoryIcon = (category: string) => {
  const map: Record<string, React.ReactNode> = {
    // PF
    'Moradia': <Home size={18} />,
    'Alimentação': <ShoppingCart size={18} />,
    'Transporte': <Car size={18} />,
    'Lazer': <Coffee size={18} />,
    'Saúde': <Heart size={18} />,
    'Educação': <GraduationCap size={18} />,
    'Compras': <ShoppingBag size={18} />,
    'Salário': <Briefcase size={18} />,
    'Freelance': <Smartphone size={18} />,
    'Investimentos': <TrendingUp size={18} />,
    'Vendas': <DollarSign size={18} />,
    'Presentes': <Heart size={18} />,
    'Assinaturas': <Smartphone size={18} />,
    
    // PJ
    'Venda de Serviços': <Briefcase size={18} />,
    'Venda de Produtos': <ShoppingBag size={18} />,
    'Empréstimos': <Wallet size={18} />,
    'Fornecedores': <Building2 size={18} />,
    'Pessoal/Folha': <UserIcon size={18} />,
    'Impostos': <FileText size={18} />,
    'Aluguel Comercial': <Home size={18} />,
    'Marketing': <TrendingUp size={18} />,
    'Software/SaaS': <PieChart size={18} />,
    'Manutenção': <Wrench size={18} />,
    'Despesas Administrativas': <FileText size={18} />
  };
  return map[category] || <MoreHorizontal size={18} />;
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentContext, setCurrentContext] = useState<ContextType>('pf');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [greeting, setGreeting] = useState('');

  // Check for logged in user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('controletok_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Load data when user changes
  useEffect(() => {
    if (user) {
      const userKey = `controletok_transactions_${user.email}`;
      const savedData = localStorage.getItem(userKey);
      
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setTransactions(parsed.map((t: any) => ({...t, context: t.context || 'pf'})));
      } else {
        // Load initial data only for first time users (demo purpose)
        setTransactions(INITIAL_TRANSACTIONS);
      }
    } else {
      setTransactions([]);
    }
  }, [user]);

  // Save data when transactions change
  useEffect(() => {
    if (user) {
      const userKey = `controletok_transactions_${user.email}`;
      localStorage.setItem(userKey, JSON.stringify(transactions));
    }
  }, [transactions, user]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bom dia');
    else if (hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem('controletok_user', JSON.stringify(loggedInUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('controletok_user');
  };

  // Filter transactions based on selected Context (PF/PJ)
  const contextTransactions = useMemo(() => {
    return transactions.filter(t => t.context === currentContext);
  }, [transactions, currentContext]);

  const summary = useMemo(() => {
    const income = contextTransactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
    const expense = contextTransactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [contextTransactions]);

  const filteredTransactions = contextTransactions
    .filter(t => t.description.toLowerCase().includes(filter.toLowerCase()) || t.category.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const addTransaction = (data: Omit<Transaction, 'id' | 'context'>) => {
    const newTransaction: Transaction = {
      ...data,
      id: crypto.randomUUID(),
      context: currentContext // Auto-assign current context
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta transação?')) {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    }
  };

  // Render Login Screen if not authenticated
  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-24 md:pb-10 relative overflow-x-hidden">
      
      {/* Background Decorative Elements */}
      <div className={`fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b -z-10 pointer-events-none transition-colors duration-700
        ${currentContext === 'pf' ? 'from-violet-100/50' : 'from-blue-100/50'} to-transparent`}></div>
      
      <div className={`fixed -top-20 -right-20 w-96 h-96 rounded-full blur-3xl -z-10 pointer-events-none transition-colors duration-700
        ${currentContext === 'pf' ? 'bg-fuchsia-200/30' : 'bg-cyan-200/30'}`}></div>
      
      <div className={`fixed top-40 -left-20 w-72 h-72 rounded-full blur-3xl -z-10 pointer-events-none transition-colors duration-700
        ${currentContext === 'pf' ? 'bg-blue-200/30' : 'bg-indigo-200/30'}`}></div>

      {/* Header */}
      <header className="pt-8 pb-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                    <p className="text-slate-500 font-medium text-sm">{greeting}, <span className="font-bold text-slate-700 capitalize">{user.name}</span>!</p>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                    Controle <span className={currentContext === 'pf' ? "text-violet-600" : "text-blue-600"}>Tok</span>
                </h1>
              </div>
              
              {/* Context Switcher */}
              <div className="bg-white p-1 rounded-2xl shadow-sm border border-slate-100 flex items-center self-start md:self-end">
                  <button 
                    onClick={() => { setCurrentContext('pf'); setFilter(''); }}
                    className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${currentContext === 'pf' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    <UserIcon size={16} />
                    Pessoal
                  </button>
                  <button 
                    onClick={() => { setCurrentContext('pj'); setFilter(''); }}
                    className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${currentContext === 'pj' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    <Building2 size={16} />
                    Empresa
                  </button>
              </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
                onClick={() => setIsModalOpen(true)}
                className={`group hidden md:flex items-center gap-3 text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition-all shadow-xl active:scale-95
                ${currentContext === 'pf' ? 'bg-slate-900 shadow-slate-900/20 hover:bg-slate-800' : 'bg-blue-600 shadow-blue-600/30 hover:bg-blue-700'}`}
            >
                <div className="bg-white/20 p-1 rounded-lg group-hover:rotate-90 transition-transform">
                <Plus size={18} />
                </div>
                Nova Transação
            </button>

            <button 
                onClick={handleLogout}
                title="Sair"
                className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all shadow-sm"
            >
                <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 space-y-8">
        
        {/* Summary Cards - Modern Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Total Balance */}
          <div className={`p-6 rounded-[2rem] shadow-xl text-white relative overflow-hidden group transition-transform hover:scale-[1.02]
            ${currentContext === 'pf' ? 'bg-gradient-to-br from-slate-900 to-slate-800 shadow-slate-900/20' : 'bg-gradient-to-br from-blue-900 to-slate-900 shadow-blue-900/20'}`}>
             <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
             <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                    <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                        <Wallet className={currentContext === 'pf' ? "text-violet-300" : "text-blue-300"} size={24} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-white/70 bg-black/30 px-3 py-1 rounded-full border border-white/5">Saldo {currentContext.toUpperCase()}</span>
                </div>
                <div className="mt-6">
                    <h2 className="text-4xl font-bold tracking-tight">
                    R$ {summary.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </h2>
                    <p className="text-slate-400 text-sm mt-1 font-medium">
                        {summary.balance >= 0 ? 'Disponível em conta' : 'Atenção: Saldo Negativo'}
                    </p>
                </div>
             </div>
          </div>

          {/* Income */}
          <div className="bg-white p-6 rounded-[2rem] shadow-lg shadow-slate-200/50 border border-white relative overflow-hidden group hover:border-emerald-100 transition-all">
             <div className="absolute right-0 top-0 p-32 bg-emerald-50/50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-100/50 transition-colors"></div>
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl">
                        <TrendingUp size={20} />
                    </div>
                    <span className="font-bold text-slate-600">Receitas</span>
                </div>
                <h2 className="text-3xl font-bold text-emerald-600">
                R$ {summary.income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </h2>
                <p className="text-slate-400 text-sm mt-2">Total de entradas</p>
             </div>
          </div>

          {/* Expense */}
          <div className="bg-white p-6 rounded-[2rem] shadow-lg shadow-slate-200/50 border border-white relative overflow-hidden group hover:border-rose-100 transition-all">
             <div className="absolute right-0 top-0 p-32 bg-rose-50/50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-rose-100/50 transition-colors"></div>
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-rose-100 text-rose-500 rounded-xl">
                        <TrendingDown size={20} />
                    </div>
                    <span className="font-bold text-slate-600">Despesas</span>
                </div>
                <h2 className="text-3xl font-bold text-rose-500">
                R$ {summary.expense.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </h2>
                <p className="text-slate-400 text-sm mt-2">Total de saídas</p>
             </div>
          </div>
        </div>

        {/* AI Section */}
        <AIAdvisor transactions={contextTransactions} context={currentContext} />

        {/* Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Charts takes up 2 columns on large screens */}
            <div className="xl:col-span-2 space-y-8">
                <DashboardCharts transactions={contextTransactions} />
            </div>

            {/* Recent Transactions List */}
            <div className="xl:col-span-1">
                <div className="bg-white rounded-[2rem] shadow-lg shadow-slate-200/50 border border-white overflow-hidden h-full">
                    <div className="p-6 border-b border-slate-50 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
                        <h3 className="text-lg font-bold text-slate-800">Histórico</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input 
                                type="text" 
                                placeholder="Filtrar..." 
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-32 focus:w-48 transition-all pl-9 pr-4 py-2 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-violet-100 text-sm font-medium outline-none"
                            />
                        </div>
                    </div>

                    <div className="overflow-y-auto max-h-[600px] custom-scrollbar p-4 space-y-2">
                        {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((t) => (
                            <div key={t.id} className="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg shadow-sm
                                        ${t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-50 text-rose-500'}`}>
                                        {getCategoryIcon(t.category)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 text-sm md:text-base">{t.description}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs font-medium text-slate-400 bg-white px-2 py-0.5 rounded-md border border-slate-100">{t.category}</span>
                                            <span className="text-xs text-slate-400">{new Date(t.date).toLocaleDateString('pt-BR', {day: '2-digit', month: 'short'})}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-bold text-sm md:text-base ${t.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                                        {t.type === 'expense' ? '-' : '+'} R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </p>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); deleteTransaction(t.id); }}
                                        className="text-slate-300 hover:text-rose-500 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        ))
                        ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300">
                                <Search size={24} />
                            </div>
                            <p className="text-slate-500 text-sm">Nenhuma transação encontrada para <span className="font-bold uppercase">{currentContext}</span>.</p>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </main>

      {/* Mobile Floating Action Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className={`md:hidden fixed bottom-6 right-6 w-14 h-14 text-white rounded-full flex items-center justify-center shadow-xl z-40 hover:scale-110 transition-transform active:scale-90
            ${currentContext === 'pf' ? 'bg-slate-900 shadow-slate-900/30' : 'bg-blue-600 shadow-blue-600/30'}`}
      >
        <Plus size={24} />
      </button>

      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={addTransaction} 
        context={currentContext}
      />
    </div>
  );
}

export default App;