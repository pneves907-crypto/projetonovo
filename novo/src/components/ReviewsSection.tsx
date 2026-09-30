import React from 'react';
import { Star, ShieldCheck, CheckCircle2, ThumbsUp } from 'lucide-react';
import { REVIEWS } from '../data/mockData';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="my-16 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 lg:p-12 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            Opinião de Quem Confia
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 font-display tracking-tight mt-0.5">
            Avaliações Reais de Nossos Clientes
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Mais de 15.000 veículos atendidos com transparência e padrão de qualidade ASE
          </p>
        </div>

        {/* Global Score Pill */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
          <div className="text-2xl font-black text-slate-900 font-mono">4.9</div>
          <div className="flex flex-col">
            <div className="flex items-center text-red-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-[11px] text-slate-500 font-medium">99.4% de satisfação geral</span>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {REVIEWS.map((rev) => (
          <div
            key={rev.id}
            className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between hover:border-slate-300 transition-colors"
          >
            <div>
              {/* Stars & Date */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-red-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] text-slate-400">{rev.date}</span>
              </div>

              {/* Service Tag */}
              <div className="text-[10px] font-bold text-blue-900 uppercase tracking-wide mb-2 line-clamp-1">
                {rev.serviceOrProduct}
              </div>

              {/* Comment */}
              <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                "{rev.comment}"
              </p>
            </div>

            {/* Author & Vehicle */}
            <div className="pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    {rev.name}
                    {rev.verified && (
                      <span title="Compra e Serviço Verificado">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      </span>
                    )}
                  </h4>
                  <p className="text-[11px] text-slate-500">{rev.city}</p>
                </div>
              </div>
              <div className="text-[10px] text-slate-400 mt-1 truncate">
                Carro: {rev.vehicle}
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
