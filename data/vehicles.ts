import { Package, Users } from "lucide-react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"

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
  createdAt?: Date;
  updatedAt?: Date;
}

export async function getVehicles(): Promise<VehicleData[]> {
  try {
    const vehiclesCollection = collection(db, "vehicles")
    const vehiclesSnapshot = await getDocs(vehiclesCollection)
    
    return vehiclesSnapshot.docs.map(doc => {
      const data = doc.data()
      // Déterminer l'icône en fonction du type de véhicule
      const icon = data.type?.includes('van') ? Package : Users
      
      return {
        ...data,
        id: doc.id,
        icon, // On réassigne l'icône côté client
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as VehicleData
    })
  } catch (error) {
    console.error("Erreur lors de la récupération des véhicules:", error)
    return []
  }
}

// Export une version vide par défaut pour éviter les erreurs de build
export const vehicles: VehicleData[] = [] 