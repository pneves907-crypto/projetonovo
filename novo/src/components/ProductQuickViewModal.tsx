import React, { useState } from 'react';
import { X, Check, Star, ShieldCheck, Wrench, ShoppingBag, Truck, Calendar } from 'lucide-react';
import { Product, Vehicle } from '../types';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, includeInstallation: boolean) => void;
  onOpenBookingWithProduct: (product: Product) => void;
  selectedVehicle: Vehicle | null;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenBookingWithProduct,
  selectedVehicle,
}) => {
  if (!product) return null;

  const [includeInstall, setIncludeInstall] = useState(false);
  const pixPrice = product.price * 0.9;
  const isCompatible = selectedVehicle
    ? product.compatibleVehicles.includes(selectedVehicle.model) ||
      product.compatibleVehicles.includes('universal')
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          
          {/* Left Column: Product Image & Highlights */}
          <div className="flex flex-col items-center justify-center bg-slate-50 p-6 rounded-xl border border-slate-100 relative">
            {product.badge && (
              <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white px-2 py-0.5 rounded shadow-xs">
                {product.badge}
              </span>
            )}

            <img
              src={product.image}
              alt={product.name}
              className="max-h-64 object-contain mix-blend-multiply my-4"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />

            {/* Trust highlights */}
            <div className="w-full mt-4 pt-4 border-t border-slate-200 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-800">{product.warranty}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-red-600 shrink-0" />
                <span>Envio rápido ou retirada imediata na oficina</span>
              </div>
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Instalação qualificada com técnicos certificados ASE</span>
              </div>
            </div>
          </div>

          {/* Right Column: Specs & Purchase Actions */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Brand and Part Number */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span className="font-bold uppercase tracking-wider text-slate-700">{product.brand}</span>
                <span className="font-mono">Cód: {product.partNumber}</span>
              </div>

              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display leading-snug mb-2">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center text-red-500">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-xs font-bold text-slate-800">{product.rating.toFixed(1)}</span>
                <span className="text-xs text-slate-400">({product.reviewCount} avaliações verificadas)</span>
              </div>

              {/* Vehicle Compatibility Banner */}
              {selectedVehicle && (
                <div className={`p-2.5 rounded-lg mb-4 text-xs font-semibold flex items-center gap-2 ${
                  isCompatible 
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' 
                    : 'bg-slate-100 text-slate-800 border border-slate-200'
                }`}>
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {isCompatible
                      ? `100% Compatível com seu ${selectedVehicle.make} ${selectedVehicle.model}`
                      : `Atenção: verifique a especificação exata do seu ${selectedVehicle.model}`}
                  </span>
                </div>
              )}

              {/* Short Description */}
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {product.shortDescription}
              </p>

              {/* Specifications Table */}
              <div className="mb-4">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Ficha Técnica
                </h4>
                <div className="bg-slate-50 rounded-lg p-2.5 divide-y divide-slate-200 text-xs">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="py-1 flex justify-between gap-2">
                      <span className="text-slate-500 font-medium">{key}</span>
                      <span className="font-semibold text-slate-900 text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optional Installation checkbox */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-3 mb-4">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeInstall}
                    onChange={(e) => setIncludeInstall(e.target.value as any)}
                    className="mt-0.5 w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-600"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-blue-950">
                      Incluir Instalação Profissional no Centro Automotivo
                    </span>
                    <p className="text-[11px] text-blue-800/80 mt-0.5">
                      {product.installPrice === 0
                        ? 'Instalação Grátis no Auto Center (Promoção Moura/Pirelli)'
                        : `Adicionar mão de obra especializada por apenas R$ ${product.installPrice?.toFixed(2)}`}
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Price & Action Buttons */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900 font-mono">
                  R$ {(includeInstall ? pixPrice + (product.installPrice || 0) : pixPrice).toFixed(2)}
                </span>
                <span className="text-xs font-bold text-blue-700 uppercase">
                  no PIX (10% OFF)
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                ou 10x de R$ {((includeInstall ? product.price + (product.installPrice || 0) : product.price) / 10).toFixed(2)} sem juros
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                <button
                  onClick={() => {
                    onAddToCart(product, includeInstall);
                    onClose();
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Adicionar ao Carrinho</span>
                </button>

                <button
                  onClick={() => {
                    onOpenBookingWithProduct(product);
                    onClose();
                  }}
                  className="w-full bg-blue-950 hover:bg-blue-900 text-white font-bold py-2.5 px-4 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Calendar className="w-4 h-4 text-red-500" />
                  <span>Agendar na Oficina</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
