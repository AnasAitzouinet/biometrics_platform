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
    name: z.string().min(1, "Organization name is required"),
    slug: z.string().min(1, "Organization slug is required"),
})

type FormValues = z.infer<typeof formSchema>

export default function OrganizationForm() {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            slug: "",
        },
    })

    // Form submission handler for creating an organization
    const onSubmit = async (values: FormValues) => {
        try {
            const errorSlug = await authClient.organization.checkSlug({
                slug: values.slug,
            })
            if (errorSlug) {
                console.error("Error checking slug:", errorSlug)
                // Optionally, you can display an error message to the user here.
            }


            const { data, error } = await authClient.organization.create({
                name: values.name,
                slug: values.slug,
            })

            if (error) {
                console.error("Error creating organization:", error)
                // Optionally, you can display an error message to the user here.
            } else {
                console.log("Organization created successfully:", data)
                // You can redirect the user or show a success message here.
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
                {renderInput("name", "Organization Name", "text", "Enter organization name")}
                {renderInput("slug", "Organization Slug", "text", "Enter organization slug")}
                <Button type="submit">Create Organization</Button>
            </form>
        </Form>
    )
}
