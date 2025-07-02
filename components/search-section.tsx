"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateTimePicker } from "@/components/ui/date-time-picker"
import { MapPin, Calendar, Clock } from "lucide-react"

export default function SearchSection() {
  const [pickupLocation, setPickupLocation] = useState("")
  const [returnLocation, setReturnLocation] = useState("")
  const [vehicleType, setVehicleType] = useState("")
  const [pickupDateTime, setPickupDateTime] = useState<Date | undefined>(undefined)
  const [returnDateTime, setReturnDateTime] = useState<Date | undefined>(undefined)

  return (
    <section className="py-16 bg-white rounded-t-[4rem] border-t-4 border-[#FFFFFF] -mt-16 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#050b20] mb-4">Snel een voertuig huren</h2>
          <p className="text-xl text-gray-600">Vind het perfecte voertuig voor uw behoeften</p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Pickup Location */}
              <div className="space-y-2">
                <Label htmlFor="pickup-location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Ophaallocatie
                </Label>
                <Select value={pickupLocation} onValueChange={setPickupLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer ophaallocatie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="antwerpen">Van Heetveldelei 157, 2100 Antwerpen</SelectItem>
                    <SelectItem value="gent">Baarledorpstraat 51a, 9031 Drongen, Gent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Return Location */}
              <div className="space-y-2">
                <Label htmlFor="return-location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Terugbrenglocatie
                </Label>
                <Select value={returnLocation} onValueChange={setReturnLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer terugbrenglocatie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="antwerpen">Van Heetveldelei 157, 2100 Antwerpen</SelectItem>
                    <SelectItem value="gent">Baarledorpstraat 51a, 9031 Drongen, Gent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Vehicle Type */}
              <div className="space-y-2">
                <Label htmlFor="vehicle-type">Type voertuig</Label>
                <Select value={vehicleType} onValueChange={setVehicleType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="van">Bestelwagen</SelectItem>
                    <SelectItem value="minibus">Minibus</SelectItem>
                    <SelectItem value="car">Personenwagen</SelectItem>
                    <SelectItem value="truck">Vrachtwagen</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Pickup Date & Time */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Ophaaldatum & tijd
                </Label>
                <DateTimePicker
                  date={pickupDateTime}
                  onDateChange={setPickupDateTime}
                  placeholder="Ophaaldatum"
                />
              </div>

              {/* Return Date & Time */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Terugbrengdatum & tijd
                </Label>
                <DateTimePicker
                  date={returnDateTime}
                  onDateChange={setReturnDateTime}
                  placeholder="Inleverdatum"
                />
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <Button className="w-full bg-[#050b20] hover:bg-[#0a1530] text-white">
                  Zoek beschikbare voertuigen
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
