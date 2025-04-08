"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

interface FormData {
  deviceName: string
  issue: string
}

interface AppContextType {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  showResults: boolean
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>
  isSubmitting: boolean
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
  handleSubmit: (e: React.FormEvent) => void
  resetForm: () => void
}

const defaultContext: AppContextType = {
  formData: { deviceName: "", issue: "" },
  setFormData: () => {},
  showResults: false,
  setShowResults: () => {},
  isSubmitting: false,
  setIsSubmitting: () => {},
  handleSubmit: () => {},
  resetForm: () => {},
}

const AppContext = createContext<AppContextType>(defaultContext)

export const useAppContext = () => useContext(AppContext)

export function AppProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>({
    deviceName: "",
    issue: "",
  })
  const [showResults, setShowResults] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate processing delay
    setTimeout(() => {
      setIsSubmitting(false)
      setShowResults(true)
    }, 1500)
  }

  const resetForm = () => {
    setFormData({ deviceName: "", issue: "" })
    setShowResults(false)
  }

  return (
    <AppContext.Provider
      value={{
        formData,
        setFormData,
        showResults,
        setShowResults,
        isSubmitting,
        setIsSubmitting,
        handleSubmit,
        resetForm,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
