import { GoogleGenAI } from "@google/genai";
import { Transaction, ContextType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFinancialAdvice = async (transactions: Transaction[], context: ContextType): Promise<string> => {
  if (!transactions || transactions.length === 0) {
    return "Adicione algumas transações para que eu possa analisar as finanças.";
  }

  // Summarize data for the prompt to save tokens and improve focus
  const summary = transactions.map(t => 
    `- ${t.date}: ${t.description} (${t.category}) - R$ ${t.amount.toFixed(2)} [${t.type === 'income' ? 'Receita' : 'Despesa'}]`
  ).join('\n');

  const contextDescription = context === 'pj' 
    ? "uma empresa (Pessoa Jurídica). Foque em fluxo de caixa, margem de lucro, custos operacionais e impostos." 
    : "uma pessoa física. Foque em economia doméstica, fundo de reserva e controle de gastos pessoais.";

  const prompt = `
    Atue como um consultor financeiro experiente.
    Você está analisando as finanças de ${contextDescription}
    
    Lista de transações recentes:
    ${summary}

    Por favor, forneça:
    1. Um breve diagnóstico da saúde financeira atual (Saldo, Tendências).
    2. Identifique a categoria de maior impacto (custo ou receita principal).
    3. Dê 2 ou 3 dicas práticas e estratégicas para este contexto específico (${context === 'pj' ? 'negócios' : 'pessoal'}).
    
    Seja conciso, profissional porém acessível, e use formatação Markdown (negrito, listas).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    
    return response.text || "Não foi possível gerar uma análise no momento.";
  } catch (error) {
    console.error("Error fetching financial advice:", error);
    return "Desculpe, ocorreu um erro ao conectar com a IA. Verifique sua chave de API ou tente novamente mais tarde.";
  }
};