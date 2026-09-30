import React from 'react';
import { 
  Droplets, 
  ShieldAlert, 
  Compass, 
  Cpu, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Award, 
  Sliders 
} from 'lucide-react';
import { SERVICES } from '../data/mockData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onOpenBooking: (serviceId?: string) => void;
  onScrollToSmartFlow: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenBooking,
  onScrollToSmartFlow,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return Compass;
      case 'Droplets':
        return Droplets;
      case 'ShieldAlert':
        return ShieldAlert;
      case 'Cpu':
        return Cpu;
      default:
        return Sliders;
    }
  };

  return (
    <section id="servicos" className="my-16 bg-slate-900 text-white rounded-2xl p-6 sm:p-10 lg:p-12 relative overflow-hidden border border-slate-800">
      
      {/* Decorative gradient & badge */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-800">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-600/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-2 border border-red-500/30">
              <Award className="w-3.5 h-3.5" />
              <span>World Auto Center · Serviços de Oficina</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-white">
              Serviços Automotivos & Alinhamento Computadorizado
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Equipe formada por técnicos certificados ASE. Oferecemos garantia de até 2 anos em peças e mão de obra, orçamentos 100% transparentes e tecnologia de aferição milimétrica.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={onScrollToSmartFlow}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-blue-300 hover:text-white border border-slate-700 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Ver Alinhamento Digital</span>
            </button>

            <button
              onClick={() => onOpenBooking()}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Horário na Loja</span>
            </button>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((serv) => {
            const Icon = getIcon(serv.iconName);

            return (
              <div
                key={serv.id}
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-red-500/50 rounded-xl p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between group shadow-sm"
              >
                <div>
                  {/* Top pill and icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center border border-red-500/30 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    {serv.popular && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white px-2 py-0.5 rounded">
                        Destaque
                      </span>
                    )}
                  </div>

                  {/* Title & Category */}
                  <div className="text-[11px] font-bold text-red-400 uppercase tracking-wider mb-1">
                    {serv.category}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 transition-colors mb-2 font-display">
                    {serv.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {serv.shortDesc}
                  </p>

                  {/* Benefits bullet list */}
                  <div className="space-y-1.5 mb-5 pt-3 border-t border-slate-700/60">
                    {serv.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom info & Action */}
                <div className="pt-4 border-t border-slate-700 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] uppercase font-semibold text-slate-400">
                      Garantia & Tempo
                    </div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span className="text-emerald-400">{serv.warrantyMonths} meses</span>
                      <span>·</span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {serv.estimatedTime}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenBooking(serv.id)}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 active:scale-95 shadow-sm"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Agendar</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Trust Badges Strip */}
        <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-black text-red-500 font-mono">2 ANOS</div>
            <div className="text-xs text-slate-300 mt-1 font-semibold">Garantia em Peças e Mão de Obra</div>
          </div>
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-black text-sky-400 font-mono">ASE</div>
            <div className="text-xs text-slate-300 mt-1 font-semibold">Técnicos Certificados</div>
          </div>
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">DIGITAL</div>
            <div className="text-xs text-slate-300 mt-1 font-semibold">Alinhamento Computadorizado</div>
          </div>
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-black text-blue-400 font-mono">100%</div>
            <div className="text-xs text-slate-300 mt-1 font-semibold">Inspeção Digital e Laudo</div>
          </div>
        </div>

      </div>
    </section>
  );
};
