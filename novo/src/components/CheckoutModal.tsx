import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  QrCode, 
  CreditCard, 
  Barcode, 
  Copy, 
  Check, 
  Truck, 
  Wrench, 
  ShieldCheck 
} from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | 'boleto'>('pix');
  const [deliveryOption, setDeliveryOption] = useState<'delivery' | 'pickup'>('delivery');
  const [copiedPix, setCopiedPix] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Calculations
  const productsSubtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const installationTotal = items.reduce((sum, item) => {
    if (item.includeInstallation) {
      return sum + (item.product.installPrice || 0) * item.quantity;
    }
    return sum;
  }, 0);
  const total = productsSubtotal + installationTotal;
  const pixPrice = total * 0.9;

  const fakePixCode = "00020126580014br.gov.bcb.pix0136e92b-world-auto-center-84925204000053039865404" + pixPrice.toFixed(2) + "5802BR5925WORLD AUTO CENTER LTDA6009SAO PAULO62070503***6304C2D1";

  const handleCopyPix = () => {
    navigator.clipboard?.writeText(fakePixCode);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleFinishOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = `PED-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(orderId);
    setIsCompleted(true);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-base font-bold font-display">Checkout Seguro · World Auto Center</h2>
              <p className="text-xs text-slate-300">Ambiente Criptografado SSL 256 bits</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isCompleted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="inline-block bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
              {orderNumber}
            </span>

            <h3 className="text-xl font-black text-slate-900 font-display">
              Pedido Confirmado com Sucesso!
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Obrigado por comprar na <strong>World Auto Center</strong>! Enviamos a confirmação detalhada para o seu e-mail e as atualizações de rastreio e montagem serão notificadas via WhatsApp.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-left max-w-md mx-auto space-y-2">
              <div className="flex justify-between font-semibold text-slate-800">
                <span>Forma de Pagamento:</span>
                <span className="uppercase text-red-600 font-bold">{paymentMethod}</span>
              </div>
              <div className="flex justify-between font-semibold text-slate-800">
                <span>Modalidade:</span>
                <span>{deliveryOption === 'delivery' ? 'Entrega em Domicílio' : 'Retirada e Montagem no Auto Center'}</span>
              </div>
              <div className="flex justify-between font-semibold text-slate-800 pt-2 border-t border-slate-200">
                <span>Valor Final:</span>
                <span className="font-mono font-bold text-slate-950">
                  R$ {(paymentMethod === 'pix' ? pixPrice : total).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition-colors"
            >
              Voltar à Loja
            </button>
          </div>
        ) : (
          <form onSubmit={handleFinishOrder} className="p-6 space-y-5">
            
            {/* Delivery or Workshop Pickup choice */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase mb-2">
                Como deseja receber suas peças?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryOption('delivery')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    deliveryOption === 'delivery'
                      ? 'border-red-600 bg-red-50/60 text-red-950 font-bold'
                      : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Truck className="w-4 h-4 text-red-600" />
                    <span>Entrega Expressa</span>
                  </div>
                  <span className="text-[11px] font-normal text-slate-500">
                    Direto no seu endereço em até 48h
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryOption('pickup')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    deliveryOption === 'pickup'
                      ? 'border-blue-600 bg-blue-50/60 text-blue-950 font-bold'
                      : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Wrench className="w-4 h-4 text-blue-600" />
                    <span>Retirada / Instalação no Auto Center</span>
                  </div>
                  <span className="text-[11px] font-normal text-slate-500">
                    Box exclusivo World Auto Center
                  </span>
                </button>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase mb-2">
                Forma de Pagamento
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`py-2 px-3 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'pix'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-emerald-600" />
                  <span>PIX (-10%)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2 px-3 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-blue-50 border-blue-500 text-blue-950 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span>Cartão (10x)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('boleto')}
                  className={`py-2 px-3 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'boleto'
                      ? 'bg-slate-200 border-slate-700 text-slate-900 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <Barcode className="w-4 h-4 text-slate-600" />
                  <span>Boleto</span>
                </button>
              </div>
            </div>

            {/* PIX QR Code details */}
            {paymentMethod === 'pix' && (
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 text-center space-y-3">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Desconto de 10% Aplicado: R$ {pixPrice.toFixed(2)}</span>
                </div>

                <div className="w-36 h-36 mx-auto bg-white p-2 rounded-lg border border-emerald-200 shadow-xs flex flex-col items-center justify-center">
                  <QrCode className="w-28 h-28 text-slate-900" />
                  <span className="text-[9px] text-slate-400 font-mono">PIX QR Code</span>
                </div>

                <div className="flex gap-2 max-w-sm mx-auto">
                  <input
                    type="text"
                    readOnly
                    value={fakePixCode}
                    className="w-full bg-white border border-emerald-300 rounded px-2 py-1 text-[11px] text-slate-600 font-mono truncate"
                  />
                  <button
                    type="button"
                    onClick={handleCopyPix}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1 rounded text-xs transition-colors shrink-0 flex items-center gap-1"
                  >
                    {copiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPix ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Credit Card Details */}
            {paymentMethod === 'card' && (
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <input
                  type="text"
                  placeholder="Número do Cartão"
                  defaultValue="4532 •••• •••• 8821"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800"
                  required
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Validade (MM/AA)"
                    defaultValue="08/29"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800"
                    required
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    defaultValue="842"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Nome Impresso no Cartão"
                  defaultValue="CARLOS E MENDES"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800"
                  required
                />
                <select className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800">
                  <option>10x de R$ {(total / 10).toFixed(2)} sem juros</option>
                  <option>6x de R$ {(total / 6).toFixed(2)} sem juros</option>
                  <option>1x de R$ {total.toFixed(2)} à vista</option>
                </select>
              </div>
            )}

            {/* Customer Basic Info */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <input
                type="text"
                placeholder="Nome Completo"
                defaultValue="Carlos Eduardo Mendes"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800"
                required
              />
              <input
                type="tel"
                placeholder="WhatsApp para Notificações"
                defaultValue="(11) 98765-4321"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800"
                required
              />
            </div>

            {/* Confirm button */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold py-3 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-md active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirmar Pedido (R$ {(paymentMethod === 'pix' ? pixPrice : total).toFixed(2)})</span>
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
