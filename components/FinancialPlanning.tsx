import React, { useState } from 'react';
import { Goal } from '../types';
import { Target, Plus, Trash2, Calendar, DollarSign, Trophy, TrendingUp, Rocket, Car, Home, Plane } from 'lucide-react';

interface FinancialPlanningProps {
  goals: Goal[];
  onAddGoal: (goal: Omit<Goal, 'id'>) => void;
  onUpdateGoal: (id: string, amount: number) => void;
  onDeleteGoal: (id: string) => void;
  theme: 'light' | 'dark';
}

const ICONS = [
  { id: 'trophy', icon: <Trophy size={20} />, label: 'Conquista' },
  { id: 'rocket', icon: <Rocket size={20} />, label: 'Crescimento' },
  { id: 'car', icon: <Car size={20} />, label: 'Veículo' },
  { id: 'home', icon: <Home size={20} />, label: 'Imóvel' },
  { id: 'plane', icon: <Plane size={20} />, label: 'Viagem' },
  { id: 'target', icon: <Target size={20} />, label: 'Objetivo' },
];

const COLORS = [
  'from-violet-500 to-purple-600',
  'from-emerald-400 to-teal-500',
  'from-blue-500 to-indigo-600',
  'from-rose-500 to-pink-600',
  'from-amber-400 to-orange-500',
];

export const FinancialPlanning: React.FC<FinancialPlanningProps> = ({ goals, onAddGoal, onUpdateGoal, onDeleteGoal, theme }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  
  // Form States
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('trophy');
  const [depositAmount, setDepositAmount] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !targetAmount || !deadline) return;

    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];

    onAddGoal({
      title,
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount) || 0,
      deadline,
      icon: selectedIcon,
      color: randomColor
    });

    resetForm();
    setIsModalOpen(false);
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGoalId || !depositAmount) return;

    onUpdateGoal(selectedGoalId, parseFloat(depositAmount));
    setDepositAmount('');
    setSelectedGoalId(null);
    setIsDepositModalOpen(false);
  };

  const resetForm = () => {
    setTitle('');
    setTargetAmount('');
    setCurrentAmount('');
    setDeadline('');
    setSelectedIcon('trophy');
  };

  const getIconComponent = (iconId: string) => {
    return ICONS.find(i => i.id === iconId)?.icon || <Target size={20} />;
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  return (
    <div className="animate-fade-in-up space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Metas & Objetivos</h2>
          <p className="text-slate-500 dark:text-slate-400">Planeje suas conquistas e acompanhe o progresso.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
        >
          <Plus size={20} />
          Nova Meta
        </button>
      </div>

      {/* Goals Grid */}
      {goals.length === 0 ? (
        <div className="text-center py-20 bg-white/50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
           <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300 dark:text-slate-600">
              <Target size={32} />
           </div>
           <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">Nenhuma meta definida</h3>
           <p className="text-slate-400 dark:text-slate-500 max-w-md mx-auto mt-2">Defina objetivos financeiros para visualizar seu progresso e alcançar seus sonhos mais rápido.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => {
            const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
            const remaining = goal.targetAmount - goal.currentAmount;
            
            return (
              <div key={goal.id} className="group relative bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-lg shadow-slate-200/50 dark:shadow-black/20 border border-white dark:border-slate-800 hover:-translate-y-1 transition-transform duration-300">
                
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${goal.color} flex items-center justify-center text-white shadow-md`}>
                    {getIconComponent(goal.icon)}
                  </div>
                  <button 
                    onClick={() => onDeleteGoal(goal.id)}
                    className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-full transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{goal.title}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                   <Calendar size={14} />
                   <span>Alvo: {new Date(goal.deadline).toLocaleDateString('pt-BR')}</span>
                </div>

                <div className="mb-2 flex justify-between items-end">
                  <span className="text-3xl font-bold text-slate-800 dark:text-white">
                    {progress}%
                  </span>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 font-bold uppercase">Guardado</p>
                    <p className="text-sm font-bold text-violet-600 dark:text-violet-400">R$ {goal.currentAmount.toLocaleString('pt-BR')}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-2">
                  <div 
                    className={`h-full bg-gradient-to-r ${goal.color} transition-all duration-1000 ease-out relative`}
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                
                <div className="flex justify-between text-xs font-medium text-slate-400">
                  <span>Faltam R$ {remaining > 0 ? remaining.toLocaleString('pt-BR') : '0'}</span>
                  <span>Meta: R$ {goal.targetAmount.toLocaleString('pt-BR')}</span>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-50 dark:border-slate-800">
                   <button 
                     onClick={() => { setSelectedGoalId(goal.id); setIsDepositModalOpen(true); }}
                     className="w-full py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                   >
                     <Plus size={16} />
                     Adicionar Economia
                   </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Goal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Nova Meta Financeira</h3>
            </div>
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
               <div>
                 <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Título da Meta</label>
                 <input 
                   type="text" 
                   required
                   value={title} 
                   onChange={(e) => setTitle(e.target.value)}
                   placeholder="Ex: Comprar Câmera Nova"
                   className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
                 />
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Valor Alvo (R$)</label>
                    <input 
                      type="number" 
                      required
                      step="0.01"
                      value={targetAmount} 
                      onChange={(e) => setTargetAmount(e.target.value)}
                      className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Já Guardado (R$)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      value={currentAmount} 
                      onChange={(e) => setCurrentAmount(e.target.value)}
                      placeholder="Opcional"
                      className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
                    />
                  </div>
               </div>

               <div>
                 <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Data Alvo</label>
                 <input 
                   type="date" 
                   required
                   value={deadline} 
                   onChange={(e) => setDeadline(e.target.value)}
                   className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-violet-500 dark:text-white dark:[color-scheme:dark]"
                 />
               </div>

               <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Ícone</label>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {ICONS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedIcon(item.id)}
                        className={`p-3 rounded-xl border-2 transition-all ${selectedIcon === item.id ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400' : 'border-slate-100 dark:border-slate-700 text-slate-400'}`}
                        title={item.label}
                      >
                        {item.icon}
                      </button>
                    ))}
                  </div>
               </div>

               <button type="submit" className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold mt-2">
                 Criar Meta
               </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Deposit Modal */}
      {isDepositModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsDepositModalOpen(false)}></div>
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Adicionar Economia</h3>
            </div>
            <form onSubmit={handleDepositSubmit} className="p-6 space-y-4">
               <div>
                 <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Valor a depositar (R$)</label>
                 <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
                    <input 
                      type="number" 
                      required
                      autoFocus
                      step="0.01"
                      value={depositAmount} 
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-violet-500 dark:text-white font-bold text-lg"
                    />
                 </div>
               </div>
               <button type="submit" className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold">
                 Confirmar Depósito
               </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};