
import React, { useState } from 'react';
import { Page, Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';

interface ShopProps {
  onNavigate: (page: Page, id?: string) => void;
  onAddToCart: (product: Product) => void;
  searchTerm?: string;
}

const Shop: React.FC<ShopProps> = ({ onNavigate, onAddToCart, searchTerm = '' }) => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const categories = ['Todos', 'Cosplay', 'Decoración', 'Figuras', 'Gratis', 'Herramientas'];

  const filtered = MOCK_PRODUCTS.filter(p => {
    const categoryMatch = activeCategory === 'Todos' || p.category === activeCategory;
    const searchMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black">
            {searchTerm ? `Resultados para "${searchTerm}"` : 'Catálogo Completo'}
          </h1>
          <p className="text-slate-500 mt-2">
            {searchTerm 
              ? `Encontramos ${filtered.length} archivos para tu búsqueda.`
              : 'Explora cientos de archivos STL verificados.'}
          </p>
        </div>
        <div className="flex gap-2 items-center text-sm font-bold text-slate-400">
          Ordernar por:
          <select className="bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white font-bold py-0 cursor-pointer">
            <option>Más Recientes</option>
            <option>Precio: Menor a Mayor</option>
            <option>Precio: Mayor a Menor</option>
            <option>Más Populares</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="w-full lg:w-48 space-y-8">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Categorías</h3>
            <div className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all text-left whitespace-nowrap lg:whitespace-normal ${activeCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-surface-dark hover:text-primary'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="hidden lg:block space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Rango de Precio</h3>
            <input type="range" className="w-full accent-primary" />
            <div className="flex justify-between text-xs font-bold text-slate-500">
              <span>$0</span>
              <span>$10k+</span>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map(p => (
                <ProductCard 
                  key={p.id} 
                  product={p} 
                  onNavigate={(id) => onNavigate(Page.PRODUCT, id)}
                  onAddToCart={() => onAddToCart(p)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 dark:bg-surface-dark rounded-3xl border border-dashed border-slate-200 dark:border-surface-border">
              <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">search_off</span>
              <h3 className="text-xl font-bold">No se encontraron resultados</h3>
              <p className="text-slate-500 mt-2">Prueba con términos menos específicos o cambia la categoría.</p>
              <button 
                onClick={() => {
                  setActiveCategory('Todos');
                }}
                className="mt-6 px-6 py-2 bg-primary text-white rounded-xl font-bold"
              >
                Ver todo el catálogo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
