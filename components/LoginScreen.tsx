import React, { useState } from 'react';
import { User } from '../types';
import { ArrowRight, Lock, Mail, User as UserIcon, Sparkles } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
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
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-200/40 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-200/40 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                Controle <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">Tok</span>
            </h1>
            <p className="text-slate-500">Finanças inteligentes, vida tranquila.</p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-2xl shadow-slate-200/50">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 p-4 rounded-2xl shadow-lg shadow-violet-500/30">
                <Sparkles className="text-white" size={32} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegistering && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Nome</label>
                <div className="relative group">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-colors" size={20} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 rounded-xl border border-slate-100 focus:bg-white focus:border-violet-200 focus:ring-4 focus:ring-violet-100 outline-none transition-all font-medium text-slate-700"
                    placeholder="Seu nome"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-colors" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 rounded-xl border border-slate-100 focus:bg-white focus:border-violet-200 focus:ring-4 focus:ring-violet-100 outline-none transition-all font-medium text-slate-700"
                  placeholder="exemplo@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Senha</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-colors" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 rounded-xl border border-slate-100 focus:bg-white focus:border-violet-200 focus:ring-4 focus:ring-violet-100 outline-none transition-all font-medium text-slate-700"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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
                className="ml-2 text-violet-600 font-bold hover:underline focus:outline-none"
              >
                {isRegistering ? 'Fazer Login' : 'Cadastre-se'}
              </button>
            </p>
          </div>
        </div>
        
        <p className="text-center text-slate-400 text-xs mt-8 opacity-60">
          Simulação de ambiente seguro.
          <br/>Seus dados são salvos localmente no navegador.
        </p>
      </div>
    </div>
  );
};