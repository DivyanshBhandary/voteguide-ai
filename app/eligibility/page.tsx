"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

const eligibilitySchema = z.object({
  age: z.string().min(1, "Age is required"),
  state: z.string().min(1, "State is required"),
  citizenship: z.enum(["indian", "nri", "other"]),
  voterIdStatus: z.enum(["yes", "no", "applying"])
})

type EligibilityForm = z.infer<typeof eligibilitySchema>

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry"
]

export default function EligibilityPage() {
  const [result, setResult] = useState<{
    eligible: boolean
    message: string
    nextSteps: string[]
  } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<EligibilityForm>({
    resolver: zodResolver(eligibilitySchema)
  })

  const onSubmit = async (data: EligibilityForm) => {
    setIsSubmitting(true)

    const age = parseInt(data.age)
    // Eligibility logic for India
    const isEligible = age >= 18 && data.citizenship === "indian"

    let message = ""
    let nextSteps: string[] = []

    if (isEligible) {
      message = "Congratulations! You are eligible to vote in India."
      if (data.voterIdStatus === "no") {
        nextSteps = [
          "Apply for a Voter ID card at your nearest Electoral Registration Office",
          "Visit the National Voter's Service Portal (nvsp.in) to apply online",
          "Required documents: Aadhaar card, passport size photo, proof of address"
        ]
      } else if (data.voterIdStatus === "applying") {
        nextSteps = [
          "Wait for your Voter ID card to be processed (usually 15-30 days)",
          "Check application status on nvsp.in",
          "Once received, you can vote in elections"
        ]
      } else {
        nextSteps = [
          "Ensure your Voter ID is up to date",
          "Check if you're in the current voter list",
          "Verify your polling booth location"
        ]
      }
    } else {
      message = "You are not eligible to vote at this time."
      if (age < 18) {
        nextSteps = [
          "You must be 18 years or older to vote",
          "You can apply for Voter ID once you turn 18",
          "Keep track of election dates for future participation"
        ]
      } else if (data.citizenship !== "indian") {
        nextSteps = [
          "Only Indian citizens are eligible to vote in Indian elections",
          "NRIs can vote if they have a Voter ID from before leaving India",
          "Check specific rules for your citizenship status"
        ]
      }
    }

    setResult({ eligible: isEligible, message, nextSteps })

    // Save to database
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('eligibility_checks').insert({
          user_id: user.id,
          age: age,
          state: data.state,
          citizenship: data.citizenship,
          voter_id_status: data.voterIdStatus,
          result: isEligible ? 'eligible' : 'not_eligible'
        })
      }
    } catch (error) {
      console.error('Error saving eligibility check:', error)
    }

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Eligibility Checker</h1>
        </div>
        <ThemeToggle />
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Check Your Voting Eligibility</CardTitle>
              <CardDescription className="text-center">
                Answer a few questions to determine if you&apos;re eligible to vote in Indian elections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    {...register("age")}
                  />
                  {errors.age && (
                    <p className="text-sm text-red-600">{errors.age.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select onValueChange={(value) => setValue("state", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.state && (
                    <p className="text-sm text-red-600">{errors.state.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="citizenship">Citizenship Status</Label>
                  <Select onValueChange={(value: "indian" | "nri" | "other") => setValue("citizenship", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select citizenship status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="indian">Indian Citizen</SelectItem>
                      <SelectItem value="nri">Non-Resident Indian (NRI)</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.citizenship && (
                    <p className="text-sm text-red-600">{errors.citizenship.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="voterIdStatus">Do you have a Voter ID card?</Label>
                  <Select onValueChange={(value: "yes" | "no" | "applying") => setValue("voterIdStatus", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes, I have one</SelectItem>
                      <SelectItem value="no">No, I don&apos;t have one</SelectItem>
                      <SelectItem value="applying">I&apos;m applying for one</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.voterIdStatus && (
                    <p className="text-sm text-red-600">{errors.voterIdStatus.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Checking..." : "Check Eligibility"}
                </Button>
              </form>

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 rounded-lg border"
                  style={{
                    backgroundColor: result.eligible ? '#d1fae5' : '#fee2e2',
                    borderColor: result.eligible ? '#10b981' : '#ef4444'
                  }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    {result.eligible ? (
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    ) : (
                      <XCircle className="h-8 w-8 text-red-600" />
                    )}
                    <h3 className="text-lg font-semibold">
                      {result.eligible ? "Eligible to Vote" : "Not Eligible"}
                    </h3>
                  </div>
                  <p className="mb-4">{result.message}</p>
                  <div>
                    <h4 className="font-semibold mb-2">Next Steps:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {result.nextSteps.map((step, index) => (
                        <li key={index} className="text-sm">{step}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}