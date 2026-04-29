"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Bot, CheckCircle, Clock, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Bot className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">VoteGuide AI</span>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="outline" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/signup">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Your AI Election Guide
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Simplify complex election procedures with our AI-powered assistant. Get personalized guidance for voter registration, eligibility checks, and election day processes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/chat">
                <Bot className="mr-2 h-5 w-5" />
                Ask AI Assistant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <Link href="/eligibility">
                Check Eligibility
                <CheckCircle className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to Vote
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            From eligibility checks to polling booth locations, we&apos;ve got you covered.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: CheckCircle,
              title: "Eligibility Checker",
              description: "Instantly check if you're eligible to vote based on age, citizenship, and location."
            },
            {
              icon: Bot,
              title: "AI Chat Assistant",
              description: "Get answers to all your election-related questions with our intelligent chatbot."
            },
            {
              icon: Clock,
              title: "Election Timeline",
              description: "Stay updated with important dates, deadlines, and election schedules."
            },
            {
              icon: Users,
              title: "Registration Guide",
              description: "Step-by-step guidance for voter registration with required documents."
            },
            {
              icon: MapPin,
              title: "Polling Booth Locator",
              description: "Find your nearest polling station and get directions."
            },
            {
              icon: ArrowRight,
              title: "Voting Process",
              description: "Complete walkthrough of the voting day process and what to expect."
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-0 shadow-xl hover:shadow-2xl transition-shadow">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white"
        >
          <h2 className="text-4xl font-bold mb-4">
            Ready to Make Your Voice Heard?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join millions of informed voters. Start your election journey today.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
            <Link href="/dashboard">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Bot className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-900 dark:text-white">VoteGuide AI</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            © 2024 VoteGuide AI. Empowering democracy through technology.
          </p>
        </div>
      </footer>
    </div>
  )
}
