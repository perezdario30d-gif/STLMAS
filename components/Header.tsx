
import React from 'react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  cartCount: number;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  searchTerm: string;
  onSearch: (term: string) => void;
  isCreator: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  currentPage, 
  onNavigate, 
  cartCount, 
  isDarkMode, 
  onToggleTheme,
  searchTerm,
  onSearch,
  isCreator
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-surface-border bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button 
            onClick={() => {
              onSearch('');
              onNavigate(Page.HOME);
            }}
            className="flex items-center gap-2 group text-slate-900 dark:text-white"
          >
            <div className="w-8 h-8 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">STLMAS</span>
          </button>
          
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => {
                onSearch('');
                onNavigate(Page.SHOP);
              }} 
              className={`text-sm font-medium transition-colors ${currentPage === Page.SHOP && !searchTerm ? 'text-primary' : 'text-slate-500 dark:text-slate-400 hover:text-primary'}`}
            >
              Tienda
            </button>
            
            {/* Solo visible para el creador */}
            {isCreator && (
              <button 
                onClick={() => onNavigate(Page.SELL)}
                className={`text-sm font-bold transition-colors flex items-center gap-1.5 ${currentPage === Page.SELL ? 'text-primary' : 'text-slate-500 dark:text-slate-400 hover:text-primary'}`}
              >
                <span className="material-symbols-outlined text-sm">upload_file</span>
                Vender
              </button>
            )}
            
            <button 
              onClick={() => onNavigate(Page.TERMS)}
              className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
            >
              Ayuda
            </button>
          </nav>
        </div>

        <div className="flex-1 max-w-sm mx-4 hidden lg:block">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2 text-slate-400 text-lg">search</span>
            <input 
              type="text" 
              placeholder="Buscar archivos STL..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full bg-slate-100 dark:bg-surface-dark border-none rounded-lg py-2 pl-10 pr-10 text-sm focus:ring-2 focus:ring-primary text-slate-900 dark:text-white"
            />
            {searchTerm && (
              <button 
                onClick={() => onSearch('')}
                className="absolute right-3 top-2 text-slate-400 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={onToggleTheme}
            className="flex items-center gap-1.5 p-2 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-surface-dark"
          >
            <span className="material-symbols-outlined text-[20px]">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
            <span className="text-[11px] font-bold uppercase tracking-tight hidden sm:inline">
              {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
            </span>
          </button>

          <button 
            onClick={() => onNavigate(Page.DASHBOARD)}
            className={`flex items-center gap-1.5 p-2 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-surface-dark ${currentPage === Page.DASHBOARD ? 'text-primary' : 'text-slate-500 dark:text-slate-400'}`}
          >
            <span className="material-symbols-outlined text-[20px]">person</span>
            <span className="text-[11px] font-bold uppercase tracking-tight hidden sm:inline">Perfil</span>
          </button>

          <button 
            onClick={() => onNavigate(Page.CHECKOUT)}
            className="flex items-center gap-1.5 p-2 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-surface-dark relative"
          >
            <div className="relative">
              <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-primary text-[9px] font-black text-white flex items-center justify-center border-2 border-white dark:border-background-dark">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[11px] font-bold uppercase tracking-tight hidden sm:inline">Carrito</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
