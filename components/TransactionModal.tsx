import React, { useState, useEffect } from 'react';
import { X, Check, DollarSign, Tag, Calendar, Type } from 'lucide-react';
import { TransactionType, ContextType } from '../types';
import { CATEGORIES } from '../constants';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: { description: string; amount: number; type: TransactionType; category: string; date: string }) => void;
  context: ContextType;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, onSave, context }) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
        setCategory('');
    }
  }, [isOpen, type, context]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description || !category || !date) return;

    onSave({
      description,
      amount: parseFloat(amount),
      type,
      category,
      date
    });
    
    // Reset form
    setAmount('');
    setDescription('');
    setCategory('');
    setDate(new Date().toISOString().split('T')[0]);
    onClose();
  };

  // Get categories based on current context and selected type
  const currentCategories = CATEGORIES[context][type];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden transform transition-all animate-fade-in-up flex flex-col max-h-[90vh]">
        
        <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 sticky top-0 z-10">
          <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                Nova Transação <span className="text-violet-600 text-sm align-middle bg-violet-50 dark:bg-violet-900/30 px-2 py-1 rounded-lg ml-2 uppercase">{context}</span>
              </h2>
              <p className="text-slate-400 text-sm">Preencha os detalhes abaixo</p>
          </div>
          <button onClick={onClose} className="bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded-full transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto p-8 custom-scrollbar">
            <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Type Toggle */}
            <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl flex relative">
                <div 
                    className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-slate-700 rounded-xl shadow-sm transition-all duration-300 ease-spring ${type === 'income' ? 'left-1' : 'left-[calc(50%+4px)]'}`}
                ></div>
                <button
                type="button"
                className={`flex-1 py-3 rounded-xl text-sm font-bold relative z-10 transition-colors ${
                    type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                onClick={() => { setType('income'); }}
                >
                Entrada
                </button>
                <button
                type="button"
                className={`flex-1 py-3 rounded-xl text-sm font-bold relative z-10 transition-colors ${
                    type === 'expense' ? 'text-rose-500 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                onClick={() => { setType('expense'); }}
                >
                Saída
                </button>
            </div>

            {/* Amount */}
            <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Valor</label>
                <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 dark:group-focus-within:text-violet-400 transition-colors">
                    <DollarSign size={20} />
                </div>
                <input
                    type="number"
                    step="0.01"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-violet-100 dark:focus:border-violet-900 focus:ring-4 focus:ring-violet-100/50 dark:focus:ring-violet-900/30 outline-none transition-all text-xl font-semibold text-slate-800 dark:text-white placeholder-slate-300 dark:placeholder-slate-600"
                    placeholder="0.00"
                />
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Descrição</label>
                <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 dark:group-focus-within:text-violet-400 transition-colors">
                    <Type size={20} />
                </div>
                <input
                    type="text"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-violet-100 dark:focus:border-violet-900 focus:ring-4 focus:ring-violet-100/50 dark:focus:ring-violet-900/30 outline-none transition-all font-medium text-slate-800 dark:text-white placeholder-slate-300 dark:placeholder-slate-600"
                    placeholder={context === 'pj' ? "Ex: Nota Fiscal 123" : "Ex: Compras do mês"}
                />
                </div>
            </div>

            {/* Category & Date Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Categoria</label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 dark:group-focus-within:text-violet-400 transition-colors">
                            <Tag size={20} />
                        </div>
                        <select
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-violet-100 dark:focus:border-violet-900 focus:ring-4 focus:ring-violet-100/50 dark:focus:ring-violet-900/30 outline-none transition-all font-medium text-slate-800 dark:text-white appearance-none cursor-pointer"
                        >
                        <option value="" disabled>Selecionar</option>
                        {currentCategories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Data</label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 dark:group-focus-within:text-violet-400 transition-colors">
                            <Calendar size={20} />
                        </div>
                        <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-violet-100 dark:focus:border-violet-900 focus:ring-4 focus:ring-violet-100/50 dark:focus:ring-violet-900/30 outline-none transition-all font-medium text-slate-800 dark:text-white dark:[color-scheme:dark]"
                        />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className={`w-full py-4 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl mt-4
                ${type === 'income' 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/30' 
                    : 'bg-gradient-to-r from-rose-500 to-pink-500 shadow-rose-500/30'}`}
            >
                <Check size={24} />
                Confirmar {type === 'income' ? 'Entrada' : 'Saída'}
            </button>
            </form>
        </div>
      </div>
    </div>
  );
};