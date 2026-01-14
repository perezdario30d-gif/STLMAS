
import React, { useState } from 'react';
import { Page } from '../types';

interface SellProps {
  onNavigate: (page: Page) => void;
}

const Sell: React.FC<SellProps> = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [stockType, setStockType] = useState<'unlimited' | 'limited'>('unlimited');

  const startUpload = () => {
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setStep(3);
        }, 1000);
      }
      setUploadProgress(progress);
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-black">Panel del Diseñador</h1>
        <p className="text-slate-500">Sube tus modelos y gestiona tu stock de archivos o piezas físicas.</p>
        
        <div className="flex items-center gap-2 pt-4">
          {[1, 2, 3].map(s => (
            <React.Fragment key={s}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= s ? 'bg-primary text-white shadow-lg' : 'bg-slate-100 dark:bg-surface-dark text-slate-400'}`}>
                {s}
              </div>
              {s < 3 && <div className={`h-1 w-12 rounded-full ${step > s ? 'bg-primary' : 'bg-slate-200 dark:border-surface-border'}`} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-surface-dark rounded-[32px] border border-slate-200 dark:border-surface-border p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-bold">1. Datos del Modelo</h2>
            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Nombre Comercial</label>
                <input type="text" className="w-full rounded-2xl border-slate-200 dark:border-surface-border bg-slate-50 dark:bg-surface-darker py-4" placeholder="Ej: Casco Samurai Oni V2" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Precio (ARS)</label>
                  <input type="number" className="w-full rounded-2xl border-slate-200 dark:border-surface-border bg-slate-50 dark:bg-surface-darker py-4" placeholder="2500" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Disponibilidad / Stock</label>
                  <select 
                    value={stockType}
                    onChange={(e) => setStockType(e.target.value as 'unlimited' | 'limited')}
                    className="w-full rounded-2xl border-slate-200 dark:border-surface-border bg-slate-50 dark:bg-surface-darker py-4"
                  >
                    <option value="unlimited">Archivo Digital Ilimitado</option>
                    <option value="limited">Unidades Limitadas (Stock)</option>
                  </select>
                </div>
              </div>

              {stockType === 'limited' && (
                <div className="space-y-2 animate-in slide-in-from-top-2">
                  <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Cantidad de unidades disponibles</label>
                  <input type="number" className="w-full rounded-2xl border-slate-200 dark:border-surface-border bg-slate-50 dark:bg-surface-darker py-4" placeholder="Ej: 50" />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Categoría</label>
                  <select className="w-full rounded-2xl border-slate-200 dark:border-surface-border bg-slate-50 dark:bg-surface-darker py-4">
                    <option>Cosplay</option>
                    <option>Figuras</option>
                    <option>Decoración</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Formato</label>
                  <input type="text" className="w-full rounded-2xl border-slate-200 dark:border-surface-border bg-slate-50 dark:bg-surface-darker py-4" placeholder=".STL, .OBJ" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Descripción</label>
                <textarea className="w-full rounded-2xl border-slate-200 dark:border-surface-border bg-slate-50 dark:bg-surface-darker py-4 h-32" placeholder="Detalla escala, material recomendado, soportes..."></textarea>
              </div>
            </div>
            <button onClick={() => setStep(2)} className="w-full py-5 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary-hover shadow-xl shadow-primary/20 transition-all">Siguiente Paso</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-bold">2. Subir Archivos STL</h2>
            
            {isUploading ? (
              <div className="py-20 text-center space-y-6 animate-pulse">
                <div className="w-full bg-slate-100 dark:bg-surface-darker h-4 rounded-full overflow-hidden">
                  <div className="bg-primary h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                </div>
                <p className="font-bold">Subiendo Archivos... {Math.round(uploadProgress)}%</p>
                <p className="text-sm text-slate-500">Analizando geometría y verificando que el modelo sea Manifold.</p>
              </div>
            ) : (
              <div className="grid gap-8">
                <div 
                  onClick={startUpload}
                  className="p-16 border-2 border-dashed border-slate-200 dark:border-surface-border rounded-3xl flex flex-col items-center justify-center space-y-4 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-5xl">upload_file</span>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-xl">Selecciona el archivo .ZIP</p>
                    <p className="text-sm text-slate-500 mt-1">Incluye el STL, fotos del render y fotos impreso.</p>
                  </div>
                </div>
              </div>
            )}
            
            {!isUploading && (
              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-5 bg-slate-100 dark:bg-surface-darker rounded-2xl font-bold text-slate-500">Atrás</button>
                <button onClick={startUpload} className="flex-[2] py-5 bg-primary text-white rounded-2xl font-bold text-lg">Publicar Ahora</button>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-10 space-y-8 animate-in zoom-in-95">
            <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto scale-in">
              <span className="material-symbols-outlined text-5xl">check_circle</span>
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-black">¡Publicación Exitosa!</h2>
              <p className="text-slate-500 max-w-sm mx-auto">Tu modelo {stockType === 'unlimited' ? 'digital' : 'con stock limitado'} ya está en la tienda.</p>
            </div>
            <div className="flex flex-col gap-3 pt-4">
              <button onClick={() => setStep(1)} className="w-full py-5 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20">Subir Otro Modelo</button>
              <button onClick={() => onNavigate(Page.DASHBOARD)} className="w-full py-5 bg-slate-100 dark:bg-surface-darker rounded-2xl font-bold text-slate-500">Ver Mis Ventas</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sell;
