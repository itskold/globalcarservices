import { Car, Package, Users } from "lucide-react";

export interface PricingOption {
  duration: '4 uur' | 'day' | 'weekend' | '5_days' | 'week' | 'month';
  price: number;
  included_km: number;
}

export interface VehicleData {
  id: string;
  icon: any;
  title: string;
  description: string;
  pricing: PricingOption[];
  km_price: number;
  features: string[];
  image: string;
  type: string;
  brand: string;
  year: number;
  category: string;
  seats: number;
  fuel: string;
  transmission: string;
  rating: number;
  reviewCount: number;
  images: string[];
  specifications: {
    engine: string;
    power: string;
    consumption: string;
    doors: number;
    luggage: string;
    aircon: boolean;
    gps: boolean;
  };
  included: string[];
  extras: Array<{ id: string; name: string; price: number }>;
}

export interface CarData {
  id: string;
  icon: any;
  title: string;
  description: string;
  price: number;
  features: string[];
  image: string;
  type: string;
  brand: string;
  year: number;
  category: string;
  seats: number;
  fuel: string;
  transmission: string;
  mileage: number;
  rating: number;
  reviewCount: number;
  images: string[];
  specifications: {
    engine: string;
    power: string;
    consumption: string;
    doors: number;
    color: string;
    interior: string;
  };
  included: string[];
  options: string[];
} 