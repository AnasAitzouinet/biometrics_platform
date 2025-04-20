"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { EmployeeOnboardingProvider } from "@/contexts/employee-onboarding-context"
import { InvitationCheck } from "@/components/Emp/onboarding/invitation-check"
import { PersonalDetails } from "@/components/Emp/onboarding/personal-details"
import { ProfileSetup } from "@/components/Emp/onboarding/profile-setup"
import { CompletionStep } from "@/components/Emp/onboarding/completion-step"
import { Building2, Loader2 } from "lucide-react"

export default function OnboardingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [inviteId, setInviteId] = useState<string | null>(null)
  const [inviteDetails, setInviteDetails] = useState<{
    email: string
    organizationName: string
    role: string
  } | null>(null)

  // Check for invitation ID in URL
  useEffect(() => {
    const inviteParam = searchParams.get("invite")
    if (inviteParam) {
      setInviteId(inviteParam)
      // Simulate API call to verify invitation
      setTimeout(() => {
        // Mock invitation details - in a real app, this would come from your API
        setInviteDetails({
          email: "employee@example.com",
          organizationName: "Acme Inc.",
          role: "employee",
        })
        setIsLoading(false)
      }, 1500)
    } else {
      setIsLoading(false)
    }
  }, [searchParams])

  // Handle step navigation
  const nextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  // Handle invitation verification
  const verifyInvitation = (id: string) => {
    setIsLoading(true)
    // Simulate API call to verify invitation
    setTimeout(() => {
      setInviteId(id)
      // Mock invitation details - in a real app, this would come from your API
      setInviteDetails({
        email: "employee@example.com",
        organizationName: "Acme Inc.",
        role: "employee",
      })
      setIsLoading(false)

      // Update URL with invitation ID
      router.push(`/onboarding?invite=${id}`)
    }, 1500)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30">
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
          <h2 className="text-xl font-medium">Verifying your invitation...</h2>
          <p className="mt-2 text-muted-foreground">Please wait while we check your invitation details</p>
        </div>
      </div>
    )
  }

  return (
    <EmployeeOnboardingProvider>
      <div className="min-h-svh bg-gradient-to-b from-background to-muted/30">
        <div className="mx-auto flex min-h-svh max-w-7xl flex-col">
          <header className="flex items-center justify-between border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="text-lg font-semibold">OrganizeHub</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Need help?{" "}
              <a href="#" className="text-primary underline-offset-4 hover:underline">
                Contact support
              </a>
            </div>
          </header>

          <main className="flex flex-1 flex-col items-center justify-center p-6">
            <div className="w-full max-w-2xl">
              <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
                <AnimatePresence mode="wait">
                  {!inviteId && currentStep === 0 && (
                    <InvitationCheck key="invitation-check" onVerify={verifyInvitation} />
                  )}
                  {inviteId && currentStep === 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="p-8"
                    >
                      <div className="mb-8 text-center">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                          <CheckCircleIcon className="h-10 w-10" />
                        </div>
                        <h1 className="mb-2 text-2xl font-bold">Invitation Verified!</h1>
                        <p className="text-muted-foreground">
                          You've been invited to join{" "}
                          <span className="font-medium">{inviteDetails?.organizationName}</span> as a{" "}
                          <span className="font-medium">{inviteDetails?.role}</span>.
                        </p>
                      </div>
                      <div className="rounded-lg border bg-muted/20 p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Mail className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Invitation sent to:</p>
                            <p className="font-medium">{inviteDetails?.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-8 flex justify-center">
                        <Button onClick={nextStep} className="gap-2">
                          Continue <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                  {currentStep === 1 && (
                    <PersonalDetails
                      key="personal-details"
                      onNext={nextStep}
                      onPrevious={prevStep}
                      email={inviteDetails?.email || ""}
                    />
                  )}
                  {currentStep === 2 && <ProfileSetup key="profile-setup" onNext={nextStep} onPrevious={prevStep} />}
                  {currentStep === 3 && (
                    <CompletionStep key="completion" organizationName={inviteDetails?.organizationName || ""} />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </main>
        </div>
      </div>
    </EmployeeOnboardingProvider>
  )
}

// Import these components to avoid errors
import { CheckCircleIcon, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
