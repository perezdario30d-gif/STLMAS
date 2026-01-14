
import React from 'react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
  isCreator: boolean;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, isCreator }) => {
  return (
    <footer className="bg-white dark:bg-surface-darker border-t border-slate-200 dark:border-surface-border py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <div className="w-6 h-6 text-primary">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
                </svg>
              </div>
              <span className="font-bold text-lg">STLMAS</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              El mercado principal de archivos imprimibles en 3D de alta calidad en Argentina. Empoderando a los makers capa a capa.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">Marketplace</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><button onClick={() => onNavigate(Page.SHOP)} className="hover:text-primary">Tienda</button></li>
              <li><button onClick={() => onNavigate(Page.SHOP)} className="hover:text-primary">Novedades</button></li>
              {isCreator && <li><button onClick={() => onNavigate(Page.SELL)} className="hover:text-primary font-bold text-primary">Subir Modelos (Admin)</button></li>}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><button onClick={() => onNavigate(Page.TERMS)} className="hover:text-primary">Términos y Condiciones</button></li>
              <li><button onClick={() => onNavigate(Page.TERMS)} className="hover:text-primary">Privacidad</button></li>
              <li><button onClick={() => onNavigate(Page.TERMS)} className="hover:text-primary">Licencias</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">Newsletter</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Recibe ofertas y archivos gratis.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-slate-100 dark:bg-surface-dark border-none rounded-lg text-sm flex-1 text-slate-900 dark:text-white" />
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold">Unirse</button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200 dark:border-surface-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2024 STLMAS. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Instagram</a>
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
