

A modern, full-featured **Conference Management Platform** built with Next.js 15, TypeScript, and MongoDB.

---

## ✨ Features

### Core Functionality
- **Multi-Role System**: Admin, Organizer, Speaker, Attendee
- **Conference Management**: Create, update, publish, and manage conferences
- **Speaker Proposal System**: Submit proposals with review workflow
- **Session Management**: Schedule sessions and assign speakers
- **Attendee Registration**: Registration with payment integration support
- **QR Code Attendance**: Unique QR codes for check-in at venue
- **Notifications**: Email and in-app notifications
- **Feedback & Ratings**: Post-event feedback system
- **Analytics Dashboard**: Attendance, ratings, and engagement insights

### Technical Features
- Role-based access control with middleware
- JWT Authentication (Access + Refresh Token)
- Fully responsive design with shadcn/ui
- Feature-Sliced project architecture
- Server-side rendering with Next.js App Router

---

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Authentication**: Custom JWT + Refresh Tokens
- **Database**: MongoDB + Mongoose
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

---

## 📁 Project Structure

```bash
ConfiX/
├── app/                    # Next.js App Router
│   ├── (auth)/
│   ├── (dashboard)/
│   ├── api/
│   └── layout.tsx
├── features/               # Feature Sliced Design
│   ├── auth/
│   ├── conference/
│   ├── speaker/
│   └── attendee/
├── components/             # Shared UI components
│   └── ui/                 # shadcn components
├── lib/                    # Utilities & config
├── models/                 # MongoDB models
├── hooks/                  # Custom React hooks
├── middleware.ts
└── ...
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or MongoDB Atlas)
- pnpm or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Tsedniya/ConfiX.git
cd ConfiX

# Install dependencies
pnpm install
# or
npm install

# Setup environment variables
cp .env.example .env.local
```

### Environment Variables

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_very_long_and_secure_secret_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Run the project

```bash
pnpm dev
# or
npm run dev
```


