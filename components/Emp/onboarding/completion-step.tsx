"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEmployeeOnboarding } from "@/contexts/employee-onboarding-context"

interface CompletionStepProps {
  organizationName: string
}

export function CompletionStep({ organizationName }: CompletionStepProps) {
  const { state, setComplete } = useEmployeeOnboarding()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false)
      setComplete(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [setComplete])

  if (isLoading) {
    return (
      <div className="flex h-96 flex-col items-center justify-center p-8">
        <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
        <h2 className="text-xl font-medium">Finalizing your profile...</h2>
        <p className="mt-2 text-muted-foreground">This will only take a moment</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >
      <div className="mb-8 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600"
        >
          <CheckCircle2 className="h-12 w-12" />
        </motion.div>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-2 text-2xl font-bold"
        >
          Welcome Aboard!
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground"
        >
          Your profile has been set up successfully. You're now ready to join {organizationName}.
        </motion.p>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mb-8 rounded-lg border bg-muted/20 p-6"
      >
        <h3 className="mb-4 font-medium">What's Next?</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="mt-0.5 rounded-full bg-primary/10 p-1 text-primary">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <span className="font-medium">Explore your dashboard</span>
              <p className="text-sm text-muted-foreground">Get familiar with the platform and its features</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-0.5 rounded-full bg-primary/10 p-1 text-primary">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <span className="font-medium">Meet your team</span>
              <p className="text-sm text-muted-foreground">Connect with your colleagues and team members</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-0.5 rounded-full bg-primary/10 p-1 text-primary">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <span className="font-medium">Complete your training</span>
              <p className="text-sm text-muted-foreground">Check your email for training materials and resources</p>
            </div>
          </li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex justify-center"
      >
        <Button asChild size="lg" className="gap-2">
          <a href="/dashboard">
            Go to Dashboard <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </motion.div>
    </motion.div>
  )
}
