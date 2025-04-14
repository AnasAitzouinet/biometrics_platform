"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"

// Define the form schema with zod
const formSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  name: z.string().min(1, "Name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type FormValues = z.infer<typeof formSchema>

export default function UserOrgForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", name: "", password: "" },
  })

  // Form submission handler
  const onSubmit = async (values: FormValues) => {
    try {
      const { data, error } = await authClient.signUp.email(values)
      if (error) {
        console.error("Error signing up:", error)
        // Optionally, you can display an error message to the user here.
      } else {
        console.log("Sign up successful:", data)
        // You can redirect or show a success message here.
      }
    } catch (err) {
      console.error("Submission error:", err)
      // Optionally, display a generic error message to the user.
    }
  }

  // Reusable input renderer to reduce code duplication
  const renderInput = (
    name: keyof FormValues,
    label: string,
    type: string = "text",
    placeholder?: string,
    autoComplete?: string
  ) => (
    <FormField
      control={form.control}
      name={name as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder || label}
              autoComplete={autoComplete || "off"}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 p-5">
        {renderInput("email", "Email", "email", "Enter your email", "email")}
        {renderInput("name", "Name")}
        {renderInput("password", "Password", "password", "Enter your password")}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
