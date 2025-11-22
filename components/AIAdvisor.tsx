import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, Bot, ChevronRight, X } from 'lucide-react';
import { Transaction, ContextType } from '../types';
import { getFinancialAdvice } from '../services/geminiService';

interface AIAdvisorProps {
  transactions: Transaction[];
  context: ContextType;
}

export const AIAdvisor: React.FC<AIAdvisorProps> = ({ transactions, context }) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Reset advice when context changes to allow new generation
  useEffect(() => {
    if (!isOpen) {
        setAdvice(null);
    }
  }, [context]);

  const handleGetAdvice = async () => {
    setIsLoading(true);
    setIsOpen(true);
    const result = await getFinancialAdvice(transactions, context);
    setAdvice(result);
    setIsLoading(false);
  };

  return (
    <div className="mb-8">
      {!isOpen ? (
        <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <button
            onClick={handleGetAdvice}
            className="relative w-full bg-white/90 backdrop-blur-xl border border-white p-1 rounded-3xl shadow-xl flex items-center p-4 transition-all hover:scale-[1.01]"
            >
            <div className="flex-shrink-0 p-3 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl text-white shadow-lg">
                <Sparkles size={24} className="animate-pulse" />
            </div>
            <div className="ml-4 text-left flex-1">
                <h3 className="font-bold text-lg text-slate-800">Consultor Tok AI <span className="text-xs font-normal opacity-70 uppercase ml-1">({context})</span></h3>
                <p className="text-slate-500 text-sm">Toque para gerar uma análise financeira inteligente.</p>
            </div>
            <div className="bg-slate-50 p-2 rounded-full text-slate-400 group-hover:text-violet-600 group-hover:bg-violet-50 transition-colors">
                <ChevronRight size={20} />
            </div>
            </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-2xl shadow-violet-500/10 border border-violet-100 overflow-hidden animate-fade-in-up">
          <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-6 flex justify-between items-start text-white relative overflow-hidden">
             {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black opacity-10 rounded-full -ml-10 -mb-10 blur-xl"></div>
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                 <Bot size={24} />
              </div>
              <div>
                  <h3 className="font-bold text-lg">Análise Inteligente {context.toUpperCase()}</h3>
                  <p className="text-violet-100 text-xs opacity-90">Powered by Gemini</p>
              </div>
            </div>
            <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all relative z-10"
            >
                <X size={18} />
            </button>
          </div>
          
          <div className="p-8 min-h-[200px] bg-gradient-to-b from-white to-slate-50">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-violet-500 rounded-full blur-lg opacity-20 animate-pulse"></div>
                    <Loader2 size={40} className="text-violet-600 animate-spin relative z-10" />
                </div>
                <p className="text-sm font-medium text-slate-500 animate-pulse">Processando seus dados...</p>
              </div>
            ) : (
              <div className="prose prose-violet prose-sm max-w-none">
                 <div className="flex gap-4 items-start">
                    <div className="flex-1 text-slate-600 leading-relaxed space-y-4">
                         {advice?.split('\n').map((line, i) => {
                             if (!line.trim()) return null;
                             const isBold = line.includes('**');
                             const cleanLine = line.replace(/\*\*/g, '').replace(/^- /, '');
                             
                             if (line.startsWith('-')) {
                                return (
                                    <div key={i} className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="m-0">{cleanLine}</p>
                                    </div>
                                )
                             }
                             return (
                                 <p key={i} className={`m-0 ${isBold ? 'font-bold text-slate-800 text-base' : ''}`}>
                                     {cleanLine}
                                 </p>
                             );
                         })}
                    </div>
                 </div>
              </div>
            )}
          </div>
          
          {!isLoading && (
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-center">
                  <button 
                    onClick={handleGetAdvice}
                    className="text-violet-600 hover:text-violet-700 text-sm font-semibold hover:underline flex items-center gap-2"
                  >
                      <Sparkles size={14} />
                      Atualizar Análise
                  </button>
              </div>
          )}
        </div>
      )}
    </div>
  );
};