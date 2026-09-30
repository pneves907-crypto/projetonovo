import React, { useState } from 'react';
import { 
  Wrench, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  Send 
} from 'lucide-react';
import { WORKSHOP_DETAILS } from '../data/mockData';
import { WorldAutoLogo } from './WorldAutoLogo';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onScrollToServices: () => void;
  onScrollToSmartFlow: () => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onScrollToServices,
  onScrollToSmartFlow,
  onOpenBooking,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Banner Strip */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-xs uppercase font-bold text-red-500 tracking-wider">
              Clube World Auto Center
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white font-display mt-0.5">
              Receba Cupons Exclusivos e Dicas de Manutenção
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Cadastre seu e-mail e ganhe <strong className="text-white">R$ 20 de desconto</strong> na sua primeira compra de autopeças ou agendamento de oficina.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {newsletterSubscribed ? (
              <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-4 py-2.5 rounded-lg text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Cupom WORLDAUTO20 ativado com sucesso!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Digite seu melhor e-mail"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-600 flex-1 min-w-[220px]"
                />
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 shrink-0 shadow-sm active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Cadastrar</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Column Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-slate-800 text-xs">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center pb-2">
              <a href="#" className="inline-block transition-transform hover:scale-105" aria-label="World Auto Center">
                <WorldAutoLogo size="footer" variant="dark" />
              </a>
            </div>

            <p className="text-slate-400 leading-relaxed">
              Autopeças de procedência garantida e a excelência técnica da oficina World Auto Center. Atendimento transparente, peças originais e garantia de até 2 anos.
            </p>

            <div className="space-y-2 pt-2 text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <a href="tel:21999999999" className="font-bold text-white hover:text-red-400 transition-colors">
                  (21) 99999-9999
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{WORKSHOP_DETAILS.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{WORKSHOP_DETAILS.hours}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Peças & Categorias */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-display">
              Categorias de Autopeças
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onSelectCategory('pneus')}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  Pneus e Rodas (Pirelli, Michelin)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('oleos')}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  Óleos & Fluidos Sintéticos (Motul, Castrol)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('baterias')}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  Baterias Automotivas (Moura, Heliar)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('freios')}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  Pastilhas e Discos de Freio (Brembo)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('suspensao')}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  Amortecedores & Suspensão (Cofap)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('mecanica')}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  Kits Correia Dentada & Motor (Gates)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Serviços da Oficina */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-display">
              Serviços no Centro Automotivo
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={onScrollToSmartFlow}
                  className="hover:text-red-300 transition-colors text-left font-bold text-red-400"
                >
                  ★ Alinhamento & Inspeção Digital
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToServices}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  Balanceamento Dinâmico de Rodas
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToServices}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  Troca de Óleo Express & Filtros
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToServices}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  Revisão & Troca de Freios
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToServices}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  Manutenção Preventiva Geral
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-red-300 transition-colors text-left font-bold text-red-400"
                >
                  + Agendar Horário na Loja
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Institucional & Garantias */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-display">
              Institucional & Garantia
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Garantia de 2 Anos Peças & Mão de Obra</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Técnicos Certificados ASE</span>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-red-400 transition-colors">
                  Política de Trocas e Devoluções (7 dias)
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-red-400 transition-colors">
                  Termos e Condições de Uso
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-red-400 transition-colors">
                  Privacidade e Proteção de Dados LGPD
                </a>
              </li>
            </ul>

            {/* Certifications badges */}
            <div className="mt-5 pt-4 border-t border-slate-800 space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-500">Certificações</div>
              <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-400">
                <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">ASE Certified</span>
                <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">SmartFlow Partner</span>
                <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">INMETRO</span>
              </div>
            </div>
          </div>

        </div>

        {/* Payment Methods and Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-slate-500 mr-2">Formas de Pagamento:</span>
            <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded text-white font-mono font-bold text-[11px]">PIX (-10%)</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-300 font-bold text-[10px]">VISA</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-300 font-bold text-[10px]">MASTERCARD</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-300 font-bold text-[10px]">ELO</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-300 font-bold text-[10px]">BOLETO</span>
          </div>

          <div className="text-slate-500 text-center md:text-right text-[11px]">
            2026 World auto center
          </div>
        </div>

      </div>
    </footer>
  );
};
