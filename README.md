# VoteGuide AI

A modern, AI-powered election process assistant web application that helps users understand and navigate the democratic voting process in India.

## 🚀 Features

### Core Features
- **AI Chat Assistant**: Conversational AI that answers election-related questions
- **Eligibility Checker**: Interactive form to check voting eligibility
- **Election Timeline**: Visual timeline of important election dates and deadlines
- **Registration Guide**: Step-by-step voter registration process
- **FAQ Knowledge Base**: Comprehensive election FAQs organized by categories
- **Polling Booth Locator**: Find nearest polling stations
- **Notifications System**: Stay updated with election alerts
- **Admin Panel**: Manage timelines, FAQs, and notifications

### Technical Features
- **Modern UI**: Glassmorphism design with smooth animations
- **Dark/Light Mode**: Theme switching capability
- **Responsive Design**: Mobile-first approach
- **Voice Input**: Speech-to-text for chatbot
- **Multilingual Support**: English and Hindi
- **PDF Export**: Download registration guides
- **Real-time Updates**: Live election information

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN UI** - Modern component library
- **Framer Motion** - Animation library
- **Lucide Icons** - Beautiful icon set

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Supabase** - PostgreSQL database and authentication
- **Google Gemini API** - AI chat functionality

### Deployment
- **Vercel** - Hosting and deployment platform

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Google Gemini API key

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd voteguide-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

### 4. Supabase Setup

1. Create a new project on [Supabase](https://supabase.com)
2. Go to SQL Editor and run the schema from `sql/schema.sql`
3. Update your environment variables with the Supabase URL and anon key

### 5. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
voteguide-ai/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── chat/              # AI chat page
│   ├── dashboard/         # Main dashboard
│   ├── eligibility/       # Eligibility checker
│   ├── faq/               # FAQ page
│   ├── timeline/          # Election timeline
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # ShadCN UI components
│   └── theme-provider.tsx
├── lib/                  # Utility functions
│   ├── supabase.ts       # Supabase client
│   └── utils.ts          # Helper functions
├── sql/                  # Database schema
└── public/               # Static assets
```

## 🗄️ Database Schema

The application uses the following main tables:

- `users` - User accounts and profiles
- `faqs` - Frequently asked questions
- `election_timelines` - Election schedule and deadlines
- `notifications` - System notifications and alerts
- `eligibility_checks` - User eligibility check history

## 🔧 API Routes

- `POST /api/chat` - AI chat endpoint
- `GET /api/timeline` - Election timeline data
- `GET /api/faq` - FAQ data
- `POST /api/eligibility` - Eligibility check

## 🎨 UI Components

The application uses ShadCN UI components with custom styling:

- Button, Card, Input, Textarea
- Select, Label
- Theme toggle and provider

## 🚀 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Manual Deployment

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Election Commission of India for election data and guidelines
- Google Gemini for AI chat functionality
- Supabase for backend services
- Vercel for hosting platform

## 📞 Support

For support, email support@voteguide.ai or create an issue in the repository.

---

Built with ❤️ for democracy and digital inclusion.
