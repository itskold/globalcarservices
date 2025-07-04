"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateTimePicker } from "@/components/ui/date-time-picker"
import { MapPin, Calendar, Clock } from "lucide-react"
import { useParams } from "next/navigation"
import { EditableTranslationText } from './admin/editable-translation-text'
import { useTranslations } from 'next-intl'

const EditableDateTimePicker = ({ 
  date, 
  onDateChange, 
  placeholderId, 
  namespace 
}: { 
  date: Date | undefined, 
  onDateChange: (date: Date | undefined) => void,
  placeholderId: string,
  namespace: string
}) => {
  const t = useTranslations(namespace)
  return (
    <div className="relative">
      <DateTimePicker
        date={date}
        onDateChange={onDateChange}
        placeholder={t(placeholderId)}
      />
      <div className="absolute opacity-0 pointer-events-none">
        <EditableTranslationText namespace={namespace} id={placeholderId} />
      </div>
    </div>
  )
}

export default function SearchSection() {
  const params = useParams()
  const locale = params.locale as string

  const [pickupLocation, setPickupLocation] = useState("antwerpen")
  const [returnLocation, setReturnLocation] = useState("antwerpen")
  const [vehicleType, setVehicleType] = useState("van")
  const [pickupDateTime, setPickupDateTime] = useState<Date | undefined>(undefined)
  const [returnDateTime, setReturnDateTime] = useState<Date | undefined>(undefined)

  return (
    <section className="py-16 bg-white rounded-t-[4rem] border-t-4 border-[#FFFFFF] -mt-16 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#050b20] mb-4">
            <EditableTranslationText namespace="searchSection" id="title" />
          </h2>
          <p className="text-xl text-gray-600">
            <EditableTranslationText namespace="searchSection" id="subtitle" />
          </p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Pickup Location */}
              <div className="space-y-2">
                <Label htmlFor="pickup-location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <EditableTranslationText namespace="searchSection" id="pickupLocation.label" />
                </Label>
                <Select value={pickupLocation} onValueChange={setPickupLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder={<EditableTranslationText namespace="searchSection" id="pickupLocation.placeholder" />}>
                      {pickupLocation === "antwerpen" && <EditableTranslationText namespace="searchSection" id="locations.antwerpen" />}
                      {pickupLocation === "gent" && <EditableTranslationText namespace="searchSection" id="locations.gent" />}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="antwerpen">
                      <EditableTranslationText namespace="searchSection" id="locations.antwerpen" />
                    </SelectItem>
                    <SelectItem value="gent">
                      <EditableTranslationText namespace="searchSection" id="locations.gent" />
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Return Location */}
              <div className="space-y-2">
                <Label htmlFor="return-location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <EditableTranslationText namespace="searchSection" id="returnLocation.label" />
                </Label>
                <Select value={returnLocation} onValueChange={setReturnLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder={<EditableTranslationText namespace="searchSection" id="returnLocation.placeholder" />}>
                      {returnLocation === "antwerpen" && <EditableTranslationText namespace="searchSection" id="locations.antwerpen" />}
                      {returnLocation === "gent" && <EditableTranslationText namespace="searchSection" id="locations.gent" />}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="antwerpen">
                      <EditableTranslationText namespace="searchSection" id="locations.antwerpen" />
                    </SelectItem>
                    <SelectItem value="gent">
                      <EditableTranslationText namespace="searchSection" id="locations.gent" />
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Vehicle Type */}
              <div className="space-y-2">
                <Label htmlFor="vehicle-type">
                  <EditableTranslationText namespace="searchSection" id="vehicleType.label" />
                </Label>
                <Select value={vehicleType} onValueChange={setVehicleType}>
                  <SelectTrigger>
                    <SelectValue placeholder={<EditableTranslationText namespace="searchSection" id="vehicleType.placeholder" />}>
                      {vehicleType === "van" && <EditableTranslationText namespace="searchSection" id="vehicleType.options.van" />}
                      {vehicleType === "minibus" && <EditableTranslationText namespace="searchSection" id="vehicleType.options.minibus" />}
                      {vehicleType === "car" && <EditableTranslationText namespace="searchSection" id="vehicleType.options.car" />}
                      {vehicleType === "truck" && <EditableTranslationText namespace="searchSection" id="vehicleType.options.truck" />}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="van">
                      <EditableTranslationText namespace="searchSection" id="vehicleType.options.van" />
                    </SelectItem>
                    <SelectItem value="minibus">
                      <EditableTranslationText namespace="searchSection" id="vehicleType.options.minibus" />
                    </SelectItem>
                    <SelectItem value="car">
                      <EditableTranslationText namespace="searchSection" id="vehicleType.options.car" />
                    </SelectItem>
                    <SelectItem value="truck">
                      <EditableTranslationText namespace="searchSection" id="vehicleType.options.truck" />
                    </SelectItem>
                    <SelectItem value="aanhangwagen">
                      <EditableTranslationText namespace="searchSection" id="vehicleType.options.aanhangwagen" />
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Pickup Date & Time */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <EditableTranslationText namespace="searchSection" id="pickupDateTime.label" />
                </Label>
                <EditableDateTimePicker
                  date={pickupDateTime}
                  onDateChange={setPickupDateTime}
                  namespace="searchSection"
                  placeholderId="pickupDateTime.placeholder"
                />
              </div>

              {/* Return Date & Time */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <EditableTranslationText namespace="searchSection" id="returnDateTime.label" />
                </Label>
                <EditableDateTimePicker
                  date={returnDateTime}
                  onDateChange={setReturnDateTime}
                  namespace="searchSection"
                  placeholderId="returnDateTime.placeholder"
                />
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <Button className="w-full bg-[#050b20] hover:bg-[#0a1530] text-white">
                  <EditableTranslationText namespace="searchSection" id="searchButton" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
