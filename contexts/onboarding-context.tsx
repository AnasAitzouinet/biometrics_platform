"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type OrganizationData = {
  name: string
  industry: string
  size: string
  website: string
  logo?: File | null
}

type OnboardingContextType = {
  currentStep: number
  totalSteps: number
  organizationData: OrganizationData
  userName: string
  setCurrentStep: (step: number) => void
  updateOrganizationData: (data: Partial<OrganizationData>) => void
  setUserName: (name: string) => void
  nextStep: () => void
  prevStep: () => void
}

const defaultOrganizationData: OrganizationData = {
  name: "",
  industry: "",
  size: "",
  website: "",
  logo: null,
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [organizationData, setOrganizationData] = useState<OrganizationData>(defaultOrganizationData)
  const [userName, setUserName] = useState("")
  const totalSteps = 3

  const updateOrganizationData = (data: Partial<OrganizationData>) => {
    setOrganizationData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        totalSteps,
        organizationData,
        userName,
        setCurrentStep,
        updateOrganizationData,
        setUserName,
        nextStep,
        prevStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider")
  }
  return context
}
