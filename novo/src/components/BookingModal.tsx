import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Car, 
  User, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Wrench, 
  ShieldCheck, 
  MessageSquare 
} from 'lucide-react';
import { SERVICES, WORKSHOP_DETAILS } from '../data/mockData';
import { Product, Vehicle } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialProduct?: Product | null;
  selectedVehicle: Vehicle | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
  initialProduct,
  selectedVehicle,
}) => {
  if (!isOpen) return null;

  const [serviceId, setServiceId] = useState<string>(
    initialServiceId || (initialProduct ? 'instalacao-produto' : 'serv-alinhamento')
  );
  const [vehicleMake, setVehicleMake] = useState<string>(selectedVehicle?.make || '');
  const [vehicleModel, setVehicleModel] = useState<string>(selectedVehicle?.model || '');
  const [vehicleYear, setVehicleYear] = useState<string>(selectedVehicle ? String(selectedVehicle.year) : '');
  
  const [date, setDate] = useState<string>('2026-10-02');
  const [time, setTime] = useState<string>('09:00');
  
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>(
    initialProduct ? `Instalação do item: ${initialProduct.name} (${initialProduct.partNumber})` : ''
  );

  const [isSuccess, setIsSuccess] = useState(false);
  const [protocol, setProtocol] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedProtocol = `WAC-${Math.floor(100000 + Math.random() * 900000)}`;
    setProtocol(generatedProtocol);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center border border-red-500/30">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-display">
                Agendamento de Oficina & Diagnóstico
              </h2>
              <p className="text-xs text-slate-300">
                World Auto Center · Atendimento pontual em box individual
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Success Confirmation View */}
        {isSuccess ? (
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="inline-block bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
              Protocolo: {protocol}
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 font-display">
              Agendamento Confirmado com Sucesso!
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Olá, <strong>{name}</strong>! Seu veículo <strong>{vehicleMake} {vehicleModel}</strong> está agendado para o dia <strong>{date}</strong> às <strong>{time}</strong>.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-left space-y-2 max-w-md mx-auto">
              <div className="flex items-center gap-2 text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Garantia de 2 anos em peças e serviços aplicados</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Clock className="w-4 h-4 text-red-600 shrink-0" />
                <span>Chegue com 10 minutos de antecedência</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Enviamos o link de acompanhamento no WhatsApp ({phone})</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleReset}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-lg text-xs transition-colors"
              >
                Concluir
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            
            {/* Service Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                Serviço Desejado
              </label>
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              >
                {initialProduct && (
                  <option value="instalacao-produto">
                    Instalação de Autopeça: {initialProduct.name}
                  </option>
                )}
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} ({s.priceFrom === 0 ? 'Gratuito' : `A partir de R$ ${s.priceFrom.toFixed(2)}`})
                  </option>
                ))}
              </select>
            </div>

            {/* Vehicle Inputs */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase mb-1 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-red-600" />
                <span>Dados do Veículo</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Marca (Ex: VW)"
                  value={vehicleMake}
                  onChange={(e) => setVehicleMake(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
                <input
                  type="text"
                  placeholder="Modelo (Ex: Golf)"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
                <input
                  type="text"
                  placeholder="Ano (Ex: 2021)"
                  value={vehicleYear}
                  onChange={(e) => setVehicleYear(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
              </div>
            </div>

            {/* Date and Time slots */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>Data Preferida</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min="2026-09-30"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Horário</span>
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                >
                  <option value="08:30">08:30 - Manhã</option>
                  <option value="09:00">09:00 - Manhã</option>
                  <option value="10:30">10:30 - Manhã</option>
                  <option value="11:30">11:30 - Manhã</option>
                  <option value="14:00">14:00 - Tarde</option>
                  <option value="15:30">15:30 - Tarde</option>
                  <option value="17:00">17:00 - Final de Tarde</option>
                </select>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-800 uppercase block">
                Seus Dados para Contato
              </span>

              <div>
                <input
                  type="text"
                  placeholder="Seu Nome Completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="tel"
                  placeholder="WhatsApp / Telefone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
              </div>

              <div>
                <textarea
                  rows={2}
                  placeholder="Descreva o sintoma ou observações (Ex: barulho no freio, luz de injeção acesa, etc.)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow-md active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirmar Agendamento</span>
              </button>
              <p className="text-[11px] text-slate-400 text-center mt-2">
                Garantia de 2 anos em peças e serviços. Cancelamento sem custo a qualquer momento.
              </p>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
