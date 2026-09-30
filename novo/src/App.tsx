import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { VehicleSelector } from './components/VehicleSelector';
import { CategoryPills } from './components/CategoryPills';
import { TrustBar } from './components/TrustBar';
import { ProductGrid } from './components/ProductGrid';
import { ServicesSection } from './components/ServicesSection';
import { SmartFlowInspection } from './components/SmartFlowInspection';
import { ReviewsSection } from './components/ReviewsSection';
import { WorkshopInfo } from './components/WorkshopInfo';
import { Footer } from './components/Footer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { BookingModal } from './components/BookingModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LoginModal } from './components/LoginModal';

import { PRODUCTS } from './data/mockData';
import { Product, Vehicle, CartItem } from './types';

export default function App() {
  // Vehicle Garage State
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>({
    id: 'Volkswagen-Golf-2021',
    make: 'Volkswagen',
    model: 'Golf',
    year: 2021,
    engine: '1.4 TSI 150cv',
  });

  // Shopping Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Pneu Pirelli Cinturato P7
      quantity: 2,
      includeInstallation: true,
    },
  ]);

  // Catalog & Navigation State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [userName, setUserName] = useState<string | null>(null);

  // Modals and Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>(undefined);
  const [bookingProduct, setBookingProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Cart Calculations
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => {
    const install = item.includeInstallation ? (item.product.installPrice || 0) : 0;
    return acc + (item.product.price + install) * item.quantity;
  }, 0);

  // Cart Operations
  const handleAddToCart = (product: Product, includeInstallation: boolean = false) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1, includeInstallation: includeInstallation || item.includeInstallation }
            : item
        );
      }
      return [...prev, { product, quantity: 1, includeInstallation }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleToggleInstallation = (productId: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, includeInstallation: !item.includeInstallation }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Service Booking Triggers
  const handleOpenBooking = (serviceId?: string, product?: Product | null) => {
    setBookingServiceId(serviceId);
    setBookingProduct(product || null);
    setIsBookingOpen(true);
  };

  // Scroll Helpers
  const scrollToServices = () => {
    const el = document.getElementById('servicos');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSmartFlow = () => {
    const el = document.getElementById('alinhamento-digital');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    scrollToCatalog();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900">
      
      {/* 1. Top Bar */}
      <TopBar onOpenBooking={() => handleOpenBooking()} />

      {/* 2. Main Header */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenVehicleModal={() => setSelectedVehicle(null)}
        onOpenBooking={() => handleOpenBooking()}
        selectedVehicle={selectedVehicle}
        onClearVehicle={() => setSelectedVehicle(null)}
        products={PRODUCTS}
        onSelectProduct={(p) => setQuickViewProduct(p)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
        isMobileNavOpen={isMobileNavOpen}
      />

      {/* 3. Navigation Bar */}
      <Navbar
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        onScrollToServices={scrollToServices}
        onScrollToSmartFlow={scrollToSmartFlow}
        isMobileNavOpen={isMobileNavOpen}
        onCloseMobileNav={() => setIsMobileNavOpen(false)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Page Body Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        
        {/* 4. Hero Carousel Banner */}
        <HeroCarousel
          onOpenBooking={() => handleOpenBooking()}
          onSelectCategory={handleSelectCategory}
          onScrollToSmartFlow={scrollToSmartFlow}
        />

        {/* 5. 'Compre por Veículo' Garage Widget */}
        <VehicleSelector
          selectedVehicle={selectedVehicle}
          onSelectVehicle={(veh) => setSelectedVehicle(veh)}
          onClearVehicle={() => setSelectedVehicle(null)}
        />

        {/* 6. Quick Category Discovery Icons */}
        <CategoryPills
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          onScrollToServices={scrollToServices}
        />

        {/* 7. Trust Pillars Strip */}
        <TrustBar />

        {/* 8. Filterable & Sortable Product Grid */}
        <ProductGrid
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedVehicle={selectedVehicle}
          searchTerm={searchTerm}
          onAddToCart={handleAddToCart}
          onOpenQuickView={(p) => setQuickViewProduct(p)}
          onOpenBookingWithProduct={(p) => handleOpenBooking(undefined, p)}
        />

        {/* 9. World Auto Center Specialized Services & Repair Section */}
        <ServicesSection
          onOpenBooking={(sId) => handleOpenBooking(sId)}
          onScrollToSmartFlow={scrollToSmartFlow}
        />

        {/* 10. Alinhamento e Balanceamento com Inspeção Digital */}
        <SmartFlowInspection
          onOpenBooking={() => handleOpenBooking('serv-alinhamento')}
        />

        {/* 11. Customer Reviews & 4.9★ Social Proof */}
        <ReviewsSection />

        {/* 12. Physical Auto Center Location, Lounge & ASE Credentials */}
        <WorkshopInfo
          onOpenBooking={() => handleOpenBooking()}
        />

      </main>

      {/* 13. Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onScrollToServices={scrollToServices}
        onScrollToSmartFlow={scrollToSmartFlow}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* --- Interactive Modals & Drawers --- */}

      {/* Product Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenBookingWithProduct={(p) => handleOpenBooking(undefined, p)}
        selectedVehicle={selectedVehicle}
      />

      {/* Service & Installation Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setBookingProduct(null);
          setBookingServiceId(undefined);
        }}
        initialServiceId={bookingServiceId}
        initialProduct={bookingProduct}
        selectedVehicle={selectedVehicle}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onToggleInstallation={handleToggleInstallation}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onClearCart={handleClearCart}
      />

      {/* Login / Profile Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        userName={userName}
        onSetUserName={setUserName}
      />

    </div>
  );
}
