import React, { useState } from 'react';
import { X, User, Lock, Mail, CheckCircle2, ShieldCheck } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string | null;
  onSetUserName: (name: string | null) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  userName,
  onSetUserName,
}) => {
  if (!isOpen) return null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const extractedName = email.split('@')[0];
    const formattedName = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);
    onSetUserName(formattedName);
    onClose();
  };

  const handleLogout = () => {
    onSetUserName(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-150">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {userName ? (
          <div className="text-center space-y-4 py-2">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <User className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-base font-extrabold text-slate-900 font-display">
                Olá, {userName}!
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Você está conectado à sua conta World Auto Center.
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-left space-y-1.5">
              <div className="flex justify-between text-slate-700">
                <span>Garantias Ativas:</span>
                <span className="font-bold text-emerald-600">3 Peças / Serviços</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Veículo Cadastrado:</span>
                <span className="font-semibold">VW Golf TSI</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg text-xs transition-colors"
            >
              Sair da Conta
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-red-600/20 text-red-600 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 font-display">
                  Acessar Minha Conta
                </h3>
                <p className="text-[11px] text-slate-500">
                  Acompanhe seus pedidos e laudos do SmartFlow
                </p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  E-mail ou CPF
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="seuemail@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <label className="flex items-center gap-1.5 text-slate-600 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-red-600" />
                  <span>Lembrar-me</span>
                </label>
                <a href="#" className="text-red-600 hover:underline">
                  Esqueci a senha
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-lg text-xs transition-colors shadow-xs active:scale-95"
              >
                Entrar na Minha Conta
              </button>

              <button
                type="button"
                onClick={() => {
                  onSetUserName('Cliente VIP');
                  onClose();
                }}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg text-xs transition-colors"
              >
                Acessar como Visitante
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
