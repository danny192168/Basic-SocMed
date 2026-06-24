# Basic SocMed - Simple Social Media Prototype

A clean, minimalist social media application built with React, TypeScript, and Supabase. This is a **simplified version** designed to demonstrate core social media features in an easy-to-understand way. Perfect for learning full-stack development with modern tools.

**What makes it simple:**

- Straightforward UI with minimal complexity
- Core features only (no feeds algorithms, trending, DMs, etc.)
- Easy to understand codebase for learning
- Quick to set up and run locally

![SocMed Feeds Page](./public/images/feeds-screenshot.png)

## Core Features

- 📝 **Create Posts** - Share posts with titles, descriptions, and images
- 🖼️ **Image Uploads** - Simple image storage with Supabase
- 👍 **Engagement** - Like and dislike posts
- 🔐 **Authentication** - Basic sign-up and sign-in
- 🔄 **Real-time Updates** - Posts sync instantly across users
- 🗑️ **Delete Posts** - Remove your own posts
- 🎨 **Clean UI** - Built with Tailwind CSS and shadcn/ui
- 🔔 **User Feedback** - Toast notifications for actions
- 📱 **Responsive** - Works on desktop and mobile

## Tech Stack

- **Frontend**: React 18 + React Router 8 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (Auth, Database, Storage, Real-time)
- **Build Tool**: Vite
- **Notifications**: Sonner
- **Date Formatting**: date-fns
- **Icons**: lucide-react

## Prerequisites

- Node.js 16+
- npm or pnpm
- Supabase account and project
- Environment variables configured

## Perfect For Learning

This project is ideal for:

- **Beginners** learning full-stack React development
- **Learning Supabase** - Auth, Database, Storage, Real-time subscriptions
- **Understanding** real-time data synchronization
- **Exploring** React Router v8 and component patterns
- **Getting started** with TypeScript in a real project

The codebase is intentionally kept simple and readable to make it easy to follow and modify.

## Getting Started

### Installation

Install dependencies:

```bash
npm install
```

### Development

Start the dev server:

```bash
npm run dev
```

App runs on `http://localhost:5173`

### Build

Create a production build:

```bash
npm run build
```

## Project Structure

```
app/
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── navbar.tsx
│   ├── footer.tsx
│   └── post-card.tsx
├── routes/
│   ├── auth.tsx          # Sign up / Sign in
│   ├── feeds.tsx         # Main feed with posts
│   ├── home.tsx
│   └── profile.tsx
├── lib/
│   └── supabase.ts       # Supabase client
├── app.css
├── root.tsx
└── routes.ts
```

## Database Schema

The app uses a `PostUploads` table with:

```sql
- id (number, primary key)
- created_at (timestamp)
- username (string)
- title (string)
- description (text)
- image_url (string, nullable)
- likes (number, default: 0)
- dislikes (number, default: 0)
```

## Key Features Explained

### Authentication

Users sign up with email and password. Display name is stored in user metadata and used as the post author name.

### Real-time Feeds

Posts are streamed via Supabase `postgres_changes` subscription. When a user creates/deletes a post, all connected clients update instantly.

### Image Upload

Images are sanitized and uploaded to Supabase Storage (`post-images` bucket), and a public URL is stored with the post.
