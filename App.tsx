
import React, { useState, useEffect } from 'react';
import { Page, Product, CartItem } from './types';
import { MOCK_PRODUCTS } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import Terms from './pages/Terms';
import Sell from './pages/Sell';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreator, setIsCreator] = useState(() => {
    return localStorage.getItem('stlmas_is_creator') === 'true';
  });
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('stlmas_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [purchasedProducts, setPurchasedProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('stlmas_purchased');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    localStorage.setItem('stlmas_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('stlmas_purchased', JSON.stringify(purchasedProducts));
  }, [purchasedProducts]);

  useEffect(() => {
    localStorage.setItem('stlmas_is_creator', isCreator.toString());
  }, [isCreator]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navigateTo = (page: Page, productId?: string) => {
    setCurrentPage(page);
    if (productId) setSelectedProductId(productId);
    window.scrollTo(0, 0);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() !== '' && currentPage !== Page.SHOP) {
      setCurrentPage(Page.SHOP);
    }
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev;
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const completePurchase = () => {
    setPurchasedProducts(prev => [...prev, ...cart]);
    setCart([]);
    navigateTo(Page.DASHBOARD);
  };

  const toggleCreatorMode = (status: boolean) => {
    setIsCreator(status);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <Home onNavigate={navigateTo} onAddToCart={addToCart} />;
      case Page.SHOP:
        return <Shop onNavigate={navigateTo} onAddToCart={addToCart} searchTerm={searchTerm} />;
      case Page.PRODUCT:
        const product = MOCK_PRODUCTS.find(p => p.id === selectedProductId) || MOCK_PRODUCTS[0];
        return <ProductDetail product={product} onNavigate={navigateTo} onAddToCart={addToCart} />;
      case Page.CHECKOUT:
        return <Checkout cart={cart} onNavigate={navigateTo} onComplete={completePurchase} onRemove={removeFromCart} />;
      case Page.DASHBOARD:
        return <Dashboard onNavigate={navigateTo} purchasedItems={purchasedProducts} isCreator={isCreator} onToggleCreator={toggleCreatorMode} />;
      case Page.TERMS:
        return <Terms onNavigate={navigateTo} />;
      case Page.SELL:
        return isCreator ? <Sell onNavigate={navigateTo} /> : <Home onNavigate={navigateTo} onAddToCart={addToCart} />;
      default:
        return <Home onNavigate={navigateTo} onAddToCart={addToCart} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-body bg-background-light dark:bg-background-dark text-slate-900 dark:text-white transition-colors duration-200">
      <Header 
        currentPage={currentPage}
        onNavigate={navigateTo} 
        cartCount={cart.length}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        searchTerm={searchTerm}
        onSearch={handleSearch}
        isCreator={isCreator}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={navigateTo} isCreator={isCreator} />
    </div>
  );
};

export default App;
