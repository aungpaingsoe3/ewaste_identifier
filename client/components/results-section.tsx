"use client"
import { ArrowRight, Wrench, Recycle } from "lucide-react"
import { useAppContext } from "@/context/app-context"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function ResultsSection() {
  const { formData, resetForm } = useAppContext()
  const { deviceName, issue } = formData

  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="p-6 md:p-8 backdrop-blur-sm bg-card/90">
        <h2 className="text-2xl font-bold mb-4">Repair Options for {deviceName}</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-primary mb-2">DIY Repair Tips</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Try a factory reset before any hardware intervention</li>
              <li>Check for loose connections or damaged cables</li>
              <li>Clean dust from internal components (if you're comfortable opening the device)</li>
              <li>For battery issues, try removing and reinserting the battery if possible</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-primary mb-2">Local Repair Services</h3>
            <p>We've found several certified repair shops in your area:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>TechFix Solutions - Specializes in {deviceName} repairs</li>
              <li>Green Electronics Repair - Eco-friendly repair service</li>
              <li>Community Repair Café - Volunteer-based repair assistance</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-primary mb-2">Recycling Options</h3>
            <p>If repair isn't possible, consider these responsible recycling options:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>EcoTech Recycling Center - Certified e-waste handler</li>
              <li>Manufacturer Take-Back Program - Check if {deviceName}'s manufacturer offers recycling</li>
              <li>Local Electronics Store - Many offer free recycling for old devices</li>
            </ul>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Link href="/troubleshooting" className="block">
          <Card className="h-full p-6 transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer border-2 border-primary/20 hover:border-primary">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Wrench className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Troubleshooting Guide</h3>
                <p className="text-muted-foreground">
                  Step-by-step instructions to diagnose and fix common issues with your {deviceName}.
                </p>
              </div>
              <Button variant="outline" className="mt-2">
                View Troubleshooting Guide
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </Link>

        <Link href="/recycling" className="block">
          <Card className="h-full p-6 transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer border-2 border-accent/20 hover:border-accent">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 rounded-full bg-accent/10 text-accent">
                <Recycle className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Recycling & Disposal</h3>
                <p className="text-muted-foreground">
                  Find local drop-off centers and learn how to responsibly recycle your electronics.
                </p>
              </div>
              <Button variant="outline" className="mt-2">
                Explore Recycling Options
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </Link>
      </div>

      <div className="text-center">
        <Button onClick={resetForm} variant="outline" className="group backdrop-blur-sm bg-card/90">
          <ArrowRight className="mr-2 h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          Try Another Device
        </Button>
      </div>
    </div>
  )
}
