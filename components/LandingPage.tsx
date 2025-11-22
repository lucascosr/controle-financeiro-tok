import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Shield, 
  Zap, 
  BrainCircuit, 
  Building2, 
  User, 
  Sun, 
  Moon,
  X,
  LayoutDashboard,
  Home,
  ShoppingCart,
  Car,
  Coffee,
  Heart,
  GraduationCap,
  ShoppingBag,
  Briefcase,
  Smartphone,
  TrendingUp,
  DollarSign,
  Wallet,
  MoreHorizontal,
  FileText,
  Wrench,
  PieChart,
  Clock,
  Target,
  Gem,
  Video
} from 'lucide-react';
import { DashboardCharts } from './DashboardCharts';
import { INITIAL_TRANSACTIONS } from '../constants';

interface LandingPageProps {
  onStart: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Reusing the icon logic for the demo
const getDemoCategoryIcon = (category: string) => {
  const map: Record<string, React.ReactNode> = {
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
    'Venda de Serviços': <Briefcase size={18} />,
    'Venda de Produtos': <ShoppingBag size={18} />,
    'Empréstimos': <Wallet size={18} />,
    'Fornecedores': <Building2 size={18} />,
    'Impostos': <FileText size={18} />,
    'Software/SaaS': <PieChart size={18} />,
    'Manutenção': <Wrench size={18} />,
  };
  return map[category] || <MoreHorizontal size={18} />;
};

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, theme, toggleTheme }) => {
  const [showDemo, setShowDemo] = useState(false);

  // Filter simple PF data for demo
  const demoTransactions = INITIAL_TRANSACTIONS.filter(t => t.context === 'pf');

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 font-sans overflow-x-hidden transition-colors duration-300">
      {/* Background Elements */}
      <div className="fixed top-[-20%] right-[-10%] w-[800px] h-[800px] bg-violet-100/50 dark:bg-violet-900/10 rounded-full blur-[120px] -z-10"></div>
      <div className="fixed bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-fuchsia-100/50 dark:bg-fuchsia-900/10 rounded-full blur-[100px] -z-10"></div>

      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center sticky top-0 z-50 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md rounded-b-3xl border-b border-white/10">
        <div className="flex items-center gap-3 select-none cursor-pointer" onClick={() => window.location.reload()}>
          <div className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-violet-600/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Controle <span className="text-violet-600">Tok</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button 
            onClick={onStart}
            className="text-slate-900 dark:text-white font-bold hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          >
            Entrar
          </button>
        </div>
        <div className="flex items-center gap-4 md:hidden">
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button 
            onClick={onStart}
            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2 rounded-xl font-bold text-sm"
            >
            Entrar
            </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24 md:pt-20 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-sm font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Oficial para Parceiros do Lucas & TikTok Shop
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Controle financeiro para <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                Criadores de Elite.
              </span>
            </h1>
            
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
              A plataforma definitiva para <strong>parceiros do Lucas</strong> e criadores do <strong>TikTok Shop</strong>. 
              Gerencie suas comissões, reinvestimentos em tráfego e gastos pessoais em um único lugar.
              <br/>
              <span className="text-violet-600 dark:text-violet-400 font-bold block mt-4 flex items-center gap-2">
                <Gem size={18} className="inline"/> Plano Pro Gratuito para a Comunidade.
              </span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onStart}
                className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 dark:text-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-slate-900/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                Acessar Agora
                <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => setShowDemo(true)}
                className="bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-800 px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 group"
              >
                <Zap size={20} className="text-violet-500 group-hover:scale-110 transition-transform" />
                Ver Demonstração
              </button>
            </div>

            <div className="flex items-center gap-6 text-sm font-medium text-slate-400 dark:text-slate-500 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                Otimizado para afiliados
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                Gestão de Comissões
              </div>
            </div>
          </div>

          {/* Hero Image / UI Mockup */}
          <div className="relative lg:h-[600px] w-full flex items-center justify-center perspective-1000">
             <div className="relative z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-4 rounded-[2.5rem] border border-white/50 dark:border-slate-700 shadow-2xl shadow-violet-500/20 transform rotate-y-12 rotate-x-6 hover:rotate-0 transition-all duration-700 ease-out max-w-md w-full cursor-pointer" onClick={() => setShowDemo(true)}>
                {/* Fake UI Header */}
                <div className="flex items-center justify-between mb-6 px-2">
                   <div className="flex flex-col">
                      <div className="h-2 w-20 bg-slate-200 dark:bg-slate-700 rounded mb-1"></div>
                      <div className="h-4 w-32 bg-slate-800 dark:bg-slate-600 rounded"></div>
                   </div>
                   <div className="h-10 w-10 bg-violet-100 dark:bg-violet-900 rounded-full"></div>
                </div>
                {/* Fake Chart */}
                <div className="h-48 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-3xl mb-6 p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
                    <div className="text-white">
                       <div className="opacity-80 text-sm mb-1">Comissões TikTok (Mês)</div>
                       <div className="text-3xl font-bold">R$ 12.450,00</div>
                    </div>
                </div>
                {/* Fake List */}
                <div className="space-y-3">
                   <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-50 dark:border-slate-700">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-600"><DollarSign size={20}/></div>
                      <div className="flex-1">
                        <div className="text-xs text-slate-400 font-bold">RECEITA</div>
                        <div className="text-sm font-bold dark:text-white">Saque TikTok Shop</div>
                      </div>
                      <div className="text-sm font-bold text-emerald-500">+ 4.200</div>
                   </div>
                   <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-50 dark:border-slate-700">
                      <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900 flex items-center justify-center text-rose-500"><Smartphone size={20}/></div>
                      <div className="flex-1">
                        <div className="text-xs text-slate-400 font-bold">DESPESA</div>
                        <div className="text-sm font-bold dark:text-white">Equipamento Vídeo</div>
                      </div>
                      <div className="text-sm font-bold text-rose-500">- 850</div>
                   </div>
                   <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-50 dark:border-slate-700">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600"><TrendingUp size={20}/></div>
                      <div className="flex-1">
                        <div className="text-xs text-slate-400 font-bold">INVESTIMENTO</div>
                        <div className="text-sm font-bold dark:text-white">Ads Campanha</div>
                      </div>
                      <div className="text-sm font-bold text-blue-500">- 500</div>
                   </div>
                </div>
                {/* Click Hint */}
                <div className="absolute inset-0 bg-slate-900/0 hover:bg-slate-900/5 dark:hover:bg-white/5 transition-colors rounded-[2.5rem] flex items-center justify-center group">
                     <div className="bg-slate-900/80 dark:bg-white/90 text-white dark:text-slate-900 px-6 py-2 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                        Abrir Demonstração
                     </div>
                </div>
             </div>
             
             {/* Floating Elements */}
             <div className="absolute top-20 right-10 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl animate-float z-20 border border-transparent dark:border-slate-700">
                <div className="flex items-center gap-3">
                   <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg text-emerald-600 dark:text-emerald-400">
                      <ShoppingBag size={20} />
                   </div>
                   <div>
                      <div className="text-xs text-slate-400 dark:text-slate-500">Vendas Hoje</div>
                      <div className="font-bold text-slate-800 dark:text-white">+ 85 Pedidos</div>
                   </div>
                </div>
             </div>
             <div className="absolute bottom-40 left-0 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl animate-float z-20 border border-transparent dark:border-slate-700" style={{animationDelay: '1.5s'}}>
                <div className="flex items-center gap-3">
                   <div className="bg-violet-100 dark:bg-violet-900/30 p-2 rounded-lg text-violet-600 dark:text-violet-400">
                      <BrainCircuit size={20} />
                   </div>
                   <div>
                      <div className="text-xs text-slate-400 dark:text-slate-500">Dica do Consultor</div>
                      <div className="font-bold text-slate-800 dark:text-white">Reinvista 20% em Ads</div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Features Section (Recursos) */}
        <div id="recursos" className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Feito para Creators</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Ferramentas adaptadas para a realidade do TikTok Shop, Mercado de Afiliados e para a comunidade do Lucas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Card 1 */}
             <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-lg shadow-slate-200/50 dark:shadow-black/20 border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                   <Smartphone size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Gestão de Comissões</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                   Não misture o dinheiro das suas vendas no TikTok Shop com suas despesas pessoais. Tenha clareza do seu lucro real.
                </p>
             </div>

             {/* Card 2 */}
             <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-lg shadow-slate-200/50 dark:shadow-black/20 border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-violet-50 dark:bg-violet-900/10 rounded-bl-[4rem] -mr-4 -mt-4 z-0"></div>
                <div className="relative z-10">
                    <div className="w-14 h-14 bg-violet-50 dark:bg-violet-900/20 rounded-2xl flex items-center justify-center text-violet-600 dark:text-violet-400 mb-6">
                       <BrainCircuit size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Consultor de Escala</h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                       Nossa IA analisa suas margens e sugere o momento certo para aumentar o investimento em produtos ou tráfego pago.
                    </p>
                </div>
             </div>

             {/* Card 3 */}
             <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-lg shadow-slate-200/50 dark:shadow-black/20 border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-2xl flex items-center justify-center text-fuchsia-600 dark:text-fuchsia-400 mb-6">
                   <Target size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Metas de Faturamento</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                   Defina metas diárias de vendas e acompanhe seu progresso visualmente. Ideal para quem quer sair de R$1k para R$100k.
                </p>
             </div>
          </div>
        </div>

        {/* Benefits Section (Benefícios) */}
        <div id="como-funciona" className="mt-32 pb-16 border-t border-slate-200 dark:border-slate-800 pt-20">
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Vantagens da Parceria</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                  Por que os top criadores e sócios do Lucas escolhem o Controle Tok para gerir seu patrimônio.
                </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-900/30 text-center md:text-left">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 mx-auto md:mx-0">
                        <Gem size={24} />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2">100% Gratuito</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Isenção total de mensalidades para parceiros do Lucas. Acesso vitalício ao plano Pro.</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 text-center md:text-left">
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-violet-600 dark:text-violet-400 mb-4 mx-auto md:mx-0 shadow-sm">
                        <Video size={24} />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2">Foco no Conteúdo</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Menos tempo em planilhas chatas, mais tempo produzindo vídeos que vendem e viralizam.</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 text-center md:text-left">
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 mx-auto md:mx-0 shadow-sm">
                        <TrendingUp size={24} />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2">Escale com Segurança</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Prepare seu fluxo de caixa para reinvestir e suportar o crescimento explosivo do TikTok.</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 text-center md:text-left">
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-fuchsia-600 dark:text-fuchsia-400 mb-4 mx-auto md:mx-0 shadow-sm">
                        <ShoppingBag size={24} />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2">Para TikTok Shop</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Desenhado especificamente para a dinâmica de pagamentos quinzenais e custos da plataforma.</p>
                </div>
             </div>
        </div>

      </main>

      {/* Demo Modal Overlay */}
      {showDemo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#F8FAFC] dark:bg-slate-950 w-full max-w-5xl h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col relative animate-scale-in border border-white/20 dark:border-slate-800">
            
            {/* Demo Header */}
            <div className="bg-white dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
               <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2"></div>
                  <span className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                    <LayoutDashboard size={18} className="text-violet-500"/>
                    Visão do Painel (Demonstração)
                  </span>
               </div>
               <button 
                 onClick={() => setShowDemo(false)}
                 className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
               >
                 <X size={24} className="text-slate-500 dark:text-slate-400" />
               </button>
            </div>

            {/* Demo Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
               <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Olá, Parceiro!</h2>
                  <p className="text-slate-500 dark:text-slate-400">Esta é uma prévia interativa de como seus dados serão exibidos.</p>
               </div>

               {/* Charts Demo */}
               <DashboardCharts transactions={demoTransactions} theme={theme} />

               {/* List Demo */}
               <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg shadow-slate-200/50 dark:shadow-black/20 border border-slate-100 dark:border-slate-800 p-6">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Últimas Transações (Exemplo)</h3>
                  <div className="space-y-3">
                    {demoTransactions.map((t) => (
                        <div key={t.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg
                                    ${t.type === 'income' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-rose-50 dark:bg-rose-900/20 text-rose-500 dark:text-rose-400'}`}>
                                    {getDemoCategoryIcon(t.category)}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800 dark:text-slate-200">{t.description}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs font-medium text-slate-400 dark:text-slate-500">{t.category}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`font-bold ${t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-200'}`}>
                                    {t.type === 'expense' ? '-' : '+'} R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                        </div>
                    ))}
                  </div>
               </div>
               
               {/* CTA Inside Demo */}
               <div className="mt-8 flex justify-center">
                 <button 
                   onClick={onStart}
                   className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-violet-600/30 transition-all hover:scale-105"
                 >
                   Criar minha conta agora
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-12 px-6">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 select-none opacity-70 grayscale hover:grayscale-0 transition-all">
               <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
               </div>
               <span className="text-lg font-bold text-slate-900 dark:text-white">Controle Tok</span>
            </div>
            <p className="text-slate-400 dark:text-slate-500 text-sm">© 2024 Controle Tok. Todos os direitos reservados.</p>
         </div>
      </footer>
    </div>
  );
}