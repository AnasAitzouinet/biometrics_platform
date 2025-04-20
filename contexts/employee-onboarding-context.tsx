"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type EmployeeDetails = {
  firstName: string
  lastName: string
  email: string
  phone: string
  jobTitle: string
  department: string
  startDate: string
  profileImage: string | null
  bio: string
  skills: string[]
  socialLinks: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

type EmployeeOnboardingState = {
  employeeDetails: EmployeeDetails
  isComplete: boolean
}

type EmployeeOnboardingContextType = {
  state: EmployeeOnboardingState
  updateEmployeeDetails: (data: Partial<EmployeeDetails>) => void
  addSkill: (skill: string) => void
  removeSkill: (skill: string) => void
  updateSocialLink: (platform: keyof EmployeeDetails["socialLinks"], url: string) => void
  setComplete: (isComplete: boolean) => void
}

const defaultState: EmployeeOnboardingState = {
  employeeDetails: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    department: "",
    startDate: "",
    profileImage: null,
    bio: "",
    skills: [],
    socialLinks: {},
  },
  isComplete: false,
}

const EmployeeOnboardingContext = createContext<EmployeeOnboardingContextType | undefined>(undefined)

export function EmployeeOnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EmployeeOnboardingState>(defaultState)

  const updateEmployeeDetails = (data: Partial<EmployeeDetails>) => {
    setState((prev) => ({
      ...prev,
      employeeDetails: {
        ...prev.employeeDetails,
        ...data,
      },
    }))
  }

  const addSkill = (skill: string) => {
    if (!state.employeeDetails.skills.includes(skill)) {
      setState((prev) => ({
        ...prev,
        employeeDetails: {
          ...prev.employeeDetails,
          skills: [...prev.employeeDetails.skills, skill],
        },
      }))
    }
  }

  const removeSkill = (skill: string) => {
    setState((prev) => ({
      ...prev,
      employeeDetails: {
        ...prev.employeeDetails,
        skills: prev.employeeDetails.skills.filter((s) => s !== skill),
      },
    }))
  }

  const updateSocialLink = (platform: keyof EmployeeDetails["socialLinks"], url: string) => {
    setState((prev) => ({
      ...prev,
      employeeDetails: {
        ...prev.employeeDetails,
        socialLinks: {
          ...prev.employeeDetails.socialLinks,
          [platform]: url,
        },
      },
    }))
  }

  const setComplete = (isComplete: boolean) => {
    setState((prev) => ({
      ...prev,
      isComplete,
    }))
  }

  return (
    <EmployeeOnboardingContext.Provider
      value={{
        state,
        updateEmployeeDetails,
        addSkill,
        removeSkill,
        updateSocialLink,
        setComplete,
      }}
    >
      {children}
    </EmployeeOnboardingContext.Provider>
  )
}

export function useEmployeeOnboarding() {
  const context = useContext(EmployeeOnboardingContext)
  if (context === undefined) {
    throw new Error("useEmployeeOnboarding must be used within an EmployeeOnboardingProvider")
  }
  return context
}
