import React, { useState, useMemo } from 'react';
import { Product, Vehicle } from '../types';
import { ProductCard } from './ProductCard';
import { Filter, SlidersHorizontal, ArrowUpDown, Check, RefreshCw } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedVehicle: Vehicle | null;
  searchTerm: string;
  onAddToCart: (product: Product, includeInstallation: boolean) => void;
  onOpenQuickView: (product: Product) => void;
  onOpenBookingWithProduct: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  selectedVehicle,
  searchTerm,
  onAddToCart,
  onOpenQuickView,
  onOpenBookingWithProduct,
}) => {
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'rating'>('relevance');
  const [onlyCompatible, setOnlyCompatible] = useState<boolean>(false);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  // Extract available brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.brand)));
    return ['all', ...list];
  }, [products]);

  // Filter products based on category, search, vehicle and brand
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Search term filter
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(term) ||
          p.brand.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          p.partNumber.toLowerCase().includes(term);
        if (!matches) return false;
      }

      // Brand filter
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) {
        return false;
      }

      // Vehicle compatibility filter
      if (onlyCompatible && selectedVehicle) {
        const isComp =
          p.compatibleVehicles.includes(selectedVehicle.model) ||
          p.compatibleVehicles.includes('universal');
        if (!isComp) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // relevance
    });
  }, [products, selectedCategory, searchTerm, selectedBrand, onlyCompatible, selectedVehicle, sortBy]);

  const tabs = [
    { id: 'all', label: 'Todos os Destaques' },
    { id: 'pneus', label: 'Pneus' },
    { id: 'oleos', label: 'Óleos & Fluidos' },
    { id: 'baterias', label: 'Baterias' },
    { id: 'freios', label: 'Freios' },
    { id: 'suspensao', label: 'Suspensão' },
  ];

  return (
    <section id="catalogo" className="my-10">
      
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs uppercase font-bold text-red-600 tracking-wider">
            Loja Oficial World Auto Center
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight mt-0.5">
            Autopeças com Garantia de Procedência
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Mais de 40.000 itens a pronta entrega com opção de instalação no Centro Automotivo
          </p>
        </div>

        {/* Tab buttons */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
          {tabs.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-blue-950 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and sorting toolbar */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 my-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Left: Active count & compatibility toggle */}
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-slate-600 font-medium">
            Exibindo <strong className="text-slate-900 font-mono">{filteredProducts.length}</strong> produtos
          </span>

          {selectedVehicle && (
            <label className="flex items-center gap-1.5 cursor-pointer bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded border border-slate-200 text-slate-700 font-semibold select-none">
              <input
                type="checkbox"
                checked={onlyCompatible}
                onChange={(e) => setOnlyCompatible(e.target.checked)}
                className="w-3.5 h-3.5 text-red-600 rounded border-slate-300 focus:ring-red-600"
              />
              <span>Apenas compatíveis com {selectedVehicle.model}</span>
            </label>
          )}
        </div>

        {/* Right: Brand and Sorting */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Brand select */}
          <div className="flex items-center gap-1">
            <span className="text-slate-500 font-medium">Marca:</span>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-red-600"
            >
              <option value="all">Todas as Marcas</option>
              {brands.filter((b) => b !== 'all').map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Sort select */}
          <div className="flex items-center gap-1">
            <span className="text-slate-500 font-medium">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-red-600"
            >
              <option value="relevance">Mais Relevantes</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
              <option value="rating">Melhor Avaliados</option>
            </select>
          </div>
        </div>

      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              selectedVehicle={selectedVehicle}
              onAddToCart={onAddToCart}
              onOpenQuickView={onOpenQuickView}
              onOpenBookingWithProduct={onOpenBookingWithProduct}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center my-6">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Nenhum produto encontrado com os filtros selecionados
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Tente remover os filtros de compatibilidade, marca ou limpar o termo de busca para visualizar o catálogo completo.
          </p>
          <button
            onClick={() => {
              onSelectCategory('all');
              setSelectedBrand('all');
              setOnlyCompatible(false);
            }}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Resetar Filtros</span>
          </button>
        </div>
      )}

    </section>
  );
};
