"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, AlertTriangle, CheckCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

const timelineEvents = [
  {
    id: 1,
    title: "Voter Registration Deadline",
    description: "Last date to register as a voter for upcoming elections",
    date: "2024-12-15",
    status: "upcoming",
    state: "All States",
    type: "registration"
  },
  {
    id: 2,
    title: "Voter ID Card Distribution",
    description: "Collection of Voter ID cards from designated centers",
    date: "2024-12-20",
    status: "upcoming",
    state: "All States",
    type: "distribution"
  },
  {
    id: 3,
    title: "Election Notification",
    description: "Official announcement of election schedule by Election Commission",
    date: "2025-01-15",
    status: "upcoming",
    state: "All States",
    type: "notification"
  },
  {
    id: 4,
    title: "Nomination Filing",
    description: "Candidates can file their nominations",
    date: "2025-01-20",
    status: "upcoming",
    state: "All States",
    type: "nomination"
  },
  {
    id: 5,
    title: "Campaigning Period",
    description: "Official campaigning period for all candidates",
    date: "2025-01-25",
    status: "upcoming",
    state: "All States",
    type: "campaign"
  },
  {
    id: 6,
    title: "Voting Day",
    description: "Election day - Cast your vote",
    date: "2025-02-15",
    status: "upcoming",
    state: "All States",
    type: "voting"
  },
  {
    id: 7,
    title: "Result Declaration",
    description: "Election results will be announced",
    date: "2025-02-18",
    status: "upcoming",
    state: "All States",
    type: "result"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'current':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'upcoming':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-5 w-5" />
    case 'current':
      return <Clock className="h-5 w-5" />
    case 'upcoming':
      return <Calendar className="h-5 w-5" />
    default:
      return <AlertTriangle className="h-5 w-5" />
  }
}

export default function TimelinePage() {
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
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Election Timeline</h1>
        </div>
        <ThemeToggle />
      </header>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Election Schedule
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay informed about important dates and deadlines for the upcoming elections
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>

            <div className="space-y-8">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="relative flex items-start space-x-6"
                >
                  {/* Timeline dot */}
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white dark:bg-gray-800 border-4 border-blue-500 shadow-lg">
                    {getStatusIcon(event.status)}
                  </div>

                  {/* Content */}
                  <Card className="flex-1 backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-0 shadow-xl">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}>
                          {event.status}
                        </span>
                      </div>
                      <CardDescription className="text-base">
                        {event.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                        <span className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          {new Date(event.date).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        <span>{event.state}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <Card className="backdrop-blur-sm bg-yellow-50/70 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-800 dark:text-yellow-200">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Important Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-yellow-700 dark:text-yellow-300">
              <ul className="list-disc list-inside space-y-2">
                <li>Dates are subject to change based on Election Commission announcements</li>
                <li>Always verify information from official Election Commission sources</li>
                <li>Registration deadlines are strict - apply well in advance</li>
                <li>Keep your Voter ID card safe and updated</li>
                <li>Check your polling booth location before election day</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}