import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Transaction } from '../types';

interface DashboardChartsProps {
  transactions: Transaction[];
}

// Modern Palette
const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#3B82F6', '#EF4444'];

export const DashboardCharts: React.FC<DashboardChartsProps> = ({ transactions }) => {

  const expenseByCategory = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryMap: Record<string, number> = {};

    expenses.forEach(t => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });

    return Object.keys(categoryMap).map((key) => ({
      name: key,
      value: categoryMap[key],
    })).sort((a, b) => b.value - a.value);
  }, [transactions]);

  const monthlyTrend = useMemo(() => {
      const data: Record<string, any> = {};
      
      transactions.forEach(t => {
          const date = new Date(t.date);
          const monthKey = date.toLocaleString('pt-BR', { month: 'short' }).toUpperCase();
          
          if (!data[monthKey]) {
              data[monthKey] = { name: monthKey, income: 0, expense: 0, fullDate: date };
          }

          if (t.type === 'income') {
              data[monthKey].income += t.amount;
          } else {
              data[monthKey].expense += t.amount;
          }
      });

      return Object.values(data).sort((a: any, b: any) => a.fullDate - b.fullDate).slice(-6); // Last 6 months
  }, [transactions]);


  if (transactions.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center h-64 glass-card rounded-3xl border border-white/50 p-8 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-300">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20v-6M6 20V10M18 20V4"></path></svg>
              </div>
              <p className="text-slate-500 font-medium">Sem dados suficientes</p>
              <p className="text-slate-400 text-sm mt-1">Adicione transações para visualizar a mágica acontecer.</p>
          </div>
      )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Expenses by Category */}
      <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl shadow-lg shadow-slate-200/50 border border-white">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-violet-500 rounded-full"></span>
          Despesas por Categoria
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseByCategory}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                cornerRadius={6}
                stroke="none"
              >
                {expenseByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip 
                formatter={(value: number) => `R$ ${value.toFixed(2)}`}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: '#fff', padding: '12px' }}
                itemStyle={{ color: '#1e293b', fontWeight: 600 }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Income vs Expense Trend */}
      <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl shadow-lg shadow-slate-200/50 border border-white">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-emerald-400 rounded-full"></span>
          Fluxo de Caixa
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyTrend}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              barGap={8}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94a3b8', fontSize: 11}} 
                tickFormatter={(val) => `R$${val}`} 
              />
              <RechartsTooltip 
                cursor={{ fill: '#f1f5f9', radius: 8 }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: '#fff' }}
              />
              <Legend verticalAlign="top" align="right" height={36} iconType="circle" />
              <Bar dataKey="income" name="Receitas" fill="#10B981" radius={[6, 6, 6, 6]} barSize={12} />
              <Bar dataKey="expense" name="Despesas" fill="#F43F5E" radius={[6, 6, 6, 6]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};