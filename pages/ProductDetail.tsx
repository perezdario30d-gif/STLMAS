
import React from 'react';
import { Page, Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onNavigate: (page: Page) => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onNavigate, onAddToCart }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm font-medium text-slate-500">
        <ol className="flex items-center gap-2">
          <li><button onClick={() => onNavigate(Page.HOME)} className="hover:text-primary">Inicio</button></li>
          <li><span className="material-symbols-outlined text-base">chevron_right</span></li>
          <li><button onClick={() => onNavigate(Page.SHOP)} className="hover:text-primary">Tienda</button></li>
          <li><span className="material-symbols-outlined text-base">chevron_right</span></li>
          <li className="text-primary font-bold">{product.name}</li>
        </ol>
      </nav>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 dark:border-surface-border shadow-xl bg-slate-100 dark:bg-surface-dark group relative">
            <img src={product.image} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" alt={product.name} />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase flex items-center gap-1 border border-white/10">
              <span className="material-symbols-outlined text-sm">3d_rotation</span>
              Vista Interactiva
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`aspect-video rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${i === 1 ? 'border-primary' : 'border-transparent hover:border-slate-400 opacity-60 hover:opacity-100'}`}>
                <img src={`https://picsum.photos/seed/stl-${product.id}-${i}/400/300`} className="w-full h-full object-cover" alt="Preview" />
              </div>
            ))}
          </div>
          
          <div className="mt-8 space-y-4">
            <h3 className="text-2xl font-bold">Descripción</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {product.description} Este archivo STL de alta fidelidad está optimizado para impresión FDM y viene pre-dividido para un fácil ensamblaje. El diseño cuenta con placas faciales modulares y ranuras designadas para la integración de LED.
            </p>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-primary/10 text-primary border border-primary/20 uppercase tracking-wide">
                Descarga Digital Instantánea
              </span>
              <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
                <span className="material-symbols-outlined text-sm fill-1">star</span>
                {product.rating || 5.0}
              </div>
            </div>
            <h1 className="text-4xl font-bold leading-tight">{product.name}</h1>
            <p className="text-slate-500">Por <button className="text-primary hover:underline">{product.author}</button> • Lanzado Nov 2023</p>
          </div>

          <div className="p-6 bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-surface-border shadow-xl">
            <div className="flex items-end justify-between mb-6">
              <div>
                <span className="text-3xl font-bold text-primary">${product.price.toLocaleString('es-AR')}</span>
                <span className="text-slate-400 text-sm ml-2">ARS</span>
                <p className="text-xs text-slate-500 mt-1">IVA incluido</p>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-surface-border flex items-center justify-center hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">favorite</span>
                </button>
                <button className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-surface-border flex items-center justify-center hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">share</span>
                </button>
              </div>
            </div>

            <button 
              onClick={() => {
                onAddToCart(product);
                onNavigate(Page.CHECKOUT);
              }}
              className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              Comprar Ahora
            </button>
            <p className="text-center text-xs text-orange-500 flex items-center justify-center gap-1 mt-4">
              <span className="material-symbols-outlined text-sm">info</span>
              Solo archivo digital. No se envía ningún artículo físico.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-slate-50 dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-surface-border">
              <p className="text-xs text-slate-500 mb-1">Formato</p>
              <p className="font-bold font-mono text-sm">{product.format}</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-surface-border">
              <p className="text-xs text-slate-500 mb-1">Tamaño</p>
              <p className="font-bold font-mono text-sm">{product.size}</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-surface-border">
              <p className="text-xs text-slate-500 mb-1">Polígonos</p>
              <p className="font-bold font-mono text-sm">{product.polygons || 'N/A'}</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-surface-border">
              <p className="text-xs text-slate-500 mb-1">Escala</p>
              <p className="font-bold font-mono text-sm">1:1 Real</p>
            </div>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-surface-dark/50 rounded-2xl border border-slate-200 dark:border-surface-border space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm">settings</span>
              Especificaciones Técnicas
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Volumen de Impresión</span><span className="font-medium">220x220x250 mm</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Altura de Capa</span><span className="font-medium">0.16 - 0.2 mm</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Material</span><span className="font-medium">PLA / PETG</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
