"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Bot, CheckCircle, Clock, FileText, MapPin, Settings, Users, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { User as SupabaseUser } from "@supabase/supabase-js"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<SupabaseUser | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
      } else {
        setUser(user)
      }
    }
    getUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const features = [
    {
      icon: Bot,
      title: "AI Chat Assistant",
      description: "Get instant answers to all your election questions",
      href: "/chat",
      color: "bg-blue-500"
    },
    {
      icon: CheckCircle,
      title: "Eligibility Checker",
      description: "Check if you're eligible to vote",
      href: "/eligibility",
      color: "bg-green-500"
    },
    {
      icon: Clock,
      title: "Election Timeline",
      description: "Important dates and deadlines",
      href: "/timeline",
      color: "bg-purple-500"
    },
    {
      icon: Users,
      title: "Registration Guide",
      description: "Step-by-step voter registration process",
      href: "/registration",
      color: "bg-orange-500"
    },
    {
      icon: MapPin,
      title: "Find Polling Booth",
      description: "Locate your nearest polling station",
      href: "/polling-booth",
      color: "bg-red-500"
    },
    {
      icon: FileText,
      title: "FAQ Knowledge Base",
      description: "Comprehensive election FAQs",
      href: "/faq",
      color: "bg-indigo-500"
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Stay updated with important alerts",
      href: "/notifications",
      color: "bg-yellow-500"
    },
    {
      icon: Settings,
      title: "Settings",
      description: "Manage your account and preferences",
      href: "/settings",
      color: "bg-gray-500"
    }
  ]

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
          <span className="text-gray-700 dark:text-gray-300">Welcome, {user.email}</span>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Your Election Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to participate in the democratic process
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Link href={feature.href}>
                <Card className="h-full backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-0 shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}