import { Crown, Download, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const notes = [
  { id: "1", title: "Data Structures & Algorithms – Complete Notes", author: "Rahul Verma", rating: 4.9, price: 99, pages: 120, subject: "CSE" },
  { id: "2", title: "Engineering Mathematics III", author: "Priya Gupta", rating: 4.8, price: 79, pages: 85, subject: "Maths" },
  { id: "3", title: "Operating Systems – Semester Notes", author: "Kavya Singh", rating: 4.7, price: 89, pages: 95, subject: "CSE" },
];

const TopperNotes = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/20">
        <Crown className="h-5 w-5 text-secondary" />
      </div>
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Topper Notes</h1>
        <p className="text-muted-foreground">Premium study materials from top-performing students</p>
      </div>
    </div>

    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((n) => (
        <div key={n.id} className="rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <Badge variant="outline">{n.subject}</Badge>
            <div className="flex items-center gap-0.5 text-sm">
              <Star className="h-3.5 w-3.5 fill-secondary text-secondary" /> {n.rating}
            </div>
          </div>
          <h3 className="mt-3 font-heading text-base font-semibold text-foreground">{n.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">By {n.author} · {n.pages} pages</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="font-heading text-xl font-bold text-primary">₹{n.price}</span>
            <Button size="sm" className="gap-1">
              <Download className="h-3.5 w-3.5" /> Buy Notes
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TopperNotes;
