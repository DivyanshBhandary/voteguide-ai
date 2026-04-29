"use client"

import { motion } from "framer-motion"
import { CheckCircle, FileText, Camera, MapPin, ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

const registrationSteps = [
  {
    step: 1,
    title: "Check Eligibility",
    description: "Ensure you meet the basic requirements for voter registration",
    requirements: [
      "Must be 18 years or older",
      "Indian citizen",
      "Not declared of unsound mind by a court",
      "Not convicted of any offense and sentenced to imprisonment for 2 years or more"
    ],
    icon: CheckCircle
  },
  {
    step: 2,
    title: "Gather Required Documents",
    description: "Collect all necessary documents for the application",
    documents: [
      "Aadhaar Card (primary ID proof)",
      "Passport size photograph (recent, 3.5cm x 4.5cm)",
      "Proof of address (if different from Aadhaar)",
      "Age proof (if not in Aadhaar)"
    ],
    icon: FileText
  },
  {
    step: 3,
    title: "Take Photograph",
    description: "Get a recent passport-size photograph taken",
    tips: [
      "Plain white or light background",
      "Front-facing pose",
      "Neutral expression",
      "No sunglasses or headgear (except for religious reasons)"
    ],
    icon: Camera
  },
  {
    step: 4,
    title: "Choose Registration Method",
    description: "Select how you want to submit your application",
    methods: [
      "Online: Through National Voter's Service Portal (nvsp.in)",
      "Offline: At Electoral Registration Office or designated camps",
      "Through BLO (Booth Level Officer) in your area"
    ],
    icon: MapPin
  },
  {
    step: 5,
    title: "Submit Application",
    description: "Complete and submit your voter registration form",
    process: [
      "Fill out Form 6 (for new registration)",
      "Attach all required documents",
      "Submit at designated center or online",
      "Receive acknowledgment receipt"
    ],
    icon: Download
  }
]

export default function RegistrationPage() {
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
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Registration Guide</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Voter Registration Guide
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Complete step-by-step guide to register as a voter in India
          </p>
        </motion.div>

        <div className="space-y-8">
          {registrationSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold mr-4">
                      {step.step}
                    </div>
                    <step.icon className="mr-3 h-6 w-6 text-blue-600" />
                    {step.title}
                  </CardTitle>
                  <CardDescription className="text-base ml-16">
                    {step.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="ml-16">
                  {step.requirements && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">Requirements:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                        {step.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {step.documents && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">Required Documents:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                        {step.documents.map((doc, i) => (
                          <li key={i}>{doc}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {step.tips && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">Photography Tips:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                        {step.tips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {step.methods && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-orange-700 dark:text-orange-300">Registration Methods:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                        {step.methods.map((method, i) => (
                          <li key={i}>{method}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {step.process && (
                    <div>
                      <h4 className="font-semibold mb-2 text-red-700 dark:text-red-300">Submission Process:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                        {step.process.map((proc, i) => (
                          <li key={i}>{proc}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="backdrop-blur-sm bg-yellow-50/70 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-800 dark:text-yellow-200">
                <CheckCircle className="mr-2 h-5 w-5" />
                Important Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-yellow-700 dark:text-yellow-300">
              <ul className="list-disc list-inside space-y-2">
                <li>Registration is completely free of cost</li>
                <li>Processing time is typically 15-30 days</li>
                <li>You can track your application status online</li>
                <li>Keep your acknowledgment receipt safe</li>
                <li>Update your details if you change address</li>
                <li>Voter registration is valid for lifetime</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="space-x-4">
            <Button size="lg" asChild>
              <Link href="https://nvsp.in/" target="_blank">
                Apply Online Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/eligibility">
                Check Eligibility First
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}