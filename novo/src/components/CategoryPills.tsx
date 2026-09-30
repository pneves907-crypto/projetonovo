import React from 'react';
import { 
  Disc, 
  BatteryCharging, 
  Droplets, 
  ShieldCheck, 
  Sliders, 
  Cpu, 
  Filter, 
  Zap, 
  Wind,
  Wrench
} from 'lucide-react';

interface CategoryPillsProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  onScrollToServices: () => void;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  selectedCategory,
  onSelectCategory,
  onScrollToServices,
}) => {
  const categories = [
    { id: 'pneus', name: 'Pneus & Rodas', icon: Disc, color: 'text-red-600' },
    { id: 'oleos', name: 'Óleos & Fluidos', icon: Droplets, color: 'text-blue-600' },
    { id: 'baterias', name: 'Baterias', icon: BatteryCharging, color: 'text-blue-700' },
    { id: 'freios', name: 'Freios & Pastilhas', icon: ShieldCheck, color: 'text-red-600' },
    { id: 'suspensao', name: 'Suspensão', icon: Sliders, color: 'text-blue-500' },
    { id: 'mecanica', name: 'Motor & Correias', icon: Cpu, color: 'text-slate-600' },
    { id: 'filtros', name: 'Filtros', icon: Filter, color: 'text-emerald-500' },
    { id: 'eletrica', name: 'Velas & Ignição', icon: Zap, color: 'text-purple-500' },
  ];

  return (
    <section className="my-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-display tracking-tight">
            Navegue por Categoria
          </h2>
          <p className="text-xs text-slate-500">
            Acesso rápido às autopeças mais procuradas para reposição
          </p>
        </div>
        <button
          onClick={() => onSelectCategory('all')}
          className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline"
        >
          Ver Todas
        </button>
      </div>

      {/* Grid of category circles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const Icon = cat.icon;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all group active:scale-95 ${
                isSelected
                  ? 'bg-red-50/80 border-red-600 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-transform group-hover:scale-110 ${
                  isSelected ? 'bg-red-600 text-white' : 'bg-slate-100 ' + cat.color
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`text-xs font-semibold leading-tight line-clamp-1 ${
                  isSelected ? 'text-red-700 font-bold' : 'text-slate-700'
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
