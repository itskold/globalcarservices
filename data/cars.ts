import { Car } from "lucide-react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"

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
  createdAt?: Date;
  updatedAt?: Date;
}

export async function getCars(): Promise<CarData[]> {
  try {
    const carsCollection = collection(db, "cars")
    const carsSnapshot = await getDocs(carsCollection)
    
    return carsSnapshot.docs.map(doc => {
      const data = doc.data()
      return {
        ...data,
        id: doc.id,
        icon: Car, // On réassigne l'icône côté client
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as CarData
    })
  } catch (error) {
    console.error("Erreur lors de la récupération des voitures:", error)
    return []
  }
}

// Export une version vide par défaut pour éviter les erreurs de build
export const cars: CarData[] = [] 