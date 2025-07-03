export interface FilterState {
  location: string
  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
  priceRange: [number, number]
  vehicleTypes: string[]
  brands: string[]
  features: string[]
  transmission: string[]
  fuel: string[]
  seats: [number, number]
} 