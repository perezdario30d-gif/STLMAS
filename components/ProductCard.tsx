
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onNavigate: (id: string) => void;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate, onAddToCart }) => {
  return (
    <div className="group flex flex-col bg-white dark:bg-surface-dark border border-slate-200 dark:border-surface-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-surface-darker cursor-pointer" onClick={() => onNavigate(product.id)}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-primary backdrop-blur-sm transition-colors">
          <span className="material-symbols-outlined text-sm">favorite</span>
        </button>
        {product.isFree && (
          <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-green-500 text-white text-[10px] font-bold uppercase">
            Gratis
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 
          className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1 cursor-pointer"
          onClick={() => onNavigate(product.id)}
        >
          {product.name}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">Por {product.author}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold text-lg">
            {product.isFree ? '$0' : `$${product.price.toLocaleString('es-AR')}`}
          </span>
          <button 
            onClick={onAddToCart}
            className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-surface-border text-slate-600 dark:text-white flex items-center justify-center hover:bg-primary hover:text-white transition-all"
          >
            <span className="material-symbols-outlined text-lg">{product.isFree ? 'download' : 'add_shopping_cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
