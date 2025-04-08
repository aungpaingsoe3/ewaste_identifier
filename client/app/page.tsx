"use client"

import type * as React from "react"
import { useAppContext } from "@/context/app-context"

import { ThemeToggle } from "@/components/theme-toggle"
import { TypingAnimation } from "@/components/typing-animation"
import DeviceForm from "@/components/device-form"
import ResultsSection from "@/components/results-section"
import { BackgroundEffects } from "@/components/background-effects"

export default function Home() {
  const { formData, setFormData, showResults, isSubmitting, handleSubmit } = useAppContext()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <main className="min-h-screen flex flex-col items-center transition-colors duration-300 relative">
      <BackgroundEffects />

      <div className="fixed top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <section className="w-full max-w-4xl px-4 py-12 md:py-24 lg:py-32 relative z-1">
        <div className="space-y-4 text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">E-Waste Reduction Initiative</h1>
          <div className="h-16 md:h-20 flex items-center justify-center">
            <TypingAnimation
              sequences={[
                "Give your gadgets a second life...",
                2000,
                "Reduce waste, repair smartly...",
                2000,
                "Don't toss it, fix it!",
                2000,
              ]}
              className="text-xl md:text-2xl text-primary"
            />
          </div>
        </div>

        {!showResults ? (
          <DeviceForm
            formData={formData}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onChange={handleInputChange}
          />
        ) : (
          <ResultsSection />
        )}
      </section>
    </main>
  )
}
