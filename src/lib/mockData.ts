export type Category = "Books" | "Notes" | "Gadgets" | "Calculators" | "Hostel Items" | "Other";
export type Condition = "New" | "Used";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: Category;
  condition: Condition;
  image: string;
  seller: {
    name: string;
    avatar: string;
    rating: number;
    verified: boolean;
    college: string;
  };
  postedAt: string;
}

export const categories: Category[] = ["Books", "Notes", "Gadgets", "Calculators", "Hostel Items", "Other"];

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Engineering Mechanics by R.S. Khurmi",
    description: "This Engineering Mechanics textbook is in good used condition and is ideal for first-year engineering students. The pages are clean and the book is perfect for exam preparation.",
    price: 250,
    originalPrice: 550,
    category: "Books",
    condition: "Used",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
    seller: { name: "Arjun Sharma", avatar: "AS", rating: 4.5, verified: true, college: "JSSATE" },
    postedAt: "2 hours ago",
  },
  {
    id: "2",
    name: "Casio FX-991EX Scientific Calculator",
    description: "Barely used Casio scientific calculator. All functions working perfectly. Comes with original cover.",
    price: 800,
    originalPrice: 1400,
    category: "Calculators",
    condition: "Used",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop",
    seller: { name: "Priya Gupta", avatar: "PG", rating: 4.8, verified: true, college: "JSSATE" },
    postedAt: "5 hours ago",
  },
  {
    id: "3",
    name: "Data Structures & Algorithms Notes",
    description: "Comprehensive handwritten notes covering all DSA topics. Includes diagrams, solved examples, and previous year questions.",
    price: 150,
    category: "Notes",
    condition: "New",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop",
    seller: { name: "Rahul Verma", avatar: "RV", rating: 4.9, verified: true, college: "JSSATE" },
    postedAt: "1 day ago",
  },
  {
    id: "4",
    name: "JBL Tune 510BT Headphones",
    description: "Wireless Bluetooth headphones in excellent condition. Great battery life, comfortable for long study sessions.",
    price: 1500,
    originalPrice: 3500,
    category: "Gadgets",
    condition: "Used",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    seller: { name: "Sneha Patel", avatar: "SP", rating: 4.2, verified: false, college: "JSSATE" },
    postedAt: "3 days ago",
  },
  {
    id: "5",
    name: "Study Table Lamp (LED)",
    description: "Adjustable LED desk lamp with 3 brightness levels. USB charging port included. Perfect for late-night study sessions.",
    price: 450,
    originalPrice: 900,
    category: "Hostel Items",
    condition: "Used",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    seller: { name: "Amit Kumar", avatar: "AK", rating: 4.0, verified: true, college: "JSSATE" },
    postedAt: "1 week ago",
  },
  {
    id: "6",
    name: "Python Programming Textbook",
    description: "Latest edition Python programming book. Perfect for CS students. No markings or highlights.",
    price: 350,
    originalPrice: 650,
    category: "Books",
    condition: "New",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop",
    seller: { name: "Kavya Singh", avatar: "KS", rating: 4.7, verified: true, college: "JSSATE" },
    postedAt: "4 days ago",
  },
];
