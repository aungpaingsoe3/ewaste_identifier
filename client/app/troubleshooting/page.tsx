"use client";

import {
  ArrowLeft,
  HelpCircle,
  Search,
  Settings,
  PenToolIcon as Tool,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAppContext } from "@/context/app-context";

import { BackgroundEffects } from "@/components/background-effects";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function TroubleshootingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { formData } = useAppContext();
  const { deviceName } = formData;

  const troubleshootingGuides = [
    {
      title: "Screen Issues",
      description:
        "Troubleshoot blank screens, flickering, or display artifacts",
      icon: <Settings className="h-5 w-5" />,
      steps: [
        "Check if the device is powered on and has sufficient battery",
        "Ensure all cables are properly connected",
        "Try connecting to an external display if possible",
        "Adjust brightness and display settings",
        "Perform a soft reset by powering off and on",
      ],
    },
    {
      title: "Battery Problems",
      description: "Fix issues with battery life, charging, or power",
      icon: <Tool className="h-5 w-5" />,
      steps: [
        "Check if the charger and cable are working properly",
        "Clean charging ports of any dust or debris",
        "Try a different power outlet",
        "Close background apps that might be draining battery",
        "Check for system updates that might improve battery performance",
      ],
    },
    {
      title: "Software Glitches",
      description: "Resolve freezing, crashing, or slow performance",
      icon: <HelpCircle className="h-5 w-5" />,
      steps: [
        "Restart your device",
        "Check for and install software updates",
        "Clear cache and temporary files",
        "Uninstall recently added apps that might be causing issues",
        "Consider resetting to factory settings as a last resort",
      ],
    },
  ];

  const filteredGuides = searchQuery
    ? troubleshootingGuides.filter(
        (guide) =>
          guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          guide.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : troubleshootingGuides;

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
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
            Troubleshooting Guide
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow these step-by-step instructions to diagnose and fix common
            issues with your {deviceName || "electronic device"}.
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for troubleshooting guides..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid gap-6">
          {filteredGuides.map((guide, index) => (
            <Card key={index} className="backdrop-blur-sm bg-card/90">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    {guide.icon}
                  </div>
                  <div>
                    <CardTitle>{guide.title}</CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="font-medium mb-2">Follow these steps:</h4>
                <ol className="list-decimal pl-5 space-y-2">
                  {guide.steps.map((step, stepIndex) => (
                    <li key={stepIndex}>{step}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ))}

          {filteredGuides.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No troubleshooting guides found for "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
