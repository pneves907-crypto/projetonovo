import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Wrench, 
  ShieldCheck, 
  Tag, 
  Truck, 
  ArrowRight,
  CheckCircle2 
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onToggleInstallation: (productId: string) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onToggleInstallation,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [cep, setCep] = useState('');
  const [shippingCalculated, setShippingCalculated] = useState(false);

  // Subtotal of products
  const productsSubtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Installation total
  const installationTotal = items.reduce((sum, item) => {
    if (item.includeInstallation) {
      return sum + (item.product.installPrice || 0) * item.quantity;
    }
    return sum;
  }, 0);

  // Coupon discount (10% if WORLDAUTO10)
  const discount = appliedCoupon === 'WORLDAUTO10' ? productsSubtotal * 0.1 : 0;

  // Free shipping over 299
  const shippingCost = productsSubtotal > 299 ? 0 : 25.00;

  // Total
  const grandTotal = Math.max(0, productsSubtotal + installationTotal - discount + (items.length > 0 ? shippingCost : 0));
  const pixTotal = grandTotal * 0.9;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'WORLDAUTO10' || couponCode.trim().toUpperCase() === 'AUTOZ10') {
      setAppliedCoupon('WORLDAUTO10');
    } else {
      alert('Cupom inválido. Experimente o cupom de boas-vindas: WORLDAUTO10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-red-500" />
            <h2 className="text-base font-extrabold font-display">
              Carrinho de Compras ({items.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-slate-100 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 text-slate-500 space-y-3">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <p className="text-sm font-bold text-slate-800">Seu carrinho está vazio</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Explore nosso catálogo e encontre as melhores autopeças, pneus e serviços para seu carro.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors"
              >
                Começar a Comprar
              </button>
            </div>
          ) : (
            items.map((item) => {
              const { product, quantity, includeInstallation } = item;
              const itemTotal = product.price * quantity;

              return (
                <div key={product.id} className="pt-4 first:pt-0 space-y-2">
                  <div className="flex gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-contain bg-slate-50 rounded-lg p-1 border border-slate-100 shrink-0"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          {product.brand}
                        </span>
                        <button
                          onClick={() => onRemoveItem(product.id)}
                          className="text-slate-400 hover:text-red-500 p-0.5 transition-colors"
                          title="Remover do carrinho"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1 leading-snug">
                        {product.name}
                      </h4>

                      <div className="text-xs font-black text-slate-900 font-mono mt-1">
                        R$ {itemTotal.toFixed(2)}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-slate-200 rounded-md bg-slate-50">
                          <button
                            onClick={() => onUpdateQuantity(product.id, Math.max(1, quantity - 1))}
                            className="p-1 text-slate-600 hover:bg-slate-200 rounded-l transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold font-mono text-slate-800">
                            {quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                            className="p-1 text-slate-600 hover:bg-slate-200 rounded-r transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {product.freeShipping && (
                          <span className="text-[10px] font-semibold text-emerald-600">
                            Frete Grátis
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Installation in Workshop Add-on Checkbox */}
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                    <label className="flex items-center justify-between cursor-pointer text-xs">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={includeInstallation}
                          onChange={() => onToggleInstallation(product.id)}
                          className="w-3.5 h-3.5 text-red-600 rounded border-slate-300 focus:ring-red-600"
                        />
                        <span className="font-semibold text-slate-800 flex items-center gap-1">
                          <Wrench className="w-3.5 h-3.5 text-blue-600" />
                          Instalar no Auto Center
                        </span>
                      </div>
                      <span className="font-bold text-blue-950 font-mono">
                        {product.installPrice === 0
                          ? 'Grátis'
                          : `+R$ ${((product.installPrice || 0) * quantity).toFixed(2)}`}
                      </span>
                    </label>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer & Order Summary */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/80 space-y-3">
            
            {/* Coupon input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Cupom (WORLDAUTO10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg pl-7 pr-3 py-1.5 text-xs text-slate-800 uppercase focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <button
                type="submit"
                className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors shrink-0"
              >
                Aplicar
              </button>
            </form>

            {appliedCoupon && (
              <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                <span>Cupom WORLDAUTO10 aplicado</span>
                <span className="font-bold">-10%</span>
              </div>
            )}

            {/* Calculations breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200">
              <div className="flex justify-between">
                <span>Subtotal dos Produtos</span>
                <span className="font-mono font-medium text-slate-900">
                  R$ {productsSubtotal.toFixed(2)}
                </span>
              </div>

              {installationTotal > 0 && (
                <div className="flex justify-between text-blue-900 font-semibold">
                  <span className="flex items-center gap-1">
                    <Wrench className="w-3 h-3" /> Mão de Obra na Oficina
                  </span>
                  <span className="font-mono">+R$ {installationTotal.toFixed(2)}</span>
                </div>
              )}

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Desconto Cupom</span>
                  <span className="font-mono">-R$ {discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3" /> Frete Brasil
                </span>
                <span className="font-mono font-medium">
                  {shippingCost === 0 ? (
                    <strong className="text-emerald-600 font-bold">Grátis</strong>
                  ) : (
                    `R$ ${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm font-extrabold text-slate-950 pt-2 border-t border-slate-200">
                <span>Total</span>
                <span className="font-mono">R$ {grandTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-xs text-emerald-700 font-bold bg-emerald-50/90 p-2 rounded border border-emerald-200">
                <span>Total no PIX (10% OFF):</span>
                <span className="font-mono text-sm">R$ {pixTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Primary Checkout Button */}
            <button
              onClick={onProceedToCheckout}
              className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold py-3 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-md active:scale-95"
            >
              <span>Finalizar Compra / Agendar</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Garantia de 2 anos em peças e instalação</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
