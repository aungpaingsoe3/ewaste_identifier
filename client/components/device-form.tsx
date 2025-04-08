"use client"

import type * as React from "react"
import { ArrowRight, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface DeviceFormProps {
  formData: {
    deviceName: string
    issue: string
  }
  isSubmitting: boolean
  onSubmit: (e: React.FormEvent) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export default function DeviceForm({ formData, isSubmitting, onSubmit, onChange }: DeviceFormProps) {
  return (
    <Card className="p-6 md:p-8 animate-fade-in backdrop-blur-sm bg-card/90">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <div className="relative">
            <Input
              id="deviceName"
              name="deviceName"
              value={formData.deviceName}
              onChange={onChange}
              className="peer pt-6 pb-2"
              placeholder=" "
              required
            />
            <Label
              htmlFor="deviceName"
              className="absolute left-3 top-2 text-xs text-muted-foreground peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs transition-all"
            >
              Device Name
            </Label>
          </div>
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Textarea
              id="issue"
              name="issue"
              value={formData.issue}
              onChange={onChange}
              className="peer pt-6 min-h-[120px]"
              placeholder=" "
              required
            />
            <Label
              htmlFor="issue"
              className="absolute left-3 top-2 text-xs text-muted-foreground peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs transition-all"
            >
              What's not working?
            </Label>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full group relative overflow-hidden transition-all duration-300 hover:shadow-lg"
          disabled={isSubmitting}
        >
          <span
            className={cn(
              "inline-flex items-center transition-transform duration-300",
              isSubmitting ? "translate-y-10 opacity-0" : "translate-y-0 opacity-100",
            )}
          >
            Find Solutions <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </span>
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-transform duration-300",
              isSubmitting ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0",
            )}
          >
            <Loader2 className="h-5 w-5 animate-spin" />
          </span>
        </Button>
      </form>
    </Card>
  )
}
