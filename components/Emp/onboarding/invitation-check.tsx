"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Ticket, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InvitationCheckProps {
  onVerify: (inviteId: string) => void
}

export function InvitationCheck({ onVerify }: InvitationCheckProps) {
  const [inviteId, setInviteId] = useState("")
  const [error, setError] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!inviteId.trim()) {
      setError("Please enter your invitation code")
      return
    }

    setError("")
    setIsVerifying(true)

    // In a real app, you would verify the invitation code with your API
    // For this example, we'll simulate a delay and then call onVerify
    setTimeout(() => {
      onVerify(inviteId)
    }, 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="p-8"
    >
      <div className="mb-8 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Ticket className="h-10 w-10" />
        </div>
        <h1 className="mb-2 text-2xl font-bold">Welcome to OrganizeHub</h1>
        <p className="text-muted-foreground">Enter your invitation code to get started with your onboarding process.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="invite-code" className={error ? "text-destructive" : ""}>
            Invitation Code
          </Label>
          <Input
            id="invite-code"
            value={inviteId}
            onChange={(e) => {
              setInviteId(e.target.value)
              setError("")
            }}
            placeholder="Enter your invitation code"
            className={error ? "border-destructive" : ""}
            disabled={isVerifying}
          />
          {error && <p className="text-xs text-destructive">{error}</p>}
          <p className="text-xs text-muted-foreground">
            Your invitation code was sent to your email address. If you don't have one, please contact your
            administrator.
          </p>
        </div>

        <div className="flex justify-center">
          <Button type="submit" className="gap-2" disabled={isVerifying}>
            {isVerifying ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                Verify Invitation <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
