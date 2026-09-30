import React, { useState } from 'react';
import { 
  Compass, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  Camera, 
  ShieldCheck, 
  Check, 
  Calendar,
  Gauge
} from 'lucide-react';
import { IMAGES } from '../data/mockData';

interface SmartFlowInspectionProps {
  onOpenBooking: () => void;
}

export const SmartFlowInspection: React.FC<SmartFlowInspectionProps> = ({ onOpenBooking }) => {
  const [activeParam, setActiveParam] = useState<'geometria' | 'balanceamento' | 'inspecao'>('geometria');

  const alignmentData = {
    vehicle: 'Volkswagen Golf TSI 2021',
    plate: 'WAC-2026',
    wheelSize: 'Roda Aro 16" · Pneus 205/55 R16',
    technician: 'Responsável Técnico Certificado ASE',
    parameters: {
      geometria: [
        {
          name: 'Câmber Dianteiro (Esq / Dir)',
          before: "-0°55' / -1°10'",
          after: "-0°30' / -0°30'",
          ideal: "-0°30' ± 0°15'",
          status: 'Calibrado com Sucesso',
          description: 'Ângulo de inclinação vertical das rodas ajustado rigorosamente ao padrão de fábrica.',
        },
        {
          name: 'Convergência Dianteira Total',
          before: "+0°35' (Fechada - arrastando pneu)",
          after: "+0°08' (Perfeitamente alinhada)",
          ideal: "+0°08' ± 0°04'",
          status: 'Calibrado com Sucesso',
          description: 'Aferição computadorizada elimina o desgaste nas bordas dos pneus e melhora o consumo.',
        },
        {
          name: 'Cáster (Ângulo de Esterçamento)',
          before: "+7°15' / +7°20'",
          after: "+7°25' / +7°25'",
          ideal: "+7°25' ± 0°30'",
          status: 'Calibrado com Sucesso',
          description: 'Garante o retorno suave e automático do volante ao centro após as curvas.',
        }
      ],
      balanceamento: [
        {
          name: 'Roda Dianteira Esquerda',
          before: 'Desbalanceamento: 25g externo / 15g interno',
          after: '0g residual (Balanceamento Perfeito)',
          ideal: '0g / 0g',
          status: 'Calibrado com Sucesso',
          description: 'Eliminada qualquer trepidação no volante em velocidades entre 80 km/h e 120 km/h.',
        },
        {
          name: 'Roda Dianteira Direita',
          before: 'Desbalanceamento: 20g estático',
          after: '0g residual (Balanceamento Perfeito)',
          ideal: '0g / 0g',
          status: 'Calibrado com Sucesso',
          description: 'Pesos adesivos de precisão aplicados no interior da roda de liga leve.',
        },
        {
          name: 'Rodas Traseiras (Esq / Dir)',
          before: '15g / 10g',
          after: '0g residual nas duas rodas',
          ideal: '0g / 0g',
          status: 'Calibrado com Sucesso',
          description: 'Condução suave e proteção para os rolamentos e buchas de suspensão.',
        }
      ],
      inspecao: [
        {
          name: 'Profundidade dos Sulcos dos Pneus',
          before: 'Pneu Dianteiro Direito: 6.2mm',
          after: 'Desgaste regular e seguro verificado',
          ideal: 'Mínimo permitido: 1.6mm (Sulco seguro > 4mm)',
          status: 'Conforme',
          description: 'Pneus com ótima vida útil e boa drenagem em pista molhada.',
        },
        {
          name: 'Terminais de Direção e Buchas',
          before: 'Folga: Zero (Excelente estado)',
          after: 'Componentes lubrificados e conferidos',
          ideal: 'Sem folgas mecânicas',
          status: 'Conforme',
          description: 'Conjunto de direção rígido e sem ruídos em pisos irregulares.',
        }
      ]
    }
  };

  return (
    <section id="alinhamento-digital" className="my-16">
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 lg:p-12 border border-slate-800 relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Description */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-red-600/20 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/30">
              <Compass className="w-3.5 h-3.5" />
              <span>Alinhamento e Balanceamento com Inspeção Digital</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-white">
              Alinhamento Computadorizado
              <span className="block text-red-400 mt-1">Inspeção Digital e Laudo Técnico</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              O alinhamento e o balanceamento corretos garantem que seu carro ande em linha reta com suavidade absoluta, eliminando vibrações no volante e protegendo seus pneus contra desgaste irregular prematuro.
            </p>

            {/* 3 Pillars */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Aferição Computadorizada de Alta Precisão</h4>
                  <p className="text-[11px] text-slate-400">Sensores computadorizados medem câmber, cáster e convergência com parâmetros oficiais da montadora.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Sliders className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Balanceamento Dinâmico de Rodas</h4>
                  <p className="text-[11px] text-slate-400">Compensação de massa com pesos de alta calibração que eliminam 100% das vibrações em alta velocidade.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Economia Real e Durabilidade dos Pneus</h4>
                  <p className="text-[11px] text-slate-400">Pneus bem alinhados duram até 40% mais e reduzem a resistência ao rolamento, economizando combustível.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-lg text-xs transition-colors flex items-center gap-2 shadow-lg shadow-red-600/30 active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Alinhamento e Balanceamento</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Digital Alignment & Balance Telemetry */}
          <div className="lg:col-span-6 bg-slate-950 rounded-2xl border border-slate-800 p-5 shadow-2xl">
            
            {/* Header Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-slate-300 font-semibold">LAUDO DIGITAL DE GEOMETRIA & RODAS</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">CALIBRAÇÃO DIGITAL</span>
            </div>

            {/* Vehicle Metadata */}
            <div className="bg-slate-900/90 rounded-lg p-3 my-3 text-xs flex flex-wrap justify-between items-center gap-2 border border-slate-800">
              <div>
                <span className="text-slate-400 text-[10px] block">Veículo Calibrado:</span>
                <span className="font-bold text-white">{alignmentData.vehicle}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Conjunto de Rodas:</span>
                <span className="font-mono font-semibold text-slate-200">{alignmentData.wheelSize}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Padrão Técnico:</span>
                <span className="font-medium text-emerald-400">{alignmentData.technician}</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <button
                onClick={() => setActiveParam('geometria')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeParam === 'geometria'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Geometria Digital</span>
              </button>

              <button
                onClick={() => setActiveParam('balanceamento')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeParam === 'balanceamento'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Balanceamento</span>
              </button>

              <button
                onClick={() => setActiveParam('inspecao')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeParam === 'inspecao'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Gauge className="w-3.5 h-3.5" />
                <span>Inspeção Rodas</span>
              </button>
            </div>

            {/* Parameter Items Display */}
            <div className="space-y-3">
              {alignmentData.parameters[activeParam].map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-900 rounded-xl p-3.5 border border-slate-800 space-y-2 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{item.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {item.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Antes do Ajuste:</span>
                      <span className="font-mono text-slate-400">{item.before}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Após Calibração:</span>
                      <span className="font-mono font-bold text-emerald-400">{item.after}</span>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <span className="text-[10px] text-slate-500 block">Tolerância Ideal:</span>
                      <span className="font-mono text-slate-300 text-[11px]">{item.ideal}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-snug">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-slate-500 text-center mt-3">
              * Laudo com medições reais gerado no momento do alinhamento computadorizado em nossa loja.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
