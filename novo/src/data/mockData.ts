import { Product, ServiceItem, Review } from '../types';

export const VEHICLE_MAKES = [
  'Volkswagen',
  'Chevrolet',
  'Fiat',
  'Toyota',
  'Honda',
  'Hyundai',
  'Ford',
  'Jeep',
  'Renault',
  'Nissan',
  'BMW',
  'Mercedes-Benz',
] as const;

export const VEHICLE_MODELS: Record<string, string[]> = {
  Volkswagen: ['Gol', 'Polo', 'Golf', 'T-Cross', 'Virtus', 'Nivus', 'Fox', 'Jetta', 'Saveiro'],
  Chevrolet: ['Onix', 'Prisma', 'Tracker', 'Cruze', 'S10', 'Spin', 'Celta', 'Montana'],
  Fiat: ['Palio', 'Uno', 'Argo', 'Cronos', 'Toro', 'Strada', 'Mobi', 'Pulse', 'Fastback'],
  Toyota: ['Corolla', 'Hilux', 'Yaris', 'Etios', 'Corolla Cross', 'RAV4'],
  Honda: ['Civic', 'Fit', 'HR-V', 'City', 'WR-V', 'CR-V'],
  Hyundai: ['HB20', 'Creta', 'Tucson', 'i30', 'Santa Fe'],
  Ford: ['Ka', 'EcoSport', 'Ranger', 'Fiesta', 'Focus', 'Fusion'],
  Jeep: ['Renegade', 'Compass', 'Commander', 'Wrangler'],
  Renault: ['Sandero', 'Logan', 'Duster', 'Kwid', 'Captur', 'Oroch'],
  Nissan: ['Kicks', 'Versa', 'March', 'Sentra', 'Frontier'],
  BMW: ['320i', 'X1', '118i', '328i', 'X3'],
  'Mercedes-Benz': ['C180', 'C200', 'GLA200', 'A200', 'GLB200'],
};

export const VEHICLE_YEARS = [
  2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2010,
];

export const VEHICLE_ENGINES: Record<string, string[]> = {
  default: ['1.0 12V Flex / Turbo', '1.4 16V Turbo', '1.6 16V Flex', '1.8 16V Flex', '2.0 16V Flex / Turbo', '2.8 Turbo Diesel'],
};

// Generated visual assets
export const IMAGES = {
  hero: '/src/assets/images/hero_auto_center_1790730195297.jpg',
  tire: '/src/assets/images/pneu_alta_performance_1790730205892.jpg',
  battery: '/src/assets/images/bateria_automotiva_1790730216427.jpg',
  diagnostic: '/src/assets/images/mecanica_diagnostico_1790730226652.jpg',
  alignment: '/src/assets/images/alinhamento_digital_1790731072513.jpg',
};

