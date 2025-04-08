"use client"

import { ArrowLeft, ExternalLink, MapPin } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useAppContext } from "@/context/app-context"

import { BackgroundEffects } from "@/components/background-effects"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function RecyclingPage() {
  const [zipCode, setZipCode] = useState("")
  const { formData } = useAppContext()
  const { deviceName } = formData

  const recyclingOptions = [
    {
      name: "EcoTech Recycling Center",
      description: "Certified e-waste handler that ensures proper disposal of electronics",
      address: "123 Green Street, Eco City",
      distance: "2.3 miles",
      acceptedItems: ["Computers", "Phones", "Tablets", "TVs", "Batteries"],
      website: "https://example.com/ecotech",
    },
    {
      name: "GreenDrop Electronics",
      description: "Donation center that refurbishes and donates working electronics to schools",
      address: "456 Recycle Avenue, Eco City",
      distance: "3.7 miles",
      acceptedItems: ["Computers", "Phones", "Tablets", "Printers"],
      website: "https://example.com/greendrop",
    },
    {
      name: "City Recycling Facility",
      description: "Municipal recycling center with dedicated e-waste collection",
      address: "789 Sustainability Blvd, Eco City",
      distance: "5.1 miles",
      acceptedItems: ["All electronics", "Batteries", "Light bulbs", "Appliances"],
      website: "https://example.com/cityrecycling",
    },
  ]

  return (
    <main className="min-h-screen flex flex-col transition-colors duration-300 relative">
      <BackgroundEffects />

      <div className="fixed top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="container max-w-4xl py-12 space-y-8 relative z-1">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Results
            </Button>
          </Link>
        </div>

        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">Recycling & E-Waste Disposal</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find local drop-off centers and learn how to responsibly recycle your {deviceName || "old electronics"}.
          </p>
        </div>

        <Card className="backdrop-blur-sm bg-card/90">
          <CardHeader>
            <CardTitle>Why Recycle Electronics?</CardTitle>
            <CardDescription>
              Electronic waste contains valuable materials that can be recovered and reused, as well as hazardous
              substances that need proper handling.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-primary/10 rounded-lg">
                <h3 className="font-medium text-primary mb-2">Reduce Environmental Impact</h3>
                <p className="text-sm">
                  Prevents toxic materials like lead, mercury, and cadmium from contaminating soil and water.
                </p>
              </div>
              <div className="p-4 bg-accent/10 rounded-lg">
                <h3 className="font-medium text-accent mb-2">Conserve Resources</h3>
                <p className="text-sm">
                  Recovers valuable materials like gold, silver, copper, and rare earth elements for reuse.
                </p>
              </div>
              <div className="p-4 bg-secondary/10 rounded-lg">
                <h3 className="font-medium text-secondary-foreground mb-2">Support Communities</h3>
                <p className="text-sm">
                  Creates green jobs and provides refurbished technology to schools and low-income families.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Find Local Recycling Centers</h2>
            <div className="relative w-48">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter ZIP code"
                className="pl-10"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-6">
            {recyclingOptions.map((option, index) => (
              <Card key={index} className="backdrop-blur-sm bg-card/90">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{option.name}</CardTitle>
                      <CardDescription>{option.description}</CardDescription>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{option.distance}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">
                    <span className="font-medium">Address:</span> {option.address}
                  </p>
                  <div>
                    <span className="text-sm font-medium">Accepted items:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {option.acceptedItems.map((item, itemIndex) => (
                        <span key={itemIndex} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="ml-auto" asChild>
                    <Link href={option.website} target="_blank" rel="noopener noreferrer">
                      Visit Website
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
