"use client"

import type React from "react"

import { useState } from "react"
import { GalleryVerticalEnd, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { EmployeeSignUp } from "@/server/Employee"
import { EmployeeSignUpSchema } from "@/schema/Employee"
import { authClient } from "@/lib/auth-client"

export default function RegisterPageComponent() {
  const [showOtpForm, setShowOtpForm] = useState(false)
  const [email, setEmail] = useState("")
  const [FullName, setFullName] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [otp, setOtp] = useState("")

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate form inputs
    const ValidatedInput = EmployeeSignUpSchema.safeParse({
      fullName: FullName,
      email,
      password,
    })
    if (!ValidatedInput.success) {
      setIsLoading(false)
      console.error("ValidatedInput Error",ValidatedInput.error )
      return
    }

    // Simulate API call
    try {
      const User = await EmployeeSignUp({
        fullName: ValidatedInput.data.fullName,
        email: ValidatedInput.data.email,
        password: ValidatedInput.data.password,
      })
      console.log("user", User)
      if (User.error) {
        setIsLoading(false)
        alert(User.message)
        return
      }

    } catch (error) {
      setIsLoading(false)
      alert("An error occurred while signing up. Please try again.")
      return
    }

    // Here you would typically call your API to register the user and send OTP
    setIsLoading(false)
    setShowOtpForm(true)
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    try {
      const { data, error } = await authClient.emailOtp.verifyEmail({ email, otp });
      
      if (error) {
        throw new Error(error.message || "OTP verification failed");
      }

      // Handle successful verification
      alert("OTP verification successful!");
      // Consider redirecting or updating state here instead of just alerting
    } catch (error) {
      alert(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsVerifying(false);
    }
  }

  const handleOtpChange = (value: string) => {
    setOtp(value)
  }

  return (
    <AnimatePresence mode="wait">
      {!showOtpForm ? (
        <motion.div
          key="signup"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <SignupForm
            onSubmit={handleSignup}
            onEmailChange={(e) => setEmail(e.target.value)}
            onFullNameChange={(e) => setFullName(e.target.value)}
            onPasswordChange={(e) => setPassword(e.target.value)}
            isLoading={isLoading}
          />
        </motion.div>
      ) : (
        <motion.div
          key="otp"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <OtpVerificationForm
            onSubmit={handleVerifyOtp}
            email={email}
            isVerifying={isVerifying}
            otp={otp}
            onOtpChange={handleOtpChange}
          />
        </motion.div>
      )}
    </AnimatePresence>

  )
}

function SignupForm({
  className,
  onSubmit,
  onEmailChange,
  onFullNameChange,
  onPasswordChange,
  isLoading,
  ...props
}: React.ComponentPropsWithoutRef<"form"> & {
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onFullNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  isLoading: boolean
}) {
  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={onSubmit} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-balance text-sm text-muted-foreground">Enter your details below to create your account</p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" type="text" onChange={onFullNameChange} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" onChange={onEmailChange} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" onChange={onPasswordChange} required />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing up...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/Auth/Org/Login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
      </div>
      <Button variant="outline" className="w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            fill="currentColor"
          />
        </svg>
        Login with GitHub
      </Button>
    </form>
  )
}

function OtpVerificationForm({
  className,
  onSubmit,
  email,
  isVerifying,
  otp,
  onOtpChange,
  ...props
}: React.ComponentPropsWithoutRef<"form"> & {
  email: string
  isVerifying: boolean
  otp: string
  onOtpChange: (value: string) => void
}) {
  const [isResending, setIsResending] = useState(false)

  const handleResend = async () => {
    setIsResending(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsResending(false)
    // Show success message
    alert("Verification code resent!")
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={onSubmit} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <motion.h1
          className="text-2xl font-bold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Verify your email
        </motion.h1>
        <motion.p
          className="text-balance text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Enter the code that has been sent to your email
          {email && <span className="font-medium"> ({email})</span>}
        </motion.p>
      </div>
      <motion.div
        className="grid gap-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="grid gap-2">
          <Label htmlFor="otp">Verification Code</Label>
          <div className="flex justify-center py-2">
            <InputOTP maxLength={6} value={otp} onChange={onOtpChange}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={isVerifying || otp.length < 6}>
          {isVerifying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify"
          )}
        </Button>
      </motion.div>
      <div className="text-center text-sm">
        Didn&apos;t receive a code?{" "}
        <button type="button" className="underline underline-offset-4" onClick={handleResend} disabled={isResending}>
          {isResending ? (
            <span className="inline-flex items-center">
              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
              Resending...
            </span>
          ) : (
            "Resend"
          )}
        </button>
      </div>
    </form>
  )
}
