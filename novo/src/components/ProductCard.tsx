import React from 'react';
import { Star, ShieldCheck, Wrench, ShoppingBag, Eye, CheckCircle2 } from 'lucide-react';
import { Product, Vehicle } from '../types';

interface ProductCardProps {
  product: Product;
  selectedVehicle: Vehicle | null;
  onAddToCart: (product: Product, includeInstallation: boolean) => void;
  onOpenQuickView: (product: Product) => void;
  onOpenBookingWithProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  selectedVehicle,
  onAddToCart,
  onOpenQuickView,
  onOpenBookingWithProduct,
}) => {
  // Check compatibility if a vehicle is selected
  const isCompatible = selectedVehicle
    ? product.compatibleVehicles.includes(selectedVehicle.model) ||
      product.compatibleVehicles.includes('universal')
    : null;

  // PIX price with 10% discount
  const pixPrice = product.price * 0.9;
  const installmentValue = product.price / 10;

  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      
      {/* Top Media & Badges */}
      <div className="relative p-4 bg-slate-50/50 flex flex-col items-center justify-center min-h-[190px] border-b border-slate-100">
        {/* Floating badge */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.badge && (
            <span className="text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white px-2 py-0.5 rounded shadow-xs">
              {product.badge}
            </span>
          )}
          {product.freeShipping && (
            <span className="text-[10px] font-semibold bg-blue-900 text-white px-1.5 py-0.5 rounded shadow-xs">
              Frete Grátis
            </span>
          )}
        </div>

        {/* Quick View Hover Button */}
        <button
          onClick={() => onOpenQuickView(product)}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-slate-900 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
          title="Visualização rápida"
          aria-label="Espiar produto"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-36 object-contain object-center group-hover:scale-105 transition-transform duration-300 mix-blend-multiply"
          loading="lazy"
          onError={(e) => {
            // Styled graceful fallback if image fails
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Vehicle compatibility badge if selected */}
        {selectedVehicle && (
          <div className="w-full mt-2">
            {isCompatible ? (
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/90 py-1 px-2 rounded border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">Compatível com seu {selectedVehicle.model}</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1 text-[10px] font-medium text-slate-700 bg-slate-100 py-0.5 px-2 rounded border border-slate-200">
                <span>Pode requerer adaptação para {selectedVehicle.model}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Body Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Part number */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mb-1">
            <span className="uppercase tracking-wider font-bold text-slate-700">{product.brand}</span>
            <span className="font-mono text-slate-400">Ref: {product.partNumber}</span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onOpenQuickView(product)}
            className="text-xs sm:text-sm font-bold text-slate-900 hover:text-red-600 transition-colors line-clamp-2 cursor-pointer leading-snug mb-2 min-h-[36px]"
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center text-red-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-slate-800 font-mono">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[11px] text-slate-400">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Pricing Zone */}
        <div className="pt-2 border-t border-slate-100">
          {product.originalPrice > product.price && (
            <span className="text-[11px] text-slate-400 line-through">
              De R$ {product.originalPrice.toFixed(2)}
            </span>
          )}

          {/* PIX Price */}
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-base sm:text-lg font-black text-slate-950 font-mono">
              R$ {pixPrice.toFixed(2)}
            </span>
            <span className="text-[11px] font-bold text-blue-700 uppercase">
              no PIX (10% OFF)
            </span>
          </div>

          {/* Installment Price */}
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">
            ou <span className="font-semibold text-slate-700">10x de R$ {installmentValue.toFixed(2)}</span> sem juros
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-2 mt-3.5">
            {/* Primary Buy Online Button */}
            <button
              onClick={() => onAddToCart(product, false)}
              className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold py-2 px-3 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Comprar Online</span>
            </button>

            {/* Install at Workshop Button */}
            <button
              onClick={() => {
                if (onOpenBookingWithProduct) {
                  onOpenBookingWithProduct(product);
                } else {
                  onAddToCart(product, true);
                }
              }}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-1.5 px-3 rounded-lg text-[11px] transition-colors flex items-center justify-center gap-1 border border-slate-200"
            >
              <Wrench className="w-3.5 h-3.5 text-blue-700" />
              <span>
                {product.installPrice === 0 
                  ? 'Instalação Grátis na Oficina' 
                  : `Instalar por +R$ ${product.installPrice?.toFixed(2)}`}
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
