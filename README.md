# StudyStack Market - CampusKart

StudyStack Market, branded in the app as CampusKart, is a campus-focused marketplace built for students to buy and sell books, notes, gadgets, calculators, hostel items, and other essentials within their college community.

The app is designed around a trusted student network. Users can sign up with a college email, browse listings, post items for sale, message sellers in real time, and explore premium topper notes in a clean, modern interface.

## Features

### Campus Marketplace

- Browse student listings for books, notes, gadgets, calculators, hostel items, and more
- Search items by name and filter by category
- View product details including price, seller info, condition, and posting date
- See listing cards with seller verification and pricing information

### Sell Items

- Post new listings with product name, description, category, price, and condition
- Upload product images with validation for JPG, PNG, and WebP files
- Store images in Supabase Storage
- Generate a quick AI-style item description for faster posting

### Student Messaging

- Message sellers directly from a product page
- View all conversations in a dedicated messages page
- Get unread message counts in the navigation
- Receive real-time chat updates using Supabase realtime subscriptions

### Authentication and Profiles

- Email/password authentication with Supabase Auth
- Sign-up restricted to JSSATE college email addresses
- Auto-create and load student profiles
- Show verified student status and basic seller details

### Study Materials

- Dedicated Topper Notes section for premium academic notes
- Highlight subject, author, page count, rating, and pricing

### Modern UI

- Built with React, Vite, and TypeScript
- Styled with Tailwind CSS, shadcn-ui, and Radix UI
- Responsive layout for desktop and mobile

## Screenshots

You can add screenshots here later for sections like:

- Landing Page
- Authentication
- Marketplace
- Product Detail
- Sell Item
- Messages
- Topper Notes
- Profile

## Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- shadcn-ui
- Radix UI
- TanStack Query
- Lucide React

### Backend / Infrastructure

- Supabase
- Supabase Auth
- Supabase Postgres
- Supabase Storage
- Supabase Realtime

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm
- A Supabase project

You will need:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Note: this project also supports `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY` as a fallback, but `VITE_SUPABASE_PUBLISHABLE_KEY` is the preferred name.

### 1. Clone and Install

```bash
git clone <YOUR_GIT_URL>
cd studystack-market
npm install
```

### 2. Configure Environment

Create a `.env` file in the project root and add:

```env
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_PUBLISHABLE_KEY=<your-supabase-publishable-key>
```

These should point to the same Supabase project used for authentication, database tables, storage, and realtime messaging.

### 3. Configure Supabase

Apply the SQL migrations inside `supabase/migrations` to create the required database structure.

This project uses Supabase for:

- user authentication
- `profiles` table
- `products` table
- `messages` table
- `product-images` storage bucket

Make sure your Supabase project is configured for:

- email/password auth
- storage bucket access for product images
- realtime support for chat updates

### 4. Run the App Locally

```bash
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173`.

Typical flow:

- Sign up with a JSSATE email
- Browse the marketplace
- Open a product page
- Post a new item for sale
- Message a seller
- Explore topper notes

### 5. Build for Production

```bash
npm run build
```

### 6. Run Tests

```bash
npm test
```

## Project Structure

```text
src/
  main.tsx
  App.tsx
  pages/
    Index.tsx
    Auth.tsx
    Marketplace.tsx
    ProductDetail.tsx
    SellItem.tsx
    TopperNotes.tsx
    Messages.tsx
    Profile.tsx
    NotFound.tsx
  components/
    Navbar.tsx
    Footer.tsx
    ProductCard.tsx
    ChatDialog.tsx
    ui/
  contexts/
    AuthContext.tsx
  hooks/
    useUnreadCount.ts
  integrations/
    supabase/
      client.ts
      types.ts
  lib/
    mockData.ts
    utils.ts

supabase/
  migrations/
```

## Highlights

- Trusted campus-only sign-up flow with college email validation
- Marketplace listings backed by Supabase
- Image upload support for product photos
- Realtime buyer-seller messaging
- Clean UI focused on student buying and selling

---

## Live Demo

Try the app here:  
https://studystack-market-rgrk2nuyd-krutzias-projects.vercel.app

---

## Author

Kashish  
B.Tech Computer Science  
JSS Academy of Technical Education, Noida
