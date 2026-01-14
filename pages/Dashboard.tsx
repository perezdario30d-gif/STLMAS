
import React, { useState } from 'react';
import { Page, Product } from '../types';

interface DashboardProps {
  onNavigate: (page: Page) => void;
  purchasedItems: Product[];
  isCreator: boolean;
  onToggleCreator: (status: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, purchasedItems, isCreator, onToggleCreator }) => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Clave del creador
      onToggleCreator(true);
      setShowAdminLogin(false);
      setPassword('');
      setError('');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-12">
      {/* Modal Acceso Creador */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-surface-dark rounded-3xl p-8 max-w-sm w-full space-y-6 animate-in zoom-in-95">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Acceso Creador</h3>
              <button onClick={() => setShowAdminLogin(false)} className="material-symbols-outlined text-slate-400">close</button>
            </div>
            <p className="text-sm text-slate-500">Ingresa la clave maestra para habilitar las funciones de venta.</p>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <input 
                type="password" 
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border-slate-200 dark:border-surface-border bg-slate-50 dark:bg-surface-darker py-3 text-slate-900 dark:text-white"
                placeholder="Contraseña"
              />
              {error && <p className="text-xs text-red-500 font-bold">{error}</p>}
              <button type="submit" className="w-full py-3 bg-primary text-white rounded-xl font-bold">Habilitar Modo Creador</button>
            </form>
          </div>
        </div>
      )}

      <aside className="w-full md:w-64 space-y-6">
        <div className="p-6 bg-white dark:bg-surface-dark rounded-3xl border border-slate-200 dark:border-surface-border text-center">
          <div className="relative inline-block mb-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-4xl text-primary">person</span>
            </div>
            {isCreator && (
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center border-2 border-white dark:border-surface-dark">
                <span className="material-symbols-outlined text-[14px]">verified</span>
              </span>
            )}
          </div>
          <h2 className="font-bold">{isCreator ? 'Administrador STLMAS' : 'Maker Argentino'}</h2>
          <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mt-1">
            {isCreator ? 'Modo Creador Activo' : 'Nivel: Avanzado'}
          </p>
        </div>
        
        <nav className="flex flex-col gap-1">
          <button className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-primary text-white font-bold text-sm">
            <span className="material-symbols-outlined">download</span> Mis Descargas
          </button>
          
          {isCreator && (
            <button 
              onClick={() => onNavigate(Page.SELL)}
              className="flex items-center gap-3 px-6 py-4 rounded-2xl text-primary bg-primary/10 font-bold text-sm hover:bg-primary/20 transition-all"
            >
              <span className="material-symbols-outlined">upload_file</span> Subir Nuevo Archivo
            </button>
          )}

          <button className="flex items-center gap-3 px-6 py-4 rounded-2xl text-slate-500 hover:bg-slate-100 dark:hover:bg-surface-dark font-medium text-sm transition-colors">
            <span className="material-symbols-outlined">favorite</span> Favoritos
          </button>

          {!isCreator ? (
            <button 
              onClick={() => setShowAdminLogin(true)}
              className="flex items-center gap-3 px-6 py-4 rounded-2xl text-slate-400 hover:text-primary font-medium text-sm transition-colors mt-4 border border-dashed border-slate-200 dark:border-surface-border"
            >
              <span className="material-symbols-outlined text-[18px]">lock</span> Acceso Creador
            </button>
          ) : (
            <div className="mt-4 p-4 bg-primary/5 rounded-2xl border border-primary/20">
              <p className="text-[10px] font-black uppercase text-primary mb-2 tracking-widest">Estado del Sitio</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  SERVIDOR: ONLINE
                </li>
                <li className="flex items-center gap-2 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  PAGOS ARS: ACTIVOS
                </li>
                <li className="flex items-center gap-2 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  SSL: PROTEGIDO
                </li>
              </ul>
              <button 
                onClick={() => onToggleCreator(false)}
                className="w-full mt-4 py-2 text-[10px] font-black uppercase tracking-widest text-orange-500 border border-orange-500/20 rounded-lg hover:bg-orange-500/10 transition-colors"
              >
                Cerrar Sesión Admin
              </button>
            </div>
          )}

          <button onClick={() => { onToggleCreator(false); onNavigate(Page.HOME); }} className="flex items-center gap-3 px-6 py-4 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 font-medium text-sm transition-colors mt-8">
            <span className="material-symbols-outlined">logout</span> Salir
          </button>
        </nav>
      </aside>

      <div className="flex-1 space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black">Biblioteca de Archivos</h1>
            <p className="text-slate-500 mt-2">Acceso ilimitado a tus archivos STL de por vida.</p>
          </div>
          {isCreator && (
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Balance Ventas</p>
              <p className="text-2xl font-black text-primary">$142.500</p>
            </div>
          )}
        </div>

        {purchasedItems.length === 0 ? (
          <div className="bg-slate-50 dark:bg-surface-dark rounded-3xl border-2 border-dashed border-slate-200 dark:border-surface-border p-20 text-center space-y-4">
            <span className="material-symbols-outlined text-6xl text-slate-300">folder_open</span>
            <h3 className="text-xl font-bold">Aún no tienes archivos</h3>
            <p className="text-slate-500 max-w-xs mx-auto">Compra tu primer modelo STL para verlo disponible aquí.</p>
            <button onClick={() => onNavigate(Page.SHOP)} className="px-8 py-3 bg-primary text-white rounded-xl font-bold">Explorar Tienda</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchasedItems.map((p, i) => (
              <div key={`${p.id}-${i}`} className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-surface-border rounded-3xl overflow-hidden group hover:border-primary transition-all">
                <div className="aspect-square relative">
                  <img src={p.image} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all backdrop-blur-[2px]">
                    <button className="bg-white text-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-2xl">
                      <span className="material-symbols-outlined">download</span> Descargar STL
                    </button>
                  </div>
                </div>
                <div className="p-5 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-sm truncate">{p.name}</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">{p.format} • {p.size}</p>
                  </div>
                  <span className="material-symbols-outlined text-green-500">verified</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
