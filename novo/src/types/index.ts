export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  engine: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'pneus' | 'oleos' | 'baterias' | 'freios' | 'suspensao' | 'mecanica' | 'filtros' | 'eletrica';
  brand: string;
  partNumber: string;
  image: string;
  price: number;
  originalPrice: number;
  installPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  warranty: string;
  compatibleVehicles: string[]; // vehicle IDs or 'universal'
  shortDescription: string;
  specs: { [key: string]: string };
  badge?: string;
  freeShipping?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  estimatedTime: string;
  priceFrom: number;
  includesInspection: boolean;
  warrantyMonths: number;
  iconName: string;
  popular: boolean;
  benefits: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  includeInstallation: boolean;
}

export interface ServiceBooking {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  serviceId: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: 'confirmed' | 'pending';
}

export interface Review {
  id: string;
  name: string;
  city: string;
  vehicle: string;
  serviceOrProduct: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}
