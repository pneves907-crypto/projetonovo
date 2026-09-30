import React from 'react';
import { Truck, ShieldCheck, Award, CreditCard, Sparkles, Compass } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: '2 Anos de Garantia',
      description: 'Peças genuínas e mão de obra 100% garantidas',
      color: 'text-emerald-500',
    },
    {
      icon: Award,
      title: 'Técnicos Certificados ASE',
      description: 'Padrão internacional de qualidade mecânica',
      color: 'text-blue-500',
    },
    {
      icon: Compass,
      title: 'Alinhamento & Balanceamento Digital',
      description: 'Aferição computadorizada com laudo de geometria',
      color: 'text-red-600',
    },
    {
      icon: CreditCard,
      title: 'Até 10x Sem Juros',
      description: 'Ou 10% de desconto à vista no PIX',
      color: 'text-blue-600',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-xs my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className={`flex items-center gap-3.5 pt-3 sm:pt-0 sm:px-4 first:pt-0 first:px-0`}
            >
              <div className={`w-11 h-11 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 ${p.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 leading-tight">
                  {p.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  {p.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
