
export interface Product {
  id: string;
  name: string;
  author: string;
  price: number;
  currency: string;
  format: string;
  size: string;
  image: string;
  description: string;
  category: string;
  rating?: number;
  reviewsCount?: number;
  polygons?: string;
  isFree?: boolean;
  stockType?: 'unlimited' | 'limited';
  stockCount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum Page {
  HOME = 'home',
  SHOP = 'shop',
  PRODUCT = 'product',
  CHECKOUT = 'checkout',
  DASHBOARD = 'dashboard',
  TERMS = 'terms',
  SELL = 'sell'
}
