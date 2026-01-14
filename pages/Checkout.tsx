
import React, { useState } from 'react';
import { Page, CartItem } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  onNavigate: (page: Page) => void;
  onComplete: () => void;
  onRemove: (id: string) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, onNavigate, onComplete, onRemove }) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mp' | 'transfer'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  // DATOS DE TU CBU (Cámbialos aquí)
  const MY_BANK_DATA = {
    titular: "TU NOMBRE COMPLETO",
    cbu: "0000003100012345678901",
    alias: "TU.ALIAS.BANCARIO",
    banco: "Mercado Pago / Brubank / Santander"
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const taxes = subtotal * 0.21;
  const total = subtotal + taxes;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 2500);
  };

  const copyCbu = () => {
    navigator.clipboard.writeText(MY_BANK_DATA.cbu);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center space-y-6">
        <div className="w-20 h-20 bg-slate-100 dark:bg-surface-dark rounded-full flex items-center justify-center mx-auto text-slate-400">
          <span className="material-symbols-outlined text-4xl">shopping_cart</span>
        </div>
        <h2 className="text-2xl font-bold">Tu carrito está vacío</h2>
        <p className="text-slate-500">Explora nuestra tienda para encontrar archivos STL increíbles.</p>
        <button onClick={() => onNavigate(Page.SHOP)} className="px-8 py-3 bg-primary text-white rounded-xl font-bold">Ir a la Tienda</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {isProcessing && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-surface-dark rounded-3xl p-8 max-w-sm w-full text-center space-y-6 animate-in zoom-in-95">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h3 className="text-xl font-bold">{paymentMethod === 'transfer' ? 'Confirmando Operación' : 'Procesando Pago'}</h3>
            <p className="text-slate-500 text-sm">Por favor, espera unos instantes...</p>
          </div>
        </div>
      )}

      <div className="mb-10">
        <h1 className="text-4xl font-black">Finalizar Compra</h1>
        <p className="text-slate-500 mt-2">Completa tu pedido para liberar la descarga de tus archivos.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-10">
          {/* Datos del Comprador */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-surface-border">
              <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">1</span>
              Email de Entrega
            </h2>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-500">¿A dónde enviamos los links de descarga?</label>
              <input type="email" required className="w-full rounded-xl border-slate-200 dark:border-surface-border bg-white dark:bg-surface-dark py-3" placeholder="ejemplo@email.com" />
              <p className="text-[10px] text-slate-400 font-medium italic">Asegúrate de que el email sea correcto, recibirás el archivo ahí automáticamente.</p>
            </div>
          </section>

          {/* Medios de Pago */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-surface-border">
              <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">2</span>
              Selecciona Medio de Pago
            </h2>
            
            <div className="space-y-4">
              {/* Opción Transferencia - TU CBU */}
              <label 
                className={`flex flex-col p-5 rounded-2xl border-2 transition-all cursor-pointer ${paymentMethod === 'transfer' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-surface-border'}`}
                onClick={() => setPaymentMethod('transfer')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" checked={paymentMethod === 'transfer'} readOnly className="text-primary" />
                    <div>
                      <p className="font-bold">Transferencia Bancaria (CBU)</p>
                      <p className="text-xs text-slate-500 font-medium">Acreditación inmediata • Sin comisiones extras</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-primary">account_balance</span>
                </div>
                
                {paymentMethod === 'transfer' && (
                  <div className="mt-6 p-6 bg-white dark:bg-surface-dark rounded-xl border border-primary/20 space-y-4 animate-in fade-in slide-in-from-top-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Titular</p>
                        <p className="font-bold text-sm">{MY_BANK_DATA.titular}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Banco</p>
                        <p className="font-bold text-sm">{MY_BANK_DATA.banco}</p>
                      </div>
                    </div>
                    <div className="relative p-4 bg-slate-50 dark:bg-surface-darker rounded-lg border border-slate-100 dark:border-surface-border group">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">CBU para transferir</p>
                      <p className="font-mono font-bold text-primary select-all">{MY_BANK_DATA.cbu}</p>
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); copyCbu(); }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-3 py-1.5 bg-primary text-white text-[10px] font-black rounded-md hover:bg-primary-hover transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">{copied ? 'check' : 'content_copy'}</span>
                        {copied ? 'COPIADO' : 'COPIAR'}
                      </button>
                    </div>
                    <div className="flex justify-between items-center py-2 px-1">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Alias</p>
                        <p className="font-bold text-sm">{MY_BANK_DATA.alias}</p>
                      </div>
                    </div>
                    <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                      <p className="text-[11px] text-orange-600 dark:text-orange-400 leading-tight">
                        <strong>Nota:</strong> Realiza la transferencia por el total exacto. Una vez confirmada, los links se enviarán a tu email.
                      </p>
                    </div>
                  </div>
                )}
              </label>

              {/* Opción Tarjeta */}
              <label 
                className={`flex flex-col p-5 rounded-2xl border-2 transition-all cursor-pointer ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-surface-border'}`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" checked={paymentMethod === 'card'} readOnly className="text-primary" />
                    <div>
                      <p className="font-bold">Tarjeta de Crédito / Débito</p>
                      <p className="text-xs text-slate-500 font-medium">Visa, Mastercard, American Express</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="Mastercard" />
                  </div>
                </div>
              </label>

              {/* Mercado Pago */}
              <label 
                className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer ${paymentMethod === 'mp' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-surface-border'}`}
                onClick={() => setPaymentMethod('mp')}
              >
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" checked={paymentMethod === 'mp'} readOnly className="text-primary" />
                  <div>
                    <p className="font-bold">Mercado Pago</p>
                    <p className="text-xs text-slate-500 font-medium">Dinero en cuenta o tarjetas</p>
                  </div>
                </div>
                <img src="https://logotyp.us/files/mercado-pago.svg" className="h-5" alt="MP" />
              </label>
            </div>
          </section>
        </div>

        {/* Resumen Sidebar */}
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-surface-dark rounded-3xl border border-slate-200 dark:border-surface-border p-6 shadow-xl sticky top-24">
            <h3 className="text-lg font-bold mb-6">Resumen del Pedido</h3>
            <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 items-center group">
                  <img src={item.image} className="w-12 h-12 rounded-lg object-cover bg-slate-100" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{item.name}</p>
                    <p className="text-xs text-slate-500">${item.price.toLocaleString('es-AR')}</p>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-surface-border">
              <div className="flex justify-between text-sm text-slate-500"><span>Subtotal</span><span>${subtotal.toLocaleString('es-AR')}</span></div>
              <div className="flex justify-between text-sm text-slate-500"><span>Costo de Operación (Gratis)</span><span>$0</span></div>
              <div className="flex justify-between items-end pt-4">
                <span className="font-bold">Total a Pagar</span>
                <span className="text-2xl font-black text-primary">${total.toLocaleString('es-AR')}</span>
              </div>
            </div>

            <button 
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full mt-8 py-5 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary-hover shadow-xl shadow-primary/20 transition-all disabled:opacity-50 flex flex-col items-center justify-center leading-tight"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">{paymentMethod === 'transfer' ? 'account_balance' : 'lock'}</span>
                {paymentMethod === 'transfer' ? 'Confirmar Transferencia' : 'Pagar Ahora'}
              </div>
              <span className="text-[10px] font-medium opacity-80 mt-1 uppercase tracking-widest">Descarga inmediata tras validación</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
