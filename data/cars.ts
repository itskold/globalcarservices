import { Car } from "lucide-react"

interface CarData {
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

export const cars: CarData[] = [
  {
    id: "bmw-330i-1",
    icon: Car,
    title: "BMW 330i",
    description: "Sportieve en elegante berline",
    price: 35900,
    features: [
      "M Sport afwerking",
      "Panoramisch schuifdak",
      "Harman Kardon audiosysteem",
      "Sport pakket"
    ],
    image: "/placeholder.svg?height=200&width=300&text=BMW+330i",
    type: "berline",
    brand: "BMW",
    year: 2021,
    category: "Berline",
    seats: 5,
    fuel: "Benzine",
    transmission: "Automatisch",
    mileage: 45000,
    rating: 4.8,
    reviewCount: 15,
    images: [
      "/placeholder.svg?height=400&width=600&text=BMW+330i+1",
      "/placeholder.svg?height=400&width=600&text=BMW+330i+2",
      "/placeholder.svg?height=400&width=600&text=BMW+330i+3",
    ],
    specifications: {
      engine: "2.0L Turbo",
      power: "258 pk",
      consumption: "6.5L/100km",
      doors: 4,
      color: "Portimao Blauw",
      interior: "Zwart Dakota leder"
    },
    included: [
      "12 maanden BMW garantie",
      "Volledig onderhoudshistoriek",
      "Recente technische keuring",
      "Bijgewerkt onderhoudsboekje"
    ],
    options: [
      "Elektrische sportstoelen",
      "Professional navigatie",
      "Achteruitrijcamera",
      "Head-up display",
      "Adaptieve cruise control"
    ]
  },
  {
    id: "mercedes-c200-1",
    icon: Car,
    title: "Mercedes C200",
    description: "Pure luxe en comfort",
    price: 38500,
    features: [
      "AMG Line pakket",
      "Sfeerverlichting",
      "Burmester geluidssysteem",
      "Rijassistentie pakket"
    ],
    image: "/placeholder.svg?height=200&width=300&text=Mercedes+C200",
    type: "berline",
    brand: "Mercedes",
    year: 2022,
    category: "Berline",
    seats: 5,
    fuel: "Benzine",
    transmission: "Automatisch",
    mileage: 32000,
    rating: 4.9,
    reviewCount: 18,
    images: [
      "/placeholder.svg?height=400&width=600&text=Mercedes+C200+1",
      "/placeholder.svg?height=400&width=600&text=Mercedes+C200+2",
      "/placeholder.svg?height=400&width=600&text=Mercedes+C200+3",
    ],
    specifications: {
      engine: "2.0L Turbo",
      power: "204 pk",
      consumption: "6.3L/100km",
      doors: 4,
      color: "Selenietgrijs",
      interior: "Zwart Artico leder"
    },
    included: [
      "24 maanden Mercedes garantie",
      "Service A uitgevoerd",
      "Recente technische keuring",
      "Niet-rokers voertuig"
    ],
    options: [
      "Verwarmde stoelen",
      "MBUX Premium navigatie",
      "Panoramadak",
      "Actieve parkeerassistent",
      "Digital Light LED"
    ]
  },
  {
    id: "audi-q5-1",
    icon: Car,
    title: "Audi Q5",
    description: "Premium gezins-SUV",
    price: 42900,
    features: [
      "S line exterieur",
      "Panoramadak",
      "Bang & Olufsen Sound",
      "Technology pakket"
    ],
    image: "/placeholder.svg?height=200&width=300&text=Audi+Q5",
    type: "suv",
    brand: "Audi",
    year: 2021,
    category: "SUV",
    seats: 5,
    fuel: "Diesel",
    transmission: "Automatisch",
    mileage: 38000,
    rating: 4.7,
    reviewCount: 12,
    images: [
      "/placeholder.svg?height=400&width=600&text=Audi+Q5+1",
      "/placeholder.svg?height=400&width=600&text=Audi+Q5+2",
      "/placeholder.svg?height=400&width=600&text=Audi+Q5+3",
    ],
    specifications: {
      engine: "2.0L TDI",
      power: "190 pk",
      consumption: "5.8L/100km",
      doors: 5,
      color: "Gletsjerwit",
      interior: "Zwart Milano leder"
    },
    included: [
      "12 maanden Audi garantie",
      "Volledige onderhoudsbeurt",
      "Technische keuring",
      "2 sleutelsets"
    ],
    options: [
      "Virtual Cockpit",
      "MMI Plus navigatie",
      "360° camera",
      "Adaptieve ophanging",
      "Matrix LED"
    ]
  },
  {
    id: "volvo-xc60-1",
    icon: Car,
    title: "Volvo XC60",
    description: "Verfijnde Scandinavische SUV",
    price: 45900,
    features: [
      "R-Design",
      "Panoramisch schuifdak",
      "Bowers & Wilkins Audio",
      "IntelliSafe Pro pakket"
    ],
    image: "/placeholder.svg?height=200&width=300&text=Volvo+XC60",
    type: "suv",
    brand: "Volvo",
    year: 2022,
    category: "SUV",
    seats: 5,
    fuel: "Hybride",
    transmission: "Automatisch",
    mileage: 25000,
    rating: 4.9,
    reviewCount: 14,
    images: [
      "/placeholder.svg?height=400&width=600&text=Volvo+XC60+1",
      "/placeholder.svg?height=400&width=600&text=Volvo+XC60+2",
      "/placeholder.svg?height=400&width=600&text=Volvo+XC60+3",
    ],
    specifications: {
      engine: "2.0L T8 Twin Engine",
      power: "390 pk",
      consumption: "2.4L/100km",
      doors: 5,
      color: "Denim Blauw",
      interior: "Zwart Nappa leder"
    },
    included: [
      "24 maanden Volvo garantie",
      "Volledig onderhoud",
      "Technische keuring",
      "Volledige historiek"
    ],
    options: [
      "Elektrische voorstoelen",
      "Sensus navigatie",
      "Park Assist Pilot",
      "Head-up display",
      "Pilot Assist"
    ]
  }
] as const 