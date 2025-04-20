"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft, Loader2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEmployeeOnboarding } from "@/contexts/employee-onboarding-context"

interface PersonalDetailsProps {
  onNext: () => void
  onPrevious: () => void
  email: string
}

export function PersonalDetails({ onNext, onPrevious, email }: PersonalDetailsProps) {
  const { state, updateEmployeeDetails } = useEmployeeOnboarding()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!state.employeeDetails.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!state.employeeDetails.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!state.employeeDetails.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required"
    }

    if (!state.employeeDetails.department.trim()) {
      newErrors.department = "Department is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Set the email from props
      updateEmployeeDetails({ email })

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)
        onNext()
      }, 1000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="p-8"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Personal Details</h2>
        <p className="text-muted-foreground">Tell us about yourself</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="first-name" className={errors.firstName ? "text-destructive" : ""}>
              First Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="first-name"
              value={state.employeeDetails.firstName}
              onChange={(e) => updateEmployeeDetails({ firstName: e.target.value })}
              placeholder="John"
              className={errors.firstName ? "border-destructive" : ""}
              disabled={isSubmitting}
            />
            {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="last-name" className={errors.lastName ? "text-destructive" : ""}>
              Last Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="last-name"
              value={state.employeeDetails.lastName}
              onChange={(e) => updateEmployeeDetails({ lastName: e.target.value })}
              placeholder="Doe"
              className={errors.lastName ? "border-destructive" : ""}
              disabled={isSubmitting}
            />
            {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" value={email} readOnly disabled className="bg-muted" />
          <p className="text-xs text-muted-foreground">This is the email address associated with your invitation.</p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={state.employeeDetails.phone}
            onChange={(e) => updateEmployeeDetails({ phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
            disabled={isSubmitting}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="job-title" className={errors.jobTitle ? "text-destructive" : ""}>
              Job Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="job-title"
              value={state.employeeDetails.jobTitle}
              onChange={(e) => updateEmployeeDetails({ jobTitle: e.target.value })}
              placeholder="Software Engineer"
              className={errors.jobTitle ? "border-destructive" : ""}
              disabled={isSubmitting}
            />
            {errors.jobTitle && <p className="text-xs text-destructive">{errors.jobTitle}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="department" className={errors.department ? "text-destructive" : ""}>
              Department <span className="text-destructive">*</span>
            </Label>
            <select
              id="department"
              value={state.employeeDetails.department}
              onChange={(e) => updateEmployeeDetails({ department: e.target.value })}
              className={`w-full rounded-md border ${
                errors.department ? "border-destructive" : "border-input"
              } bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
              disabled={isSubmitting}
            >
              <option value="">Select department</option>
              <option value="engineering">Engineering</option>
              <option value="product">Product</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
              <option value="customer_support">Customer Support</option>
              <option value="hr">Human Resources</option>
              <option value="finance">Finance</option>
              <option value="operations">Operations</option>
              <option value="other">Other</option>
            </select>
            {errors.department && <p className="text-xs text-destructive">{errors.department}</p>}
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="start-date">Start Date</Label>
          <div className="relative">
            <Input
              id="start-date"
              type="date"
              value={state.employeeDetails.startDate}
              onChange={(e) => updateEmployeeDetails({ startDate: e.target.value })}
              className="pr-10"
              disabled={isSubmitting}
            />
            <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onPrevious} className="gap-2" disabled={isSubmitting}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <Button type="submit" className="gap-2" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                Continue <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
