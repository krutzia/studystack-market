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
 - Upload product images with validation for JPG, PNG, and WebP files
- Generate a quick AI-style item description for faster posting

### Student Messaging

Note: Direct messaging is disabled in this demo. Listings include seller details, but chat is not available.

### Authentication and Profiles

This demo does not require authentication. Browsing and posting are available without login for portfolio/demo purposes.

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

- Vercel Functions (serverless) in `api/` backed by MongoDB Atlas (Mongoose)

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

You will need:

- Node.js and npm (frontend)
- MongoDB Atlas connection string (backend)

### 1. Clone and Install

```bash
git clone <YOUR_GIT_URL>
cd studystack-market
npm install
```

### 2. Configure Environment

Create a `.env` file in the project root and add the backend connection string for MongoDB Atlas:

```env
MONGODB_URI=<your-mongodb-atlas-connection-string>
```

The serverless APIs live in the `api/` folder and are deployed as Vercel Functions. Frontend calls `/api/*` relative paths which resolve to the functions when deployed to the same Vercel project.

### Vercel deployment (frontend + serverless backend)

This project includes serverless API routes under the `api/` folder which are deployed as Vercel Functions. To deploy both frontend and backend together:

1. Push the repo to your Git provider and create a new Vercel project connected to the repo.
2. In Vercel project settings add an environment variable:

```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/campuskart?retryWrites=true&w=majority
```

3. Vercel will automatically build the frontend and publish API routes from the `api/` directory.

Notes:

- Frontend API calls use relative paths (e.g. `/api/products`) so they resolve to the Vercel Functions when deployed to the same project.
- For local development you can run `vercel dev` to emulate functions together with the frontend, or run the Vite dev server and `vercel dev`.

### 4. Run the App Locally

```bash
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173`.

### Local development with Vercel functions

To run the frontend and emulate serverless APIs locally with Vercel:

```bash
# install deps
npm install

# start Vite (frontend) and Vercel functions locally together
npx vercel dev

# OR run vite dev and a separate local server if preferred
npm run dev
```

Typical flow:

- Browse the marketplace
- Open a product page
- Post a new item for sale (anonymous demo)
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
    ui/
  hooks/
    useUnreadCount.ts
  lib/
    api.ts
    mockData.ts
    utils.ts

api/
  products/
    index.js
    [id].js
  notes/
    index.js

```

## Highlights

## Highlights

- Marketplace and Topper Notes backed by serverless APIs and MongoDB Atlas
- Image upload (stored as data URLs in demo; swap to Cloudinary/S3 for production)
- Clean UI focused on student buying and selling

## Author

Kashish  
B.Tech Computer Science  
JSS Academy of Technical Education, Noida
