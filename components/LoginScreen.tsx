import React, { useState } from 'react';
import { User } from '../types';
import { ArrowRight, Lock, Mail, User as UserIcon, Sparkles, ArrowLeft, Sun, Moon } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (user: User) => void;
  onBack: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onBack, theme, toggleTheme }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (isRegistering && !name)) return;

    setIsLoading(true);

    // Simulating API call
    setTimeout(() => {
      const userData: User = {
        email: email.toLowerCase(),
        name: isRegistering ? name : email.split('@')[0], // Fallback name from email if login
      };
      onLogin(userData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-sans transition-colors duration-300">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-200/40 dark:bg-violet-900/20 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-200/40 dark:bg-fuchsia-900/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Theme Toggle Corner */}
      <div className="absolute top-6 right-6 z-20">
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors shadow-sm"
        >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        <button 
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors font-medium text-sm group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Voltar para o início
        </button>

        <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-violet-600/30">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Controle <span className="text-violet-600">Tok</span>
              </h1>
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              {isRegistering ? 'Crie sua conta e assuma o controle.' : 'Bem-vindo de volta.'}
            </p>
        </div>

        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white dark:border-slate-800 p-8 rounded-[2rem] shadow-2xl shadow-slate-200/50 dark:shadow-black/30">
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegistering && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Nome</label>
                <div className="relative group">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 dark:group-focus-within:text-violet-400 transition-colors" size={20} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-800 focus:border-violet-200 dark:focus:border-violet-800 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/30 outline-none transition-all font-medium text-slate-700 dark:text-slate-200"
                    placeholder="Seu nome"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 dark:group-focus-within:text-violet-400 transition-colors" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-800 focus:border-violet-200 dark:focus:border-violet-800 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/30 outline-none transition-all font-medium text-slate-700 dark:text-slate-200"
                  placeholder="exemplo@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Senha</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 dark:group-focus-within:text-violet-400 transition-colors" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-800 focus:border-violet-200 dark:focus:border-violet-800 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/30 outline-none transition-all font-medium text-slate-700 dark:text-slate-200"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold py-4 rounded-xl shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 dark:border-slate-900/30 border-t-white dark:border-t-slate-900 rounded-full animate-spin"></div>
              ) : (
                <>
                  {isRegistering ? 'Criar Conta' : 'Entrar'}
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm">
              {isRegistering ? 'Já tem uma conta?' : 'Ainda não tem conta?'}
              <button
                onClick={() => setIsRegistering(!isRegistering)}
                className="ml-2 text-violet-600 dark:text-violet-400 font-bold hover:underline focus:outline-none"
              >
                {isRegistering ? 'Fazer Login' : 'Cadastre-se'}
              </button>
            </p>
          </div>
        </div>
        
        <p className="text-center text-slate-400 text-xs mt-8 opacity-60">
          Simulação de ambiente seguro.
        </p>
      </div>
    </div>
  );
};