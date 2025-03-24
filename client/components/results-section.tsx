"use client"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ResultsSectionProps {
  deviceName: string
  issue: string
  onReset: () => void
}

export default function ResultsSection({ deviceName, issue, onReset }: ResultsSectionProps) {
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

      <div className="text-center">
        <Button onClick={onReset} variant="outline" className="group backdrop-blur-sm bg-card/90">
          <ArrowRight className="mr-2 h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          Try Another Device
        </Button>
      </div>
    </div>
  )
}

