"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateTimePicker } from "@/components/ui/date-time-picker"
import { MapPin, Calendar, Clock } from "lucide-react"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"

export default function SearchSection() {
  const t = useTranslations()
  const params = useParams()
  const locale = params.locale as string

  const [pickupLocation, setPickupLocation] = useState("")
  const [returnLocation, setReturnLocation] = useState("")
  const [vehicleType, setVehicleType] = useState("")
  const [pickupDateTime, setPickupDateTime] = useState<Date | undefined>(undefined)
  const [returnDateTime, setReturnDateTime] = useState<Date | undefined>(undefined)

  return (
    <section className="py-16 bg-white rounded-t-[4rem] border-t-4 border-[#FFFFFF] -mt-16 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#050b20] mb-4">{t("searchSection.title")}</h2>
          <p className="text-xl text-gray-600">{t("searchSection.subtitle")}</p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Pickup Location */}
              <div className="space-y-2">
                <Label htmlFor="pickup-location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {t("searchSection.pickupLocation.label")}
                </Label>
                <Select value={pickupLocation} onValueChange={setPickupLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("searchSection.pickupLocation.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="antwerpen">{t("searchSection.locations.antwerpen")}</SelectItem>
                    <SelectItem value="gent">{t("searchSection.locations.gent")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Return Location */}
              <div className="space-y-2">
                <Label htmlFor="return-location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {t("searchSection.returnLocation.label")}
                </Label>
                <Select value={returnLocation} onValueChange={setReturnLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("searchSection.returnLocation.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="antwerpen">{t("searchSection.locations.antwerpen")}</SelectItem>
                    <SelectItem value="gent">{t("searchSection.locations.gent")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Vehicle Type */}
              <div className="space-y-2">
                <Label htmlFor="vehicle-type">{t("searchSection.vehicleType.label")}</Label>
                <Select value={vehicleType} onValueChange={setVehicleType}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("searchSection.vehicleType.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="van">{t("searchSection.vehicleType.options.van")}</SelectItem>
                    <SelectItem value="minibus">{t("searchSection.vehicleType.options.minibus")}</SelectItem>
                    <SelectItem value="car">{t("searchSection.vehicleType.options.car")}</SelectItem>
                    <SelectItem value="truck">{t("searchSection.vehicleType.options.truck")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Pickup Date & Time */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {t("searchSection.pickupDateTime.label")}
                </Label>
                <DateTimePicker
                  date={pickupDateTime}
                  onDateChange={setPickupDateTime}
                  placeholder={t("searchSection.pickupDateTime.placeholder")}
                />
              </div>

              {/* Return Date & Time */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {t("searchSection.returnDateTime.label")}
                </Label>
                <DateTimePicker
                  date={returnDateTime}
                  onDateChange={setReturnDateTime}
                  placeholder={t("searchSection.returnDateTime.placeholder")}
                />
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <Button className="w-full bg-[#050b20] hover:bg-[#0a1530] text-white">
                  {t("searchSection.searchButton")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
