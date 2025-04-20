"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { UserCircle, ArrowRight, ArrowLeft, Loader2, Upload, X, Plus, Linkedin, Twitter, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useEmployeeOnboarding } from "@/contexts/employee-onboarding-context"

interface ProfileSetupProps {
  onNext: () => void
  onPrevious: () => void
}

export function ProfileSetup({ onNext, onPrevious }: ProfileSetupProps) {
  const { state, updateEmployeeDetails, addSkill, removeSkill, updateSocialLink } = useEmployeeOnboarding()
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newSkill, setNewSkill] = useState("")

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true)

      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onloadend = () => {
        // Simulate upload delay
        setTimeout(() => {
          updateEmployeeDetails({ profileImage: reader.result as string })
          setIsUploading(false)
        }, 1500)
      }

      reader.readAsDataURL(file)
    }
  }

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault()
    if (newSkill.trim()) {
      addSkill(newSkill.trim())
      setNewSkill("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      onNext()
    }, 1000)
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
        <h2 className="text-2xl font-bold">Profile Setup</h2>
        <p className="text-muted-foreground">Set up your professional profile</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4">
          <Label htmlFor="profile-image">Profile Picture</Label>
          <div className="flex items-start gap-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border bg-muted">
              {state.employeeDetails.profileImage ? (
                <img
                  src={state.employeeDetails.profileImage || "/placeholder.svg"}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <UserCircle className="h-12 w-12 text-muted-foreground/40" />
              )}
            </div>
            <div className="flex-1">
              <label
                htmlFor="image-upload"
                className={`flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md border bg-muted px-4 text-sm font-medium hover:bg-muted/80 ${
                  isUploading || isSubmitting ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Upload Photo
                  </>
                )}
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUploading || isSubmitting}
              />
              <p className="mt-2 text-xs text-muted-foreground">Recommended: Square image, at least 300x300px</p>
            </div>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={state.employeeDetails.bio}
            onChange={(e) => updateEmployeeDetails({ bio: e.target.value })}
            placeholder="Tell us about yourself, your experience, and your interests..."
            rows={4}
            disabled={isSubmitting}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="skills">Skills</Label>
          <div className="flex flex-wrap gap-2">
            {state.employeeDetails.skills.map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-1 rounded-full p-0.5 hover:bg-primary/20"
                  disabled={isSubmitting}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <Input
              id="new-skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill"
              className="flex-1"
              disabled={isSubmitting}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleAddSkill}
              disabled={!newSkill.trim() || isSubmitting}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Social Links</Label>

          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                <Linkedin className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                id="linkedin"
                value={state.employeeDetails.socialLinks.linkedin || ""}
                onChange={(e) => updateSocialLink("linkedin", e.target.value)}
                placeholder="LinkedIn profile URL"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                <Twitter className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                id="twitter"
                value={state.employeeDetails.socialLinks.twitter || ""}
                onChange={(e) => updateSocialLink("twitter", e.target.value)}
                placeholder="Twitter profile URL"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                <Github className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                id="github"
                value={state.employeeDetails.socialLinks.github || ""}
                onChange={(e) => updateSocialLink("github", e.target.value)}
                placeholder="GitHub profile URL"
                disabled={isSubmitting}
              />
            </div>
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
                Complete Setup <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
