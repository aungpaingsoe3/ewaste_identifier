"use client";

import type React from "react";
import { createContext, useContext, useState, type ReactNode } from "react";

interface FormData {
  deviceName: string;
  issue: string;
}

interface TroubleshootingResponse {
  formatted: string;
  raw: string; // Or any other structure that you get from the API
}

interface AppContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  showResults: boolean;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  troubleshootingResult: TroubleshootingResponse;
  setTroubleshootingResult: React.Dispatch<
    React.SetStateAction<TroubleshootingResponse>
  >;
  handleSubmit: (e: React.FormEvent) => void;
  resetForm: () => void;
}

const defaultContext: AppContextType = {
  formData: { deviceName: "", issue: "" },
  setFormData: () => {},
  showResults: false,
  setShowResults: () => {},
  isSubmitting: false,
  setIsSubmitting: () => {},
  troubleshootingResult: { formatted: "", raw: "" },
  setTroubleshootingResult: () => {},
  handleSubmit: () => {},
  resetForm: () => {},
};

const AppContext = createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);

export function AppProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>({
    deviceName: "",
    issue: "",
  });
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [troubleshootingResult, setTroubleshootingResult] =
    useState<TroubleshootingResponse>({
      formatted: "",
      raw: "",
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsSubmitting(true); // Set submitting state to true (for loading spinner, etc.)

    try {
      // Send a POST request to the /api/troubleshoot endpoint with the form data
      const res = await fetch("/api/troubleshoot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify content type as JSON
        },
        body: JSON.stringify({
          device: formData.deviceName, // Pass the device name from formData
          issue: formData.issue, // Pass the issue from formData
        }),
      });

      // Check if the response is okay
      if (!res.ok) {
        throw new Error("Failed to fetch troubleshooting response");
      }

      // Parse the JSON response
      const data = await res.json();

      // Optionally handle the result (e.g., store it or display it)
      console.log(data.result); // You can set this in state or context if needed

      // Format the result in the context
      const formattedResult = `${data.result} 
        \n*Please follow these steps to resolve the issue. If the issue persists, contact support.*`;

      // Store both raw and formatted result
      setTroubleshootingResult({
        formatted: formattedResult,
        raw: data.result,
      });

      // Show the result in the UI
      setShowResults(true);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false); // Set submitting state back to false after the request completes
    }
  };

  const resetForm = () => {
    setFormData({ deviceName: "", issue: "" });
    setTroubleshootingResult({ formatted: "", raw: "" });
    setShowResults(false);
  };

  return (
    <AppContext.Provider
      value={{
        formData,
        setFormData,
        showResults,
        setShowResults,
        isSubmitting,
        setIsSubmitting,
        troubleshootingResult,
        setTroubleshootingResult,
        handleSubmit,
        resetForm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
