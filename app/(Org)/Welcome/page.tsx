"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { OrganizationProvider, useOrganization } from "@/contexts/organization-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Building2,
  Users,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  X,
  Upload,
  Loader2,
  LinkIcon,
  Info,
  UserCog,
  User,
  Mail,
  Briefcase,
  Globe,
  Users2,
} from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function WelcomePage() {
  return (
    <OrganizationProvider>
      <WelcomeContent />
    </OrganizationProvider>
  )
}

function WelcomeContent() {
  const { state, setUserName, nextStep, prevStep, isLastStep, totalSteps } = useOrganization()

  // For demo purposes, set a default user name
  useEffect(() => {
    if (!state.userName) {
      setUserName("Sarah Johnson")
    }
  }, [state.userName, setUserName])

  return (
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
          <div className="w-full max-w-3xl">
            <div className="mb-8">
              <div className="mb-6 flex justify-between">
                {Array.from({ length: totalSteps + 1 }).map((_, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                        index <= state.currentStep
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground/30 text-muted-foreground"
                      }`}
                    >
                      {index === 0 && <Building2 className="h-5 w-5" />}
                      {index === 1 && <Info className="h-5 w-5" />}
                      {index === 2 && <Users className="h-5 w-5" />}
                      {index === 3 && <CheckCircle2 className="h-5 w-5" />}
                    </div>
                    <div
                      className={`mt-2 text-xs ${
                        index <= state.currentStep ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {index === 0 && "Welcome"}
                      {index === 1 && "Organization"}
                      {index === 2 && "Members"}
                      {index === 3 && "Complete"}
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-primary"
                  initial={{ width: `${(state.currentStep / totalSteps) * 100}%` }}
                  animate={{ width: `${(state.currentStep / totalSteps) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
              <AnimatePresence mode="wait">
                {state.currentStep === 0 && <WelcomeStep key="welcome" />}
                {state.currentStep === 1 && <OrganizationDetailsStep key="details" />}
                {state.currentStep === 2 && <MembersStep key="members" />}
                {state.currentStep === 3 && <CompletionStep key="complete" />}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function WelcomeStep() {
  const { state, nextStep } = useOrganization()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="p-8"
    >
      <div className="mb-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary"
        >
          <Building2 className="h-10 w-10" />
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-3 text-3xl font-bold"
        >
          Welcome, {state.userName}!
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-muted-foreground"
        >
          Let's set up your organization and get you started.
        </motion.p>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mb-8 space-y-4 rounded-lg border bg-muted/30 p-6"
      >
        <h2 className="text-lg font-medium">In this setup, you'll:</h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="mt-0.5 rounded-full bg-primary/10 p-1 text-primary">
              <Info className="h-4 w-4" />
            </div>
            <div>
              <span className="font-medium">Create your organization profile</span>
              <p className="text-sm text-muted-foreground">Set up your organization's details and branding</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-0.5 rounded-full bg-primary/10 p-1 text-primary">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <span className="font-medium">Invite team members</span>
              <p className="text-sm text-muted-foreground">Add admin users to help manage your organization</p>
            </div>
          </li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex justify-end"
      >
        <Button onClick={nextStep} className="gap-2">
          Get Started <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  )
}

function OrganizationDetailsStep() {
  const { state, updateOrganizationDetails, nextStep, prevStep } = useOrganization()
  const [isUploading, setIsUploading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!state.organizationDetails.name.trim()) {
      newErrors.name = "Organization name is required"
    }

    if (!state.organizationDetails.slug.trim()) {
      newErrors.slug = "Slug is required"
    } else if (!/^[a-z0-9-]+$/.test(state.organizationDetails.slug)) {
      newErrors.slug = "Slug can only contain lowercase letters, numbers, and hyphens"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      nextStep()
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true)

      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onloadend = () => {
        // Simulate upload delay
        setTimeout(() => {
          updateOrganizationDetails({ image: reader.result as string })
          setIsUploading(false)
        }, 1500)
      }

      reader.readAsDataURL(file)
    }
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Auto-generate slug from name if empty
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-")
    updateOrganizationDetails({ slug: value })
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
        <h2 className="text-2xl font-bold">Organization Details</h2>
        <p className="text-muted-foreground">Tell us about your organization</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="org-name" className={errors.name ? "text-destructive" : ""}>
              Organization Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="org-name"
              value={state.organizationDetails.name}
              onChange={(e) => {
                updateOrganizationDetails({ name: e.target.value })
                // Auto-generate slug if empty
                if (!state.organizationDetails.slug) {
                  const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-")
                  updateOrganizationDetails({ slug })
                }
              }}
              placeholder="Acme Inc."
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="org-slug" className={errors.slug ? "text-destructive" : ""}>
              Organization Slug <span className="text-destructive">*</span>
            </Label>
            <div className="flex items-center gap-2">
              <div className="flex h-10 items-center rounded-md border bg-muted px-3 text-sm text-muted-foreground">
                organizehub.com/
              </div>
              <Input
                id="org-slug"
                value={state.organizationDetails.slug}
                onChange={handleSlugChange}
                placeholder="acme-inc"
                className={errors.slug ? "border-destructive" : ""}
              />
            </div>
            {errors.slug ? (
              <p className="text-xs text-destructive">{errors.slug}</p>
            ) : (
              <p className="text-xs text-muted-foreground">This will be used in URLs and cannot be changed later</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="org-industry">Industry</Label>
            <select
              id="org-industry"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={state.organizationDetails.industry || ""}
              onChange={(e) => updateOrganizationDetails({ industry: e.target.value })}
            >
              <option value="">Select an industry</option>
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="finance">Finance</option>
              <option value="retail">Retail</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="org-size">Organization Size</Label>
            <select
              id="org-size"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={state.organizationDetails.size || ""}
              onChange={(e) => updateOrganizationDetails({ size: e.target.value })}
            >
              <option value="">Select size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="501-1000">501-1000 employees</option>
              <option value="1000+">1000+ employees</option>
            </select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="org-website">Website</Label>
            <Input
              id="org-website"
              type="url"
              placeholder="https://example.com"
              value={state.organizationDetails.website || ""}
              onChange={(e) => updateOrganizationDetails({ website: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="org-description">Description</Label>
            <Textarea
              id="org-description"
              value={state.organizationDetails.description}
              onChange={(e) => updateOrganizationDetails({ description: e.target.value })}
              placeholder="Briefly describe your organization"
              rows={3}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="org-image">Organization Logo</Label>
            <div className="flex items-start gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-md border bg-muted">
                {state.organizationDetails.image ? (
                  <img
                    src={state.organizationDetails.image || "/placeholder.svg"}
                    alt="Organization logo"
                    className="h-full w-full rounded-md object-contain p-1"
                  />
                ) : (
                  <Building2 className="h-12 w-12 text-muted-foreground/40" />
                )}
              </div>
              <div className="flex-1">
                <label
                  htmlFor="logo-upload"
                  className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md border bg-muted px-4 text-sm font-medium hover:bg-muted/80"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      Upload Logo
                    </>
                  )}
                </label>
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
                <p className="mt-2 text-xs text-muted-foreground">Recommended: Square image, at least 512x512px</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={prevStep} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <Button type="submit" className="gap-2">
            Continue <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </motion.div>
  )
}

function MembersStep() {
  const { state, addMember, removeMember, nextStep, prevStep } = useOrganization()
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<"admin" | "employee">("employee")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setError("Email is required")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (state.members.members.some((member) => member.email === email)) {
      setError("This email has already been added")
      return
    }

    setError("")
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      addMember(email, role)
      setEmail("")
      setIsSubmitting(false)
    }, 800)
  }

  const handleSubmit = () => {
    nextStep()
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
        <h2 className="text-2xl font-bold">Invite Team Members</h2>
        <p className="text-muted-foreground">Add members to your organization</p>
      </div>

      <div className="space-y-6">
        {/* Blue invitation form with consistent typography */}
        <div className="relative rounded-lg border border-blue-200 bg-gradient-to-b from-blue-50 to-blue-100 p-6 shadow-sm">
          <div className="absolute -left-1 -top-1 h-16 w-16 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzIgMEwzOS4zOTIgMjQuNjA4TDY0IDMyTDM5LjM5MiAzOS4zOTJMMzIgNjRMMjQuNjA4IDM5LjM5MkwwIDMyTDI0LjYwOCAyNC42MDhMMzIgMFoiIGZpbGw9IiM5M0MzRkQiLz48L3N2Zz4=')] opacity-30"></div>
          <div className="absolute -bottom-1 -right-1 h-16 w-16 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzIgMEwzOS4zOTIgMjQuNjA4TDY0IDMyTDM5LjM5MiAzOS4zOTJMMzIgNjRMMjQuNjA4IDM5LjM5MkwwIDMyTDI0LjYwOCAyNC42MDhMMzIgMFoiIGZpbGw9IiM5M0MzRkQiLz48L3N2Zz4=')] opacity-30"></div>

          <div className="relative">
            <div className="mb-4 text-center">
              <h3 className="text-xl font-medium text-blue-900">Invitation</h3>
              <div className="mx-auto mt-1 h-px w-24 bg-blue-200"></div>
            </div>

            <form onSubmit={handleAddMember} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="member-email" className={`${error ? "text-destructive" : "text-blue-900"}`}>
                  Email Address
                </Label>
                <Input
                  id="member-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError("")
                  }}
                  placeholder="colleague@example.com"
                  className={`border-blue-200 bg-white/80 ${error ? "border-destructive" : ""}`}
                  disabled={isSubmitting}
                />
                {error && <p className="text-xs text-destructive">{error}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="member-role" className="text-blue-900">
                  Role
                </Label>
                <RadioGroup
                  value={role}
                  onValueChange={(value) => setRole(value as "admin" | "employee")}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin" className="border-blue-400 text-blue-600" />
                    <Label htmlFor="admin" className="flex items-center gap-1">
                      <UserCog className="h-3.5 w-3.5 text-blue-700" />
                      Administrator
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="employee" id="employee" className="border-blue-400 text-blue-600" />
                    <Label htmlFor="employee" className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5 text-blue-700" />
                      Employee
                    </Label>
                  </div>
                </RadioGroup>
                <p className="text-xs text-blue-700/70">Administrators have full access to manage the organization</p>
              </div>

              <div className="flex justify-center pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting || !email.trim()}
                  className="gap-2 bg-blue-600 text-white hover:bg-blue-700"
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                  Send Invitation
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Member list with blue styling */}
        <div className="rounded-md border border-blue-200 bg-gradient-to-b from-blue-50/50 to-blue-100/50">
          <div className="border-b border-blue-200 bg-blue-100/50 px-4 py-3">
            <h3 className="font-medium text-blue-900">Invited Members ({state.members.members.length})</h3>
          </div>
          <div className="divide-y divide-blue-200">
            {state.members.members.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                <Users className="mb-2 h-10 w-10 text-blue-300" />
                <p className="text-blue-900">No members invited yet</p>
                <p className="text-sm text-blue-700/70">Invite team members to collaborate in your organization</p>
              </div>
            ) : (
              <div className="max-h-64 overflow-y-auto">
                {state.members.members.map((member, index) => (
                  <motion.div
                    key={member.email}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          member.role === "admin" ? "bg-blue-200 text-blue-800" : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {member.role === "admin" ? <UserCog className="h-4 w-4" /> : <User className="h-4 w-4" />}
                      </div>
                      <div>
                        <div className="font-medium">{member.email}</div>
                        <div className="text-xs text-blue-700">
                          {member.role === "admin" ? "Administrator" : "Employee"}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeMember(member.email)}
                      className="h-8 w-8 text-blue-700 hover:bg-blue-200 hover:text-blue-900"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={prevStep} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <Button onClick={handleSubmit} className="gap-2">
            Complete Setup <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

function CompletionStep() {
  const { state } = useOrganization()

  // Helper function to get readable industry name
  const getIndustryName = (industry: string) => {
    const industries: Record<string, string> = {
      technology: "Technology",
      healthcare: "Healthcare",
      education: "Education",
      finance: "Finance",
      retail: "Retail",
      manufacturing: "Manufacturing",
      other: "Other",
    }
    return industries[industry] || "Not specified"
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
          Setup Complete!
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground"
        >
          Your organization has been created successfully.
        </motion.p>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mb-8 rounded-lg border bg-muted/20 p-6"
      >
        <h3 className="mb-4 font-medium">Organization Summary</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-md border bg-background">
              {state.organizationDetails.image ? (
                <img
                  src={state.organizationDetails.image || "/placeholder.svg"}
                  alt="Organization logo"
                  className="h-full w-full rounded-md object-contain p-1"
                />
              ) : (
                <Building2 className="h-8 w-8 text-muted-foreground/40" />
              )}
            </div>
            <div>
              <h4 className="text-lg font-medium">{state.organizationDetails.name}</h4>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <LinkIcon className="h-3 w-3" />
                <span>organizehub.com/{state.organizationDetails.slug}</span>
              </div>
              {state.organizationDetails.description && (
                <p className="mt-1 text-sm">{state.organizationDetails.description}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-md border bg-muted/10 p-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                Industry
              </div>
              <p className="mt-1">
                {state.organizationDetails.industry
                  ? getIndustryName(state.organizationDetails.industry)
                  : "Not specified"}
              </p>
            </div>

            <div className="rounded-md border bg-muted/10 p-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Users2 className="h-4 w-4 text-muted-foreground" />
                Organization Size
              </div>
              <p className="mt-1">{state.organizationDetails.size || "Not specified"}</p>
            </div>

            {state.organizationDetails.website && (
              <div className="rounded-md border bg-muted/10 p-3 sm:col-span-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  Website
                </div>
                <p className="mt-1 truncate">
                  <a
                    href={state.organizationDetails.website}
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {state.organizationDetails.website}
                  </a>
                </p>
              </div>
            )}
          </div>

          <div>
            <h4 className="mb-2 font-medium">Team Members</h4>
            {state.members.members.length === 0 ? (
              <p className="text-sm text-muted-foreground">No members added</p>
            ) : (
              <ul className="space-y-1 text-sm">
                {state.members.members.map((member) => (
                  <li key={member.email} className="flex items-center gap-2">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full ${
                        member.role === "admin" ? "bg-blue-100 text-blue-800" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {member.role === "admin" ? <UserCog className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                    </div>
                    <span>{member.email}</span>
                    <span className="text-xs text-muted-foreground">
                      ({member.role === "admin" ? "Administrator" : "Employee"})
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex justify-center"
      >
        <Button asChild size="lg">
          <a href="/dashboard">Go to Dashboard</a>
        </Button>
      </motion.div>
    </motion.div>
  )
}
