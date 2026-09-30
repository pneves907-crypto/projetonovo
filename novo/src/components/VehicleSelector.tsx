import React, { useState } from 'react';
import { Car, ChevronRight, CheckCircle2, RotateCcw, Sparkles, ShieldCheck } from 'lucide-react';
import { VEHICLE_MAKES, VEHICLE_MODELS, VEHICLE_YEARS, VEHICLE_ENGINES } from '../data/mockData';
import { Vehicle } from '../types';

interface VehicleSelectorProps {
  selectedVehicle: Vehicle | null;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onClearVehicle: () => void;
}

export const VehicleSelector: React.FC<VehicleSelectorProps> = ({
  selectedVehicle,
  onSelectVehicle,
  onClearVehicle,
}) => {
  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [year, setYear] = useState<number | ''>('');
  const [engine, setEngine] = useState<string>('');

  const availableModels = make ? VEHICLE_MODELS[make] || [] : [];
  const availableEngines = VEHICLE_ENGINES.default;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!make || !model || !year) return;

    onSelectVehicle({
      id: `${make}-${model}-${year}`,
      make,
      model,
      year: Number(year),
      engine: engine || '1.6 Flex / Turbo',
    });
  };

  // If vehicle is already active, show the active Garage banner with change option
  if (selectedVehicle) {
    return (
      <div className="bg-emerald-900 text-white rounded-xl p-4 sm:p-5 shadow-sm border border-emerald-700/60 my-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-lg bg-emerald-800/80 flex items-center justify-center shrink-0 border border-emerald-600/40">
              <Car className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-emerald-300">
                  Garagem Virtual Ativa
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-850 px-2 py-0.5 rounded text-emerald-200 border border-emerald-700">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Garantia de Encaixe 100%
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold tracking-tight font-display text-white mt-0.5">
                {selectedVehicle.make} {selectedVehicle.model} {selectedVehicle.year} · {selectedVehicle.engine}
              </h3>
              <p className="text-xs text-emerald-200/90 mt-0.5">
                Filtrando catálogo apenas com peças, pneus e fluidos testados para o seu carro.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-center">
            <button
              onClick={onClearVehicle}
              className="px-3.5 py-2 bg-emerald-950/60 hover:bg-emerald-950 text-xs font-semibold text-emerald-100 rounded-lg transition-colors border border-emerald-700 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
              <span>Trocar de Carro</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-white rounded-xl shadow-md border border-slate-800 p-5 sm:p-6 my-6 relative overflow-hidden">
      {/* Background subtle automotive pattern */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-red-600/10 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-red-600/20 text-red-400 flex items-center justify-center">
              <Car className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold font-display tracking-tight text-white flex items-center gap-2">
                Compre por Veículo
                <span className="text-[11px] font-normal text-red-400 bg-red-600/10 px-2 py-0.5 rounded border border-red-500/20">
                  Garantia de Compatibilidade
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Selecione seu carro para ver apenas peças e pneus 100% compatíveis, sem risco de erro.
              </p>
            </div>
          </div>
        </div>

        {/* 4-Step Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Step 1: Montadora */}
          <div>
            <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">
              1. Montadora
            </label>
            <select
              value={make}
              onChange={(e) => {
                setMake(e.target.value);
                setModel('');
              }}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors"
              required
            >
              <option value="">Selecione a Marca</option>
              {VEHICLE_MAKES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: Modelo */}
          <div>
            <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">
              2. Modelo
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              disabled={!make}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              required
            >
              <option value="">{make ? 'Selecione o Modelo' : 'Aguardando Marca'}</option>
              {availableModels.map((mod) => (
                <option key={mod} value={mod}>
                  {mod}
                </option>
              ))}
            </select>
          </div>

          {/* Step 3: Ano */}
          <div>
            <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">
              3. Ano de Fabricação
            </label>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              disabled={!model}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              required
            >
              <option value="">Selecione o Ano</option>
              {VEHICLE_YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Step 4: Motorização */}
          <div>
            <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">
              4. Motorização
            </label>
            <select
              value={engine}
              onChange={(e) => setEngine(e.target.value)}
              disabled={!year}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Selecione o Motor</option>
              {availableEngines.map((eng) => (
                <option key={eng} value={eng}>
                  {eng}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Action */}
          <div className="flex items-end">
            <button
              type="submit"
              disabled={!make || !model || !year}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-2 px-4 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm active:scale-95 disabled:cursor-not-allowed"
            >
              <span>Buscar Peças</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
