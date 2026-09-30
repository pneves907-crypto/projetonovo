import React from 'react';
import { Phone, MessageSquare, Truck, Shield, Clock, Calendar } from 'lucide-react';
import { WORKSHOP_DETAILS } from '../data/mockData';

interface TopBarProps {
  onOpenBooking: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="bg-slate-900 text-slate-300 text-xs border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-2 gap-2">
          {/* Left info: Free shipping & warranty */}
          <div className="flex items-center flex-wrap gap-4 text-center md:text-left justify-center md:justify-start">
            <span className="flex items-center gap-1.5 text-slate-200 font-medium">
              <Truck className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span>Frete Grátis acima de R$ 299 ou Retirada Grátis no Auto Center</span>
            </span>
            <span className="hidden sm:inline text-slate-600">·</span>
            <span className="hidden sm:flex items-center gap-1 text-slate-300">
              <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Até 2 Anos de Garantia em Peças e Mão de Obra</span>
            </span>
          </div>

          {/* Right info: Phone, Hours, Booking CTA */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a 
              href="tel:2199999999" 
              className="flex items-center gap-1 hover:text-white transition-colors"
              title="Ligue para nossa loja"
            >
              <Phone className="w-3.5 h-3.5 text-red-500" />
              <span className="font-semibold text-slate-200">(21) 9999-9999</span>
            </a>

            <a 
              href="https://wa.me/5521999999999" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden lg:flex items-center gap-1 hover:text-emerald-400 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            <span className="hidden xl:flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Seg-Sex 08h-18h | Sáb 08h-13h</span>
            </span>

            <button
              onClick={onOpenBooking}
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-3 py-1 rounded transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Calendar className="w-3 h-3" />
              <span>Agendar Oficina</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
