"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type OrganizationDetails = {
  name: string
  slug: string
  description: string
  image: string
  industry?: string
  size?: string
  website?: string
}

type MemberRole = "admin" | "employee"

type Member = {
  email: string
  role: MemberRole
}

type MembersData = {
  members: Member[]
}

type OnboardingState = {
  organizationDetails: OrganizationDetails
  members: MembersData
  currentStep: number
  userName: string
}

type OnboardingContextType = {
  state: OnboardingState
  updateOrganizationDetails: (data: Partial<OrganizationDetails>) => void
  addMember: (email: string, role: MemberRole) => void
  removeMember: (email: string) => void
  setCurrentStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  setUserName: (name: string) => void
  isLastStep: boolean
  totalSteps: number
}

const defaultState: OnboardingState = {
  organizationDetails: {
    name: "",
    slug: "",
    description: "",
    image: "",
    industry: "",
    size: "",
    website: "",
  },
  members: {
    members: [],
  },
  currentStep: 0,
  userName: "",
}

const OrganizationContext = createContext<OnboardingContextType | undefined>(undefined)

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>(defaultState)
  const totalSteps = 3 // Welcome, Org Details, Members, Success

  const updateOrganizationDetails = (data: Partial<OrganizationDetails>) => {
    setState((prev) => ({
      ...prev,
      organizationDetails: {
        ...prev.organizationDetails,
        ...data,
      },
    }))
  }

  const addMember = (email: string, role: MemberRole) => {
    if (!state.members.members.some((member) => member.email === email)) {
      setState((prev) => ({
        ...prev,
        members: {
          ...prev.members,
          members: [...prev.members.members, { email, role }],
        },
      }))
    }
  }

  const removeMember = (email: string) => {
    setState((prev) => ({
      ...prev,
      members: {
        ...prev.members,
        members: prev.members.members.filter((member) => member.email !== email),
      },
    }))
  }

  const setCurrentStep = (step: number) => {
    setState((prev) => ({
      ...prev,
      currentStep: step,
    }))
  }

  const nextStep = () => {
    if (state.currentStep < totalSteps) {
      setState((prev) => ({
        ...prev,
        currentStep: prev.currentStep + 1,
      }))
    }
  }

  const prevStep = () => {
    if (state.currentStep > 0) {
      setState((prev) => ({
        ...prev,
        currentStep: prev.currentStep - 1,
      }))
    }
  }

  const setUserName = (name: string) => {
    setState((prev) => ({
      ...prev,
      userName: name,
    }))
  }

  return (
    <OrganizationContext.Provider
      value={{
        state,
        updateOrganizationDetails,
        addMember,
        removeMember,
        setCurrentStep,
        nextStep,
        prevStep,
        setUserName,
        isLastStep: state.currentStep === totalSteps,
        totalSteps,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  )
}

export function useOrganization() {
  const context = useContext(OrganizationContext)
  if (context === undefined) {
    throw new Error("useOrganization must be used within an OrganizationProvider")
  }
  return context
}