export const CATEGORIES = [
  { id: 'pneus', name: 'Pneus & Rodas', icon: 'Disc', count: 184 },
  { id: 'oleos', name: 'Óleos & Fluidos', icon: 'Droplets', count: 126 },
  { id: 'baterias', name: 'Baterias & Elétrica', icon: 'BatteryCharging', count: 72 },
  { id: 'freios', name: 'Freios & Pastilhas', icon: 'ShieldCheck', count: 215 },
  { id: 'suspensao', name: 'Suspensão & Direção', icon: 'Sliders', count: 198 },
  { id: 'mecanica', name: 'Mecânica & Motor', icon: 'Cpu', count: 340 },
  { id: 'filtros', name: 'Filtros Automotivos', icon: 'Filter', count: 95 },
  { id: 'eletrica', name: 'Iluminação & Ignição', icon: 'Zap', count: 110 },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Pneu Pirelli Cinturato P7 205/55R16 91V',
    category: 'pneus',
    brand: 'Pirelli',
    partNumber: 'PIR-2055516-P7',
    image: IMAGES.tire,
    price: 459.90,
    originalPrice: 549.90,
    installPrice: 40.00,
    rating: 4.9,
    reviewCount: 238,
    inStock: true,
    warranty: '5 anos contra defeitos de fabricação',
    compatibleVehicles: ['Corolla', 'Civic', 'Golf', 'Focus', 'Cruze', 'Polo', 'Jetta'],
    shortDescription: 'Excelente frenagem no molhado, baixo nível de ruído e alta durabilidade para carros médios e sedans.',
    specs: {
      'Medida': '205/55 R16',
      'Índice de Carga': '91 (615 kg)',
      'Índice de Velocidade': 'V (240 km/h)',
      'Treadwear': '260',
      'Eficiência Energética': 'B',
      'Aderência no Molhado': 'B'
    },
    badge: 'Mais Vendido',
    freeShipping: true,
  },
  {
    id: 'prod-2',
    name: 'Bateria Automotiva Moura 60Ah M60GD Livre de Manutenção',
    category: 'baterias',
    brand: 'Moura',
    partNumber: 'MOU-M60GD-SLI',
    image: IMAGES.battery,
    price: 499.00,
    originalPrice: 589.00,
    installPrice: 0.00, // Grátis no Auto Center!
    rating: 4.95,
    reviewCount: 312,
    inStock: true,
    warranty: '24 meses de garantia oficial Moura',
    compatibleVehicles: ['Onix', 'Gol', 'HB20', 'Palio', 'Polo', 'Argo', 'Renegade', 'Kwid'],
    shortDescription: 'Líder em durabilidade com tecnologia de liga de prata. Teste de alternador e instalação grátis no centro automotivo.',
    specs: {
      'Capacidade': '60 Ah',
      'CCA (Corrente de Partida)': '440A (-18°C)',
      'Tensão': '12V',
      'Pólo Positivo': 'Direito',
      'Tecnologia': 'Liga de Prata Flooded',
      'Instalação': 'Grátis no Auto Center'
    },
    badge: 'Instalação Grátis',
    freeShipping: true,
  },
  {
    id: 'prod-3',
    name: 'Óleo Motor 100% Sintético Motul 8100 X-Cess Gen2 5W40 (Kit 4 Litros)',
    category: 'oleos',
    brand: 'Motul',
    partNumber: 'MOT-8100-5W40-4L',
    image: IMAGES.hero,
    price: 279.90,
    originalPrice: 330.00,
    installPrice: 50.00,
    rating: 4.98,
    reviewCount: 184,
    inStock: true,
    warranty: '12 meses ou especificação do fabricante',
    compatibleVehicles: ['Golf', 'Jetta', 'Polo', 'Civic', 'Cruze', '320i', 'C180'],
    shortDescription: 'Lubrificante 100% sintético de alta performance projetado para motores a gasolina, etanol, flex e diesel.',
    specs: {
      'Viscosidade': 'SAE 5W40',
      'Base': '100% Sintético Ester Core',
      'Normas': 'API SN / CF - ACEA A3/B4',
      'Aprovações': 'VW 502.00/505.00, MB 229.5, BMW LL-01, Porsche A40',
      'Volume': '4 Frascos de 1 Litro'
    },
    badge: 'Oferta Especial',
    freeShipping: true,
  },
  {
    id: 'prod-4',
    name: 'Jogo de Pastilhas de Freio Dianteiras Cerâmica Brembo Prime',
    category: 'freios',
    brand: 'Brembo',
    partNumber: 'BRE-P85075N-CER',
    image: IMAGES.diagnostic,
    price: 320.00,
    originalPrice: 389.00,
    installPrice: 70.00,
    rating: 4.88,
    reviewCount: 97,
    inStock: true,
    warranty: '2 Anos World Auto Center',
    compatibleVehicles: ['Corolla', 'Civic', 'Golf', 'Cruze', 'Tracker', 'Compass'],
    shortDescription: 'Frenagem silenciosa sem poeira preta nas rodas. Composto cerâmico de alta resistência térmica.',
    specs: {
      'Posição': 'Dianteira',
      'Material': 'Composto Cerâmico Premium Low-Dust',
      'Inclui': 'Sensores de desgaste e anti-ruído',
      'Certificação': 'ECE R90 e INMETRO'
    },
    freeShipping: true,
  },
  {
    id: 'prod-5',
    name: 'Kit Par Amortecedores Dianteiros Turbogás Cofap + Coxins e Batentes',
    category: 'suspensao',
    brand: 'Cofap',
    partNumber: 'COF-GP30132-KIT',
    image: IMAGES.diagnostic,
    price: 789.00,
    originalPrice: 940.00,
    installPrice: 160.00,
    rating: 4.92,
    reviewCount: 142,
    inStock: true,
    warranty: '2 Anos World Auto Center',
    compatibleVehicles: ['Onix', 'Prisma', 'Gol', 'HB20', 'Palio', 'Polo', 'Argo'],
    shortDescription: 'Kit completo pressurizado a gás para máximo conforto e estabilidade em curvas e irregularidades.',
    specs: {
      'Linha': 'Turbogás Pressurizado',
      'Posição': 'Dianteiro Direito e Esquerdo',
      'Acompanha': '2 Amortecedores + 2 Coxins + 2 Batentes + 2 Coifas',
      'Garantia': '24 meses'
    },
    badge: 'Kit Completo',
    freeShipping: true,
  },
  {
    id: 'prod-6',
    name: 'Kit de Distribuição Correia Dentada e Tensor Gates Original',
    category: 'mecanica',
    brand: 'Gates',
    partNumber: 'GAT-KS104-SYN',
    image: IMAGES.hero,
    price: 249.90,
    originalPrice: 299.00,
    installPrice: 180.00,
    rating: 4.94,
    reviewCount: 88,
    inStock: true,
    warranty: '2 Anos World Auto Center',
    compatibleVehicles: ['Gol', 'Palio', 'Uno', 'Siena', 'Fox', 'Voyage', 'Celta'],
    shortDescription: 'Segurança absoluta contra quebra de correia com tensor automático de rolamento blindado.',
    specs: {
      'Aplicação': 'Motores 1.0 e 1.6 8V',
      'Perfil do Dente': 'Parabólico Curvilíneo',
      'Origem': 'Original de Montadora'
    },
    freeShipping: false,
  },
  {
    id: 'prod-7',
    name: 'Kit 4 Velas de Ignição NGK Laser Iridium Alta Eficiência',
    category: 'eletrica',
    brand: 'NGK',
    partNumber: 'NGK-ILZKR7B11-4',
    image: IMAGES.diagnostic,
    price: 265.00,
    originalPrice: 320.00,
    installPrice: 40.00,
    rating: 4.96,
    reviewCount: 115,
    inStock: true,
    warranty: '100.000 km ou 3 anos',
    compatibleVehicles: ['Civic', 'Corolla', 'HB20', 'Cruze', 'Golf', 'Compass'],
    shortDescription: 'Ponta de irídio ultrafina para queima perfeita do combustível, resposta imediata ao acelerador e menor consumo.',
    specs: {
      'Eletrodo': 'Iridium 0.6mm + Platina no terra',
      'Durabilidade': 'Até 100.000 km',
      'Melhoria': 'Partida instantânea e economia de até 5%'
    },
    freeShipping: true,
  },
  {
    id: 'prod-8',
    name: 'Kit Revisão Completa 4 Filtros Mahle (Óleo, Ar, Combustível e Cabine)',
    category: 'filtros',
    brand: 'Mahle',
    partNumber: 'MAH-KIT4-REV',
    image: IMAGES.hero,
    price: 159.90,
    originalPrice: 199.90,
    installPrice: 40.00,
    rating: 4.91,
    reviewCount: 160,
    inStock: true,
    warranty: '12 meses',
    compatibleVehicles: ['Onix', 'HB20', 'Gol', 'Polo', 'Argo', 'Renegade', 'Corolla'],
    shortDescription: 'Kit de filtros originais Mahle Metal Leve para manter o motor limpo e o ar interno puro contra ácaros e pólen.',
    specs: {
      'Itens': 'Filtro de Óleo + Filtro de Ar Motor + Filtro de Combustível + Filtro de Ar Condicionado',
      'Qualidade': 'Equipamento Original OEM'
    },
    badge: 'Revisão Essencial',
    freeShipping: false,
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'serv-alinhamento',
    title: 'Alinhamento e Balanceamento com Inspeção Digital',
    category: 'Geometria & Rodas',
    shortDesc: 'Ajuste computadorizado de geometria e balanceamento dinâmico com sensores digitais de alta precisão.',
    fullDesc: 'Procedimento computadorizado de alta precisão com sensores digitais de geometria instalados nas rodas. Regulamos com exatidão convergência, câmber e cáster, e executamos o balanceamento dinâmico sem vibrações, garantindo condução estável e vida útil estendida aos seus pneus.',
    estimatedTime: '45 a 60 min',
    priceFrom: 110.00,
    includesInspection: true,
    warrantyMonths: 12,
    iconName: 'Compass',
    popular: true,
    benefits: [
      'Aferição computadorizada de alta precisão de ângulos de câmber, cáster e convergência',
      'Balanceamento dinâmico computadorizado sem nenhuma vibração no volante',
      'Laudo técnico digital entregue ao cliente antes e depois do ajuste',
      'Previne desgaste precoce e irregular dos pneus'
    ]
  },
  {
    id: 'serv-oleo',
    title: 'Troca de Óleo Express & Filtros',
    category: 'Manutenção Preventiva',
    shortDesc: 'Troca de óleo sintético com lubrificantes homologados e troca de filtro de óleo e vedação.',
    fullDesc: 'Substituição completa do lubrificante atendendo rigorosamente à viscosidade e norma da montadora do seu carro (API / ACEA / Dexos / VW). Acompanha troca do anel de vedação do bujão e descarte ecológico do óleo usado.',
    estimatedTime: '30 a 45 min',
    priceFrom: 189.00,
    includesInspection: true,
    warrantyMonths: 12,
    iconName: 'Droplets',
    popular: true,
    benefits: [
      'Óleos 100% sintéticos das melhores marcas mundiais',
      'Troca do anel de vedação e torque no padrão de fábrica',
      'Verificação gratuita de fluido de arrefecimento e freio'
    ]
  },
  {
    id: 'serv-freios',
    title: 'Revisão & Troca de Freios com Teste de Fluido',
    category: 'Segurança',
    shortDesc: 'Pastilhas cerâmicas, substituição de discos ventilados e sangria computadorizada do fluido.',
    fullDesc: 'O sistema de freios é o componente mais crucial de segurança do veículo. Realizamos a medição micrométrica de espessura de discos e pastilhas, teste de ebulição do fluido DOT 4/5.1 e lubrificação das guias de pinça com graxa sintética especial.',
    estimatedTime: '1h a 1h30 min',
    priceFrom: 140.00,
    includesInspection: true,
    warrantyMonths: 24,
    iconName: 'ShieldAlert',
    popular: true,
    benefits: [
      'Garantia de 2 Anos em peças e mão de obra na World Auto Center',
      'Pastilhas de cerâmica silenciosas e sem pó nas rodas',
      'Sangria sob pressão garantindo pedal firme e sem bolhas'
    ]
  },
  {
    id: 'serv-revisao',
    title: 'Manutenção Preventiva Geral & Revisão',
    category: 'Manutenção Geral',
    shortDesc: 'Inspeção minuciosa de itens de segurança, correias, velas, suspensão, freios, luzes e fluidos.',
    fullDesc: 'Revisão periódica completa para viagens e manutenção preventiva. Verificação detalhada de todos os pontos vitais do veículo com relatório claro e garantia de até 2 anos em peças substituídas.',
    estimatedTime: '1h30 min',
    priceFrom: 150.00,
    includesInspection: true,
    warrantyMonths: 24,
    iconName: 'Cpu',
    popular: false,
    benefits: [
      'Inspeção detalhada de segurança em mais de 40 componentes vitais',
      'Técnicos certificados ASE asseguram diagnósticos precisos',
      'Orçamento transparente sem troca de peças desnecessárias'
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Carlos Eduardo Mendes',
    city: 'Fragoso, RJ',
    vehicle: 'Volkswagen Golf 1.4 TSI 2018',
    serviceOrProduct: 'Alinhamento e Balanceamento com Inspeção Digital + Pastilhas Brembo',
    rating: 5,
    comment: 'Excelente atendimento na loja! O alinhamento computadorizado com a inspeção digital deixou o carro impecável, reto e sem nenhuma vibração no volante. A garantia de 2 anos e o profissionalismo me conquistaram!',
    date: '14 de Março, 2026',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Patricia Alencar',
    city: 'Rio de Janeiro, RJ',
    vehicle: 'Toyota Corolla Cross 2.0 2022',
    serviceOrProduct: '4 Pneus Pirelli Cinturato + Alinhamento e Balanceamento Digital',
    rating: 5,
    comment: 'Comprei os pneus pelo site aproveitando o desconto no PIX e agendei a instalação direto na loja. O alinhamento computadorizado ficou perfeito e o atendimento foi pontual.',
    date: '02 de Março, 2026',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Michael R. Santos',
    city: 'Fragoso, RJ',
    vehicle: 'Jeep Compass 2.0 Flex 2021',
    serviceOrProduct: 'Troca de Óleo Sintético & Troca de Bateria Moura',
    rating: 5,
    comment: 'Conheço a World Auto Center há bastante tempo. Eles sempre mantiveram esse padrão de transparência e técnicos certificados. Resolveram o problema na hora com peças originais.',
    date: '24 de Fevereiro, 2026',
    verified: true,
  },
  {
    id: 'rev-4',
    name: 'Renata Figueiredo',
    city: 'Magé, RJ',
    vehicle: 'Hyundai HB20 1.0 Turbo 2023',
    serviceOrProduct: 'Troca de Óleo Motul + Kit Filtros Mahle',
    rating: 5,
    comment: 'Achei todas as peças certinhas usando o filtro de veículo do site. Atendimento nota 10 na Rua Expedicionário Otacílio de Souza. Recomendo de olhos fechados!',
    date: '10 de Fevereiro, 2026',
    verified: true,
  }
];

export const WORKSHOP_DETAILS = {
  name: 'World Auto Center',
  tagline: 'Centro Automotivo & E-Commerce Especializado',
  phone: '(21) 99999-9999',
  whatsapp: '+55 (21) 99999-9999',
  email: 'contato@worldautocenter.com',
  address: 'Rua Expedicionário Otacílio de Souza, 840 - Fragoso',
  hours: 'Segunda a Sexta: 08:00 às 18:00 | Sábado: 08:00 às 13:00',
  founded: 2019,
  certifications: ['Técnicos Certificados ASE', 'Alinhamento & Balanceamento Digital', 'INMETRO Homologado', 'Peças com Garantia de até 2 Anos'],
};
