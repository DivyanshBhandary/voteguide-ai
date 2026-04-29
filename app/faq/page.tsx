"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

const faqCategories = [
  {
    id: 'registration',
    title: 'Voter Registration',
    icon: '📝',
    faqs: [
      {
        question: 'How do I register to vote?',
        answer: 'You can register to vote online through the National Voter\'s Service Portal (nvsp.in), at your nearest Electoral Registration Office, or through designated camps. You need to be 18 years or older and an Indian citizen.'
      },
      {
        question: 'What documents are required for voter registration?',
        answer: 'Required documents include: Aadhaar card, passport size photograph, proof of address (Aadhaar, electricity bill, bank statement, etc.), and age proof if not available in Aadhaar.'
      },
      {
        question: 'How long does it take to get a Voter ID card?',
        answer: 'The processing time is typically 15-30 days from the date of application. You can track your application status online using the reference number provided.'
      }
    ]
  },
  {
    id: 'voting',
    title: 'Voting Process',
    icon: '🗳️',
    faqs: [
      {
        question: 'How does the voting machine work?',
        answer: 'EVMs (Electronic Voting Machines) have a ballot unit where you press the button next to your chosen candidate\'s name/symbol. The machine records your vote electronically and provides a confirmation beep.'
      },
      {
        question: 'What if I make a mistake while voting?',
        answer: 'Once you press the button on the EVM, your vote is recorded. You cannot change your vote. Make sure to verify your choice before pressing the button.'
      },
      {
        question: 'Can I vote if I\'m not in my registered constituency?',
        answer: 'No, you can only vote in the constituency where you are registered. If you\'ve moved, you need to update your address in the voter list.'
      }
    ]
  },
  {
    id: 'eligibility',
    title: 'Eligibility & Requirements',
    icon: '✅',
    faqs: [
      {
        question: 'What is the minimum age to vote?',
        answer: 'You must be 18 years or older on the qualifying date (usually January 1st of the election year) to be eligible to vote.'
      },
      {
        question: 'Can NRIs vote in Indian elections?',
        answer: 'NRIs can vote only if they had registered as voters before leaving India. New registrations for NRIs are not allowed.'
      },
      {
        question: 'What if I have a criminal record?',
        answer: 'Persons convicted of certain criminal offenses may be disqualified from voting. The disqualification period varies based on the offense.'
      }
    ]
  },
  {
    id: 'polling',
    title: 'Polling Booth & Location',
    icon: '📍',
    faqs: [
      {
        question: 'How do I find my polling booth?',
        answer: 'You can find your polling booth location on the Election Commission website, through SMS (send EPIC number to 1950), or by calling the helpline 1950.'
      },
      {
        question: 'What should I carry to the polling booth?',
        answer: 'Carry your Voter ID card (EPIC), any approved photo ID proof, and wear a mask. Mobile phones are not allowed inside the polling booth.'
      },
      {
        question: 'What time does polling start and end?',
        answer: 'Polling is typically conducted from 7 AM to 6 PM. However, this can vary based on the state and specific election schedule.'
      }
    ]
  }
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0)

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
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">FAQ</h1>
        </div>
        <ThemeToggle />
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Find answers to common questions about elections and voting
          </p>
        </motion.div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredCategories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <span className="mr-3 text-3xl">{category.icon}</span>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.faqs.map((faq, index) => {
                    const faqId = `${category.id}-${index}`
                    const isExpanded = expandedItems.has(faqId)

                    return (
                      <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                        <button
                          onClick={() => toggleExpanded(faqId)}
                          className="w-full text-left py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg px-4 -mx-4 transition-colors"
                        >
                          <h3 className="font-semibold text-gray-900 dark:text-white pr-4">
                            {faq.question}
                          </h3>
                          <ChevronDown
                            className={`h-5 w-5 text-gray-500 transition-transform ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pb-4 px-4"
                          >
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredCategories.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              No FAQs found matching &quot;{searchTerm}&quot;
            </p>
            <Button
              variant="outline"
              onClick={() => setSearchTerm('')}
              className="mt-4"
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}