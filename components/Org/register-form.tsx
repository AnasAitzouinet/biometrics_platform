"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { z } from "zod"
import { EmployeeSignUp } from "@/server/Employee"
import { EmployeeSignUpSchema } from "@/schema/Employee"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function RegisterPageComponent() {
  const [showOtpForm, setShowOtpForm] = useState(false)
  const [emailForOtp, setEmailForOtp] = useState("")
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof EmployeeSignUpSchema>>({
    resolver: zodResolver(EmployeeSignUpSchema),
    defaultValues: { fullName: "", email: "", password: "" },
  })

  const onSubmit = async (values: z.infer<typeof EmployeeSignUpSchema>) => {
    try {
      const { fullName, email, password } = values
      const response = await EmployeeSignUp({ fullName, email, password })
      if (response.error) {
        toast.error(response.message)
        return
      }
      toast.success("Sign up successful! Check your email for the OTP.")
      setEmailForOtp(email)
      setShowOtpForm(true)
    } catch {
      toast.error("An error occurred while signing up. Please try again.")
    }
  }

  const handleVerifyOtp = async () => {
    if (otp.length < 6) return
    setIsVerifying(true)
    try {
      const { data, error } = await authClient.emailOtp.verifyEmail({
        email: emailForOtp,
        otp,
      })
      if (error) throw new Error(error.message || "OTP verification failed")
      toast.success("OTP verification successful!")
      // TODO: redirect or update user context
      router.push("/onboarding")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Verification failed.")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResend = async () => {
    setIsVerifying(true)
    try {
      // implement resend OTP API call
      const cd = await authClient.emailOtp.sendVerificationOtp({
        email: emailForOtp,
        type: "email-verification",
      })
      console.log(cd)
      toast.success("Verification code resent!")
    } catch {
      toast.error("Failed to resend code. Please try again.")
    } finally {
      setIsVerifying(false)
    }
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
          <SignupForm form={form} onSubmit={onSubmit} />
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
            email={emailForOtp}
            otp={otp}
            setOtp={setOtp}
            onVerify={handleVerifyOtp}
            onResend={handleResend}
            isVerifying={isVerifying}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface SignupFormProps {
  form: ReturnType<typeof useForm<z.infer<typeof EmployeeSignUpSchema>>>
  onSubmit: (values: z.infer<typeof EmployeeSignUpSchema>) => void
}

function SignupForm({ form, onSubmit }: SignupFormProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
        noValidate
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below to create your account
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="m@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
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
          Already have an account?{' '}
          <Link href="/Auth/Emp/Login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </form>
    </Form>
  )
}

interface OtpVerificationFormProps {
  email: string
  otp: string
  setOtp: (val: string) => void
  onVerify: () => void
  onResend: () => void
  isVerifying: boolean
}

function OtpVerificationForm({
  email,
  otp,
  setOtp,
  onVerify,
  onResend,
  isVerifying,
}: OtpVerificationFormProps) {
  return (
    <div className="flex flex-col gap-6">
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
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Enter the code sent to{' '}
          <span className="font-medium">{email}</span>
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
            <InputOTP maxLength={6} value={otp} onChange={(v) => setOtp(v)}>
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
        <Button
          onClick={onVerify}
          className="w-full"
          disabled={isVerifying || otp.length < 6}
        >
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
        Didn’t receive a code?{' '}
        <button
          onClick={onResend}
          className="underline underline-offset-4"
          disabled={isVerifying}
        >
          {isVerifying ? (
            <span className="inline-flex items-center">
              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
              Resending...
            </span>
          ) : (
            "Resend"
          )}
        </button>
      </div>
    </div>
  )
}
