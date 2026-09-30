import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Shield, Wrench, ArrowRight, Compass } from 'lucide-react';
import { IMAGES } from '../data/mockData';

interface HeroCarouselProps {
  onOpenBooking: () => void;
  onSelectCategory: (category: string) => void;
  onScrollToSmartFlow: () => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  onOpenBooking,
  onSelectCategory,
  onScrollToSmartFlow,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'slide-1',
      title: 'World Auto Center: Peças Originais & Alinhamento com Inspeção Digital',
      subtitle: 'Técnicos Certificados ASE · Até 2 Anos de Garantia · Loja Especializada',
      description: 'O melhor para o seu veículo em um só lugar. Pneus das melhores marcas, óleos sintéticos, pastilhas e alinhamento computadorizado com balanceamento dinâmico de rodas.',
      image: IMAGES.alignment || IMAGES.hero,
      primaryAction: {
        label: 'Agendar Alinhamento & Serviço',
        onClick: onOpenBooking,
        icon: Wrench,
      },
      secondaryAction: {
        label: 'Ver Alinhamento Digital',
        onClick: onScrollToSmartFlow,
        icon: Compass,
      },
      tag: 'Garantia de até 2 Anos',
    },
    {
      id: 'slide-2',
      title: 'Festival de Pneus de Alta Performance',
      subtitle: 'Pirelli, Michelin & Goodyear com Até 10x Sem Juros',
      description: 'Renove a segurança com pneus certificados pelo INMETRO. Compre online com 10% de desconto no PIX e agende a montagem e balanceamento na loja.',
      image: IMAGES.tire,
      primaryAction: {
        label: 'Ver Ofertas de Pneus',
        onClick: () => onSelectCategory('pneus'),
        icon: ArrowRight,
      },
      secondaryAction: {
        label: 'Agendar Montagem na Loja',
        onClick: onOpenBooking,
        icon: Wrench,
      },
      tag: 'Montagem & Balanceamento na Loja',
    },
    {
      id: 'slide-3',
      title: 'Baterias Automotivas Moura & Heliar com Entrega Rápida',
      subtitle: 'Instalação Grátis + Teste de Alternador',
      description: 'Não fique na mão! Baterias livres de manutenção com até 24 meses de garantia e teste computadorizado do sistema de recarga.',
      image: IMAGES.battery,
      primaryAction: {
        label: 'Ver Baterias',
        onClick: () => onSelectCategory('baterias'),
        icon: ArrowRight,
      },
      secondaryAction: {
        label: 'Pedir com Instalação Rápida',
        onClick: onOpenBooking,
        icon: Wrench,
      },
      tag: 'Teste de Carga Grátis',
    },
  ];

  // Auto-advance slides every 6.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative rounded-2xl overflow-hidden bg-slate-950 text-white shadow-xl border border-slate-800">
      <div className="relative min-h-[380px] sm:min-h-[440px] flex items-center">
        {/* Background Image with dramatic gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40" />
        </div>

        {/* Slide Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-10 w-full">
          <div className="max-w-2xl">
            {/* Tag / Micro-kicker */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Shield className="w-3.5 h-3.5" />
              <span>{slide.tag}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white leading-tight mb-2">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <h2 className="text-sm sm:text-base font-bold text-red-400 mb-3">
              {slide.subtitle}
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 mb-6 leading-relaxed">
              {slide.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={slide.primaryAction.onClick}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-lg text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg shadow-red-600/30 active:scale-95"
              >
                <slide.primaryAction.icon className="w-4 h-4" />
                <span>{slide.primaryAction.label}</span>
              </button>

              <button
                onClick={slide.secondaryAction.onClick}
                className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-4 py-2.5 rounded-lg text-xs sm:text-sm transition-all flex items-center gap-2 backdrop-blur-xs"
              >
                <slide.secondaryAction.icon className="w-4 h-4 text-red-400" />
                <span>{slide.secondaryAction.label}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-800 border border-slate-700 text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-800 border border-slate-700 text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100"
          aria-label="Próximo slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 transition-all rounded-full ${
                currentSlide === index ? 'w-8 bg-red-600' : 'w-2 bg-slate-600 hover:bg-slate-400'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
