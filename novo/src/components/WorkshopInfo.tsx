import React from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Coffee, 
  Wifi, 
  Award, 
  CheckCircle2, 
  Calendar,
  Compass 
} from 'lucide-react';
import { WORKSHOP_DETAILS, IMAGES } from '../data/mockData';

interface WorkshopInfoProps {
  onOpenBooking: () => void;
}

export const WorkshopInfo: React.FC<WorkshopInfoProps> = ({ onOpenBooking }) => {
  return (
    <section className="my-16 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: Workshop Details */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-50 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200">
              <Award className="w-3.5 h-3.5 text-blue-700" />
              <span>Instalação Presencial & Centro Automotivo</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
              Nosso Centro Automotivo Integrado
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Combinamos a agilidade da compra online de autopeças com a segurança de uma oficina física de alto padrão. Seus produtos podem ser entregues em casa ou instalados imediatamente em nossa loja com agendamento prioritário.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-md bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Técnicos Certificados ASE</h4>
                  <p className="text-[11px] text-slate-500">Padrão de excelência e reparação automotiva qualificada.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">2 Anos de Garantia</h4>
                  <p className="text-[11px] text-slate-500">Cobre tanto as autopeças originais quanto a mão de obra.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-md bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                  <Coffee className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Espaço VIP para Clientes</h4>
                  <p className="text-[11px] text-slate-500">Café expresso, ambiente climatizado e Wi-Fi de alta velocidade.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-md bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Alinhamento & Inspeção Digital</h4>
                  <p className="text-[11px] text-slate-500">Aferição computadorizada com laudo técnico entregue ao cliente.</p>
                </div>
              </div>
            </div>

            {/* Address & Hours */}
            <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-600 shrink-0" />
                <span className="font-bold text-slate-900">{WORKSHOP_DETAILS.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{WORKSHOP_DETAILS.hours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <a href="tel:21999999999" className="font-bold text-slate-900 hover:text-red-600 transition-colors">
                  (21) 99999-9999
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={onOpenBooking}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-5 rounded-lg text-xs transition-colors inline-flex items-center gap-2 shadow-sm active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Minha Visita ao Centro Automotivo</span>
            </button>
          </div>
        </div>

        {/* Right Column: Workshop Image & Visual Map Mockup */}
        <div className="lg:col-span-5 bg-slate-900 relative min-h-[300px] flex items-center justify-center p-6">
          <img
            src={IMAGES.alignment || IMAGES.diagnostic}
            alt="World Auto Center"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/40" />

          {/* Location Card Overlay */}
          <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-2xl border border-white/20 max-w-sm w-full text-slate-900">
            <div className="flex items-center gap-2 text-xs font-bold text-red-600 mb-1">
              <MapPin className="w-4 h-4" />
              <span>Visite Nossa Loja</span>
            </div>
            <h4 className="text-sm font-extrabold text-slate-950 font-display">
              World Auto Center
            </h4>
            <p className="text-[11px] font-semibold text-slate-800 mt-1">
              {WORKSHOP_DETAILS.address}
            </p>
            <p className="text-[11px] text-slate-600 mt-1 leading-snug">
              Estrutura moderna e completa com equipamentos computadorizados para manutenção e alinhamento digital.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px]">
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" /> Aberto Agora
              </span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(WORKSHOP_DETAILS.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 font-bold hover:underline"
              >
                Abrir no GPS →
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
