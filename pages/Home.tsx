
import React from 'react';
import { Page, Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';

interface HomeProps {
  onNavigate: (page: Page, id?: string) => void;
  onAddToCart: (product: Product) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, onAddToCart }) => {
  const featured = MOCK_PRODUCTS[1]; // Mechanical Dragon
  const trending = MOCK_PRODUCTS;

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative px-4 py-16 lg:py-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Nueva Colección Disponible
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Llevá tus impresiones 3D al <span className="text-primary">siguiente nivel</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg">
              Archivos STL verificados listos para laminar e imprimir de inmediato. Activos digitales de alta calidad para tu próximo proyecto.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => onNavigate(Page.SHOP)}
                className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-all"
              >
                Ver Catálogo
              </button>
              <button 
                onClick={() => onNavigate(Page.SHOP)}
                className="px-8 py-3 bg-white dark:bg-surface-dark border border-slate-200 dark:border-surface-border text-slate-900 dark:text-white rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                Ver Categorías
              </button>
            </div>
            <div className="flex items-center gap-6 pt-4 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-lg">verified</span>
                Descarga Instantánea
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-lg">currency_exchange</span>
                Precios en ARS
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 dark:border-surface-border shadow-2xl bg-slate-100 dark:bg-surface-dark">
              <img src={featured.image} alt={featured.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md p-4 rounded-xl border border-slate-200 dark:border-surface-border flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{featured.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Por {featured.author} • {featured.polygons} polígonos</p>
                </div>
                <span className="text-primary font-bold">${featured.price.toLocaleString('es-AR')} ARS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="bg-slate-50 dark:bg-surface-darker py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold">Categorías Destacadas</h2>
            <button onClick={() => onNavigate(Page.SHOP)} className="text-primary font-medium hover:underline flex items-center gap-1">
              Ver Todo <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Articulados', 'Decoración', 'Herramientas'].map((cat, i) => (
              <div key={cat} className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer">
                <img src={`https://picsum.photos/seed/stl-${i}/800/450`} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" alt={cat} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white">{cat}</h3>
                  <p className="text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition duration-300">Explorar archivos STL</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Items */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined">trending_up</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold">Impresiones en Tendencia</h2>
            <p className="text-slate-500 dark:text-slate-400">Lo más descargado por la comunidad esta semana</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onNavigate={(id) => onNavigate(Page.PRODUCT, id)}
              onAddToCart={() => onAddToCart(product)}
            />
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y border-slate-200 dark:border-surface-border bg-slate-50 dark:bg-surface-darker py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">verified_user</span>
            </div>
            <div>
              <h4 className="font-bold mb-1">Integridad STL Verificada</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">Cada archivo es probado para asegurar geometría manifold e imprimibilidad.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">bolt</span>
            </div>
            <div>
              <h4 className="font-bold mb-1">Descarga Instantánea</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">Acceso inmediato a tus archivos después de la compra.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">lock</span>
            </div>
            <div>
              <h4 className="font-bold mb-1">Pagos Seguros</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">Transacciones encriptadas vía pasarelas de pago locales confiables.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
