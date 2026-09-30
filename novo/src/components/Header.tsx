import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, User, Car, Wrench, Menu, X, ArrowRight, Check } from 'lucide-react';
import { Product, Vehicle } from '../types';
import { WorldAutoLogo } from './WorldAutoLogo';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenLogin: () => void;
  onOpenVehicleModal: () => void;
  onOpenBooking: () => void;
  selectedVehicle: Vehicle | null;
  onClearVehicle: () => void;
  products: Product[];
  onSelectProduct: (p: Product) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onToggleMobileNav: () => void;
  isMobileNavOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenLogin,
  onOpenVehicleModal,
  onOpenBooking,
  selectedVehicle,
  onClearVehicle,
  products,
  onSelectProduct,
  searchTerm,
  setSearchTerm,
  onToggleMobileNav,
  isMobileNavOpen,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter products matching search term
  const searchResults = searchTerm.trim().length > 1
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.partNumber.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5)
    : [];

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-3 lg:gap-6">
          
          {/* Mobile menu button */}
          <button
            onClick={onToggleMobileNav}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Abrir menu"
          >
            {isMobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo - Official World Auto logo */}
          <div className="flex items-center shrink-0 pr-1 sm:pr-3 lg:pr-5">
            <a 
              href="#" 
              className="flex items-center py-0.5 transition-transform duration-200 hover:scale-[1.02]" 
              aria-label="World Auto Center"
            >
              <WorldAutoLogo size="header" variant="light" />
            </a>
          </div>

          {/* Vehicle Selector Trigger button */}
          <div className="hidden md:flex items-center">
            {selectedVehicle ? (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5 text-xs text-emerald-950">
                <Car className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[10px] font-semibold text-emerald-700 uppercase">Seu Veículo</span>
                  <span className="font-bold truncate max-w-[140px]">
                    {selectedVehicle.make} {selectedVehicle.model} {selectedVehicle.year}
                  </span>
                </div>
                <button
                  onClick={onClearVehicle}
                  className="text-slate-400 hover:text-red-500 p-0.5 rounded transition-colors ml-1"
                  title="Trocar ou limpar veículo"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenVehicleModal}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 transition-colors whitespace-nowrap group"
              >
                <Car className="w-4 h-4 text-red-600 group-hover:scale-110 transition-transform" />
                <span>Selecione seu Carro</span>
              </button>
            )}
          </div>

          {/* Central Search Bar with live autocomplete */}
          <div className="flex-1 max-w-xl relative" ref={searchRef}>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsSearchFocused(true);
                }}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="O que você procura para seu carro? (Ex: pastilha, pneu, óleo, bateria...)"
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Live Search Results Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-2 border-b border-slate-100 bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex justify-between items-center">
                  <span>Produtos Encontrados</span>
                  <span>{searchResults.length} sugestões</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {searchResults.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectProduct(p);
                        setIsSearchFocused(false);
                      }}
                      className="w-full text-left p-3 hover:bg-slate-50 flex items-center justify-between gap-3 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded bg-slate-100 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div>
                          <div className="text-xs font-semibold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-2">
                            <span>{p.brand}</span>
                            <span>·</span>
                            <span>Cód: {p.partNumber}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs font-bold text-slate-900 font-mono">
                          R$ {p.price.toFixed(2)}
                        </div>
                        <span className="text-[10px] text-emerald-600 font-medium">À vista no PIX</span>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="p-2 bg-slate-50 text-center border-t border-slate-100">
                  <span className="text-xs text-red-600 font-medium hover:underline flex items-center justify-center gap-1">
                    Ver todos os resultados <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action Zone: User Account & Cart Drawer trigger */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Account trigger */}
            <button
              onClick={onOpenLogin}
              className="hidden sm:flex items-center gap-2 text-slate-700 hover:text-red-600 transition-colors p-1.5 rounded-lg hover:bg-slate-50"
            >
              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <User className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-slate-700 font-medium">Olá, faça seu login</span>
                <span className="text-xs font-bold text-slate-900">Minha Conta</span>
              </div>
            </button>

            {/* Cart Trigger with badge */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 sm:gap-3 bg-blue-950 hover:bg-blue-900 text-white rounded-lg px-3.5 py-2 transition-all shadow-xs active:scale-95 group"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-blue-950 animate-pulse">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden md:flex flex-col text-left leading-tight">
                <span className="text-[10px] text-slate-300 font-medium">Meu Carrinho</span>
                <span className="text-xs font-bold text-white font-mono">
                  R$ {cartTotal.toFixed(2)}
                </span>
              </div>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
