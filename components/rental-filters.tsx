"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, SlidersHorizontal, X, MapPin, Users, Car, Euro, Settings, Fuel, Clock } from "lucide-react"
import { format } from "date-fns"
import { nl } from "date-fns/locale"
import { DateRange } from "react-day-picker"
import { useTranslations } from 'next-intl'

interface FilterState {
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
  models: string[]
  duration: string
}

interface RentalFiltersProps {
  onFiltersChange: (filters: FilterState) => void
  vehicleType?: "all" | "van" | "minibus" | "car"
}

type VehicleFeatures = {
  [key in "minibus" | "box-van" | "box-van-lift" | "koelwagen"]: Array<{
    value: string;
    label: string;
  }>;
};

export default function RentalFilters({ onFiltersChange, vehicleType = "all" }: RentalFiltersProps) {
  const t = useTranslations('rentalFilters')
  const [filters, setFilters] = useState<FilterState>({
    location: "",
    dateRange: { from: undefined, to: undefined },
    priceRange: [30, 200],
    vehicleTypes: [],
    brands: [],
    features: [],
    transmission: [],
    fuel: [],
    seats: [2, 9],
    models: [],
    duration: "day"
  })

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  const vehicleTypes = [
    { id: "mini-van", label: t('vehicleType.options.mini-van') },
    { id: "normal-van", label: t('vehicleType.options.normal-van') },
    { id: "large-van", label: t('vehicleType.options.large-van') },
    { id: "xl-van", label: t('vehicleType.options.xl-van') },
    { id: "box-van", label: t('vehicleType.options.box-van') },
    { id: "box-van-lift", label: t('vehicleType.options.box-van-lift') },
    { id: "minibus", label: t('vehicleType.options.minibus') },
    { id: "koelwagen", label: t('vehicleType.options.koelwagen') }
  ]

  const models = [
    // Mini Van
    { value: "peugeot-partner", label: "Peugeot Partner", type: "mini-van" },
    { value: "citroen-berlingo", label: "Citroën Berlingo", type: "mini-van" },
    // Normal Van
    { value: "renault-trafic", label: "Renault Trafic", type: "normal-van" },
    { value: "citroen-jumpy", label: "Citroën Jumpy", type: "normal-van" },
    // Large Van
    { value: "ford-transit-l2h2", label: "Ford Transit L2H2", type: "large-van" },
    { value: "citroen-jumper-l2h2", label: "Citroën Jumper L2H2", type: "large-van" },
    { value: "peugeot-boxer-l2h2", label: "Peugeot Boxer L2H2", type: "large-van" },
    // Extra Large Van
    { value: "ford-transit-l3h2", label: "Ford Transit L3H2", type: "xl-van" },
    { value: "citroen-jumper-l3h2", label: "Citroën Jumper L3H2", type: "xl-van" },
    { value: "peugeot-boxer-l3h2", label: "Peugeot Boxer L3H2", type: "xl-van" },
    // Box Van
    { value: "ford-transit-box", label: "Ford Transit Box", type: "box-van" },
    { value: "peugeot-boxer-box", label: "Peugeot Boxer Box", type: "box-van" },
    { value: "vw-crafter-box", label: "VW Crafter Box", type: "box-van" },
    // Minibus
    { value: "peugeot-traveller-l3", label: "Peugeot Traveller L3", type: "minibus" },
    { value: "ford-tourneo-l2", label: "Ford Tourneo L2", type: "minibus" },
    // Koelwagen
    { value: "vw-crafter-l4-koel", label: "VW Crafter L4 (-20°C)", type: "koelwagen" },
    { value: "citroen-jumper-l2-koel", label: "Citroën Jumper L2 (-20°C)", type: "koelwagen" },
    { value: "peugeot-partner-l2-koel", label: "Peugeot Partner L2 (-1°C)", type: "koelwagen" }
  ]

  const brands = [
    { value: "Peugeot", label: t('brands.options.Peugeot') },
    { value: "Citroen", label: t('brands.options.Citroen') },
    { value: "Renault", label: t('brands.options.Renault') },
    { value: "Ford", label: t('brands.options.Ford') },
    { value: "VW", label: t('brands.options.VW') },
    { value: "Mercedes", label: t('brands.options.Mercedes') }
  ]

  const features = [
    { value: "airco", label: t('features.options.airco') },
    { value: "navigation", label: t('features.options.navigation') },
    { value: "carplay", label: t('features.options.carplay') },
    { value: "android-auto", label: t('features.options.android-auto') },
    { value: "trekhaak", label: t('features.options.trekhaak') },
    { value: "laadklep", label: t('features.options.laadklep') },
    { value: "koeling", label: t('features.options.koeling') },
    { value: "camera", label: t('features.options.camera') },
    { value: "schuifdeuren", label: t('features.options.schuifdeuren') }
  ]

  const transmissionOptions = [
    { id: "manual", label: t('transmission.options.manual') },
    { id: "automatic", label: t('transmission.options.automatic') },
  ]

  const fuelOptions = [
    { id: "diesel", label: t('fuel.options.diesel') },
    { id: "petrol", label: t('fuel.options.petrol') },
    { id: "electric", label: t('fuel.options.electric') },
  ]

  const durations = [
    { value: "half-day", label: t('duration.options.half-day') },
    { value: "day", label: t('duration.options.day') },
    { value: "weekend", label: t('duration.options.weekend') },
    { value: "week", label: t('duration.options.week') },
    { value: "month", label: t('duration.options.month') }
  ]

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      location: "",
      dateRange: { from: undefined, to: undefined },
      priceRange: [30, 200],
      vehicleTypes: [],
      brands: [],
      features: [],
      transmission: [],
      fuel: [],
      seats: [2, 9],
      models: [],
      duration: "day"
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.location) count++
    if (filters.dateRange.from || filters.dateRange.to) count++
    if (filters.priceRange[0] !== 30 || filters.priceRange[1] !== 200) count++
    if (filters.vehicleTypes.length > 0) count++
    if (filters.brands.length > 0) count++
    if (filters.features.length > 0) count++
    if (filters.transmission.length > 0) count++
    if (filters.fuel.length > 0) count++
    if (filters.seats[0] !== 2 || filters.seats[1] !== 9) count++
    if (filters.models.length > 0) count++
    if (filters.duration !== "day") count++
    return count
  }

  const handleDateRangeChange = (range: DateRange | undefined) => {
    updateFilters({
      dateRange: {
        from: range?.from,
        to: range?.to ?? undefined
      }
    })
  }

  const getFilteredModels = (selectedTypes: string[]) => {
    if (selectedTypes.length === 0) return models;
    return models.filter(model => selectedTypes.includes(model.type));
  };

  const getFilteredFeatures = (selectedTypes: string[]) => {
    const baseFeatures = [
      { value: "airco", label: "Airconditioning" },
      { value: "navigation", label: "Navigatie" },
      { value: "trekhaak", label: "Trekhaak" }
    ];

    const additionalFeatures: VehicleFeatures = {
      "minibus": [
        { value: "camera", label: "Achteruitrijcamera" },
        { value: "schuifdeuren", label: "Schuifdeuren" }
      ],
      "box-van": [
        { value: "laadklep", label: "Laadklep" }
      ],
      "box-van-lift": [
        { value: "laadklep", label: "Laadklep" }
      ],
      "koelwagen": [
        { value: "koeling", label: "Koeling" }
      ]
    };

    let availableFeatures = [...baseFeatures];
    
    if (selectedTypes.length === 0) {
      Object.values(additionalFeatures).forEach(features => {
        availableFeatures = [...availableFeatures, ...features];
      });
    } else {
      selectedTypes.forEach(type => {
        if (type in additionalFeatures) {
          availableFeatures = [...availableFeatures, ...additionalFeatures[type as keyof VehicleFeatures]];
        }
      });
    }

    return Array.from(new Set(availableFeatures.map(f => JSON.stringify(f))))
      .map(f => JSON.parse(f));
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Quick Filters Bar */}
        <div className="flex items-center gap-4 overflow-x-auto pb-2">
          {/* Location */}
          <div className="flex items-center gap-2 min-w-fit">
            <MapPin className="h-4 w-4 text-gray-500" />
            <Input
              placeholder={t('location.placeholder')}
              value={filters.location}
              onChange={(e) => updateFilters({ location: e.target.value })}
              className="w-32 h-10 border-gray-300 rounded-2xl"
            />
          </div>

          {/* Duration Quick Select */}
          <div className="flex items-center gap-2 min-w-fit">
            <Clock className="h-4 w-4 text-gray-500" />
            <select
              value={filters.duration}
              onChange={(e) => updateFilters({ duration: e.target.value })}
              className="h-10 border-gray-300 rounded-2xl bg-transparent"
            >
              {durations.map((duration) => (
                <option key={duration.value} value={duration.value}>
                  {duration.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-10 px-4 rounded-3xl border-gray-300 hover:border-gray-400 min-w-fit bg-transparent shadow-sm hover:shadow-md transition-all"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.dateRange.from ? (
                  filters.dateRange.to ? (
                    <>
                      {format(filters.dateRange.from, "dd MMM", { locale: nl })} -{" "}
                      {format(filters.dateRange.to, "dd MMM", { locale: nl })}
                    </>
                  ) : (
                    format(filters.dateRange.from, "dd MMM", { locale: nl })
                  )
                ) : (
                  t('date.label')
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={filters.dateRange.from}
                selected={filters.dateRange}
                onSelect={(range) => handleDateRangeChange(range)}
                numberOfMonths={2}
                locale={nl}
              />
            </PopoverContent>
          </Popover>

          {/* Price Range */}
          <div className="flex items-center gap-2 min-w-fit">
            <Euro className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600 whitespace-nowrap">
              {t('price.range', { min: filters.priceRange[0], max: filters.priceRange[1] })}
            </span>
          </div>

          {/* Vehicle Types (if all) */}
          {vehicleType === "all" && (
            <div className="flex items-center gap-2 min-w-fit">
              <Car className="h-4 w-4 text-gray-500" />
              <select
                value={filters.vehicleTypes.length > 0 ? filters.vehicleTypes[0] : ""}
                onChange={(e) => {
                  const newValue = e.target.value;
                  updateFilters({ 
                    vehicleTypes: newValue ? [newValue] : [] 
                  });
                }}
                className="h-10 border-gray-300 rounded-2xl bg-transparent"
              >
                <option value="">{t('vehicleType.placeholder')}</option>
                {vehicleTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* More Filters Button */}
          <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="h-10 px-4 rounded-3xl border-gray-300 hover:border-gray-400 min-w-fit bg-transparent shadow-sm hover:shadow-md transition-all"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                {t('filters.button')}
                {getActiveFiltersCount() > 0 && (
                  <Badge className="ml-2 bg-[#050b20] text-white text-xs px-3 py-1 rounded-2xl">
                    {getActiveFiltersCount()}
                  </Badge>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-[#050b20]">{t('filters.title')}</DialogTitle>
              </DialogHeader>

              <div className="space-y-8 py-4">
                {/* Price Range */}
                <div className="space-y-4">
                  <Label className="text-base font-medium text-[#050b20]">{t('price.label')}</Label>
                  <div className="px-4">
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
                      max={200}
                      min={30}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>€{filters.priceRange[0]}</span>
                      <span>€{filters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Brands */}
                <div className="space-y-4">
                  <Label className="text-base font-medium text-[#050b20]">{t('brands.title')}</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {brands.map((brand) => (
                      <div key={brand.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={brand.value}
                          checked={filters.brands.includes(brand.value)}
                          onCheckedChange={(checked) => {
                            const newBrands = checked
                              ? [...filters.brands, brand.value]
                              : filters.brands.filter((b) => b !== brand.value)
                            updateFilters({ brands: newBrands })
                          }}
                        />
                        <Label htmlFor={brand.value} className="text-sm font-normal cursor-pointer">
                          {brand.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transmission */}
                <div className="space-y-4">
                  <Label className="text-base font-medium text-[#050b20]">{t('transmission.title')}</Label>
                  <div className="flex gap-3">
                    {transmissionOptions.map((option) => (
                      <Button
                        key={option.id}
                        variant={filters.transmission.includes(option.id) ? "default" : "outline"}
                        size="sm"
                        className={`rounded-2xl px-4 py-2 transition-all hover:scale-105 ${
                          filters.transmission.includes(option.id) ? "bg-[#050b20] text-white" : "border-gray-300"
                        }`}
                        onClick={() => {
                          const newTransmission = filters.transmission.includes(option.id)
                            ? filters.transmission.filter((t) => t !== option.id)
                            : [...filters.transmission, option.id]
                          updateFilters({ transmission: newTransmission })
                        }}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Fuel Type */}
                <div className="space-y-4">
                  <Label className="text-base font-medium text-[#050b20]">{t('fuel.title')}</Label>
                  <div className="flex gap-3">
                    {fuelOptions.map((option) => (
                      <Button
                        key={option.id}
                        variant={filters.fuel.includes(option.id) ? "default" : "outline"}
                        size="sm"
                        className={`rounded-2xl px-4 py-2 transition-all hover:scale-105 ${
                          filters.fuel.includes(option.id) ? "bg-[#050b20] text-white" : "border-gray-300"
                        }`}
                        onClick={() => {
                          const newFuel = filters.fuel.includes(option.id)
                            ? filters.fuel.filter((f) => f !== option.id)
                            : [...filters.fuel, option.id]
                          updateFilters({ fuel: newFuel })
                        }}
                      >
                        <Fuel className="mr-2 h-4 w-4" />
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Seats (for minibus/car) */}
                {(vehicleType === "minibus" || vehicleType === "car" || vehicleType === "all") && (
                  <div className="space-y-4">
                    <Label className="text-base font-medium text-[#050b20]">{t('seats.title')}</Label>
                    <div className="px-4">
                      <Slider
                        value={filters.seats}
                        onValueChange={(value) => updateFilters({ seats: value as [number, number] })}
                        max={9}
                        min={2}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>{t('seats.range', { min: filters.seats[0], max: filters.seats[1] })}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Vehicle Types */}
                <div>
                  <Label className="text-base font-medium text-[#050b20]">{t('vehicleType.label')}</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {vehicleTypes.map((type) => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={type.id}
                          checked={filters.vehicleTypes.includes(type.id)}
                          onCheckedChange={(checked) => {
                            const newTypes = checked
                              ? [...filters.vehicleTypes, type.id]
                              : filters.vehicleTypes.filter((t) => t !== type.id);
                            
                            const availableModels = getFilteredModels(newTypes);
                            const updatedModels = filters.models.filter(model => 
                              availableModels.some(m => m.value === model)
                            );
                            
                            const availableFeatures = getFilteredFeatures(newTypes);
                            const updatedFeatures = filters.features.filter(feature =>
                              availableFeatures.some(f => f.value === feature)
                            );
                            
                            updateFilters({ 
                              vehicleTypes: newTypes,
                              models: updatedModels,
                              features: updatedFeatures
                            });
                          }}
                        />
                        <Label htmlFor={type.id} className="text-sm font-normal cursor-pointer">
                          {type.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Models */}
                <div>
                  <Label className="text-base font-medium text-[#050b20]">Model</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {getFilteredModels(filters.vehicleTypes).map((model) => (
                      <div key={model.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={model.value}
                          checked={filters.models.includes(model.value)}
                          onCheckedChange={(checked) => {
                            const newModels = checked
                              ? [...filters.models, model.value]
                              : filters.models.filter((m) => m !== model.value);
                            updateFilters({ models: newModels });
                          }}
                        />
                        <Label htmlFor={model.value} className="text-sm font-normal cursor-pointer">
                          {model.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <Label className="text-base font-medium text-[#050b20]">Kenmerken</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {getFilteredFeatures(filters.vehicleTypes).map((feature) => (
                      <div key={feature.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={feature.value}
                          checked={filters.features.includes(feature.value)}
                          onCheckedChange={(checked) => {
                            const newFeatures = checked
                              ? [...filters.features, feature.value]
                              : filters.features.filter((f) => f !== feature.value);
                            updateFilters({ features: newFeatures });
                          }}
                        />
                        <Label htmlFor={feature.value} className="text-sm font-normal cursor-pointer">
                          {feature.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-4">
                  <Label className="text-base font-medium text-[#050b20]">{t('duration.label')}</Label>
                  <div className="flex flex-wrap gap-3">
                    {durations.map((duration) => (
                      <Button
                        key={duration.value}
                        variant={filters.duration === duration.value ? "default" : "outline"}
                        size="sm"
                        className={`rounded-2xl px-4 py-2 transition-all hover:scale-105 ${
                          filters.duration === duration.value ? "bg-[#050b20] text-white" : "border-gray-300"
                        }`}
                        onClick={() => updateFilters({ duration: duration.value })}
                      >
                        {duration.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-between items-center pt-6 border-t">
                <Button variant="ghost" onClick={clearAllFilters} className="text-gray-600 hover:text-gray-800">
                  {t('filters.clearAll')}
                </Button>
                <Button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="bg-[#050b20] hover:bg-[#0a1530] text-white px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  {t('filters.show')} ({getActiveFiltersCount()} {t('filters.button').toLowerCase()})
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Clear Filters */}
          {getActiveFiltersCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-10 px-4 rounded-2xl text-gray-600 hover:text-gray-800 min-w-fit hover:bg-gray-100 transition-all"
            >
              <X className="mr-2 h-4 w-4" />
              {t('activeFilters.clear')}
            </Button>
          )}
        </div>

        {/* Active Filters */}
        {getActiveFiltersCount() > 0 && (
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <span className="text-sm text-gray-600">{t('activeFilters.title')}:</span>
            {filters.location && (
              <Badge variant="secondary" className="rounded-2xl px-3 py-1 shadow-sm">
                {filters.location}
                <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => updateFilters({ location: "" })} />
              </Badge>
            )}
            {filters.duration !== "day" && (
              <Badge variant="secondary" className="rounded-2xl px-3 py-1 shadow-sm">
                {durations.find(d => d.value === filters.duration)?.label}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => updateFilters({ duration: "day" })}
                />
              </Badge>
            )}
            {filters.vehicleTypes.map((type) => (
              <Badge key={type} variant="secondary" className="rounded-2xl px-3 py-1 shadow-sm">
                {vehicleTypes.find((v) => v.id === type)?.label}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => updateFilters({ vehicleTypes: filters.vehicleTypes.filter((t) => t !== type) })}
                />
              </Badge>
            ))}
            {filters.models.map((model) => {
              const modelInfo = models.find(m => m.value === model);
              return (
                <Badge key={model} variant="secondary" className="rounded-2xl px-3 py-1 shadow-sm">
                  {modelInfo?.label}
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer"
                    onClick={() => updateFilters({ models: filters.models.filter((m) => m !== model) })}
                  />
                </Badge>
              );
            })}
            {filters.features.map((feature) => {
              const featureInfo = features.find(f => f.value === feature);
              return (
                <Badge key={feature} variant="secondary" className="rounded-2xl px-3 py-1 shadow-sm">
                  {featureInfo?.label}
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer"
                    onClick={() => updateFilters({ features: filters.features.filter((f) => f !== feature) })}
                  />
                </Badge>
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}
