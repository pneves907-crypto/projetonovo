import React from 'react';
import { 
  Wrench, 
  Disc, 
  Droplets, 
  BatteryCharging, 
  ShieldCheck, 
  Sliders, 
  Cpu, 
  Sparkles, 
  Compass,
  ChevronDown,
  Percent
} from 'lucide-react';
import { WorldAutoLogo } from './WorldAutoLogo';

interface NavbarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onScrollToServices: () => void;
  onScrollToSmartFlow: () => void;
  isMobileNavOpen: boolean;
  onCloseMobileNav: () => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedCategory,
  onSelectCategory,
  onScrollToServices,
  onScrollToSmartFlow,
  isMobileNavOpen,
  onCloseMobileNav,
  onOpenBooking,
}) => {
  const navItems = [
    { id: 'all', label: 'Todos os Produtos' },
    { id: 'pneus', label: 'Pneus & Rodas', icon: Disc },
    { id: 'oleos', label: 'Óleos & Lubrificantes', icon: Droplets },
    { id: 'baterias', label: 'Baterias & Elétrica', icon: BatteryCharging },
    { id: 'freios', label: 'Freios & Pastilhas', icon: ShieldCheck },
    { id: 'suspensao', label: 'Suspensão & Direção', icon: Sliders },
    { id: 'mecanica', label: 'Mecânica & Motor', icon: Cpu },
  ];

  return (
    <>
      {/* Desktop Main Navigation Bar */}
      <nav className="hidden lg:block bg-blue-950 text-white border-b border-blue-900 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Category tabs */}
            <div className="flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = selectedCategory === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectCategory(item.id)}
                    className={`px-3 py-3 text-xs font-semibold tracking-wide transition-colors whitespace-nowrap flex items-center gap-1.5 border-b-2 ${
                      isActive
                        ? 'border-red-600 text-white bg-blue-900/60'
                        : 'border-transparent text-slate-300 hover:text-white hover:bg-blue-900/30'
                    }`}
                  >
                    {item.icon && <item.icon className="w-3.5 h-3.5 text-red-500" />}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Special Highlights: Auto Center Services & Alinhamento Digital */}
            <div className="flex items-center space-x-2 py-1.5">
              <button
                onClick={onScrollToSmartFlow}
                className="px-3 py-1.5 text-xs font-bold bg-blue-900/80 hover:bg-blue-800 text-blue-100 hover:text-white rounded transition-colors flex items-center gap-1.5 border border-blue-400/40"
              >
                <Compass className="w-3.5 h-3.5 text-blue-300" />
                <span>Alinhamento & Inspeção Digital</span>
              </button>

              <button
                onClick={onScrollToServices}
                className="px-3 py-1.5 text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Serviços na Oficina</span>
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {isMobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex">
          <div className="bg-white w-4/5 max-w-sm h-full overflow-y-auto p-5 shadow-2xl flex flex-col justify-between animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <WorldAutoLogo size="md" variant="light" />
                <button
                  onClick={onCloseMobileNav}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  ✕
                </button>
              </div>

              {/* Quick actions for mobile */}
              <div className="py-4 space-y-2 border-b border-slate-200">
                <button
                  onClick={() => {
                    onOpenBooking();
                    onCloseMobileNav();
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-lg text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Agendar Serviço na Oficina</span>
                </button>
                <button
                  onClick={() => {
                    onScrollToSmartFlow();
                    onCloseMobileNav();
                  }}
                  className="w-full bg-blue-950 text-blue-200 hover:text-white font-semibold py-2.5 px-4 rounded-lg text-xs flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4 text-red-500" />
                  <span>Alinhamento & Inspeção Digital</span>
                </button>
              </div>

              {/* Category links */}
              <div className="py-4">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Categorias de Autopeças
                </p>
                <div className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = selectedCategory === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectCategory(item.id);
                          onCloseMobileNav();
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                          isActive
                            ? 'bg-red-50 text-red-600 font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {item.icon && <item.icon className="w-4 h-4 text-slate-500" />}
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom info */}
            <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 space-y-1">
              <p className="font-semibold text-slate-700">Central de Atendimento World Auto Center</p>
              <p className="font-bold text-slate-800">(21) 9999-9999</p>
              <p className="text-[11px] text-slate-400">Seg a Sex: 08h às 18h | Sáb: 08h às 13h</p>
            </div>
          </div>
          <div className="flex-1" onClick={onCloseMobileNav}></div>
        </div>
      )}
    </>
  );
};
