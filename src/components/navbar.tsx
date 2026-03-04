
"use client";

import Link from "next/link";
import { Sparkles, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-lg transition-transform group-hover:scale-110">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight hidden sm:block">
            AI TextForge
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/text-generation">
            <Button variant="ghost" className="font-medium">
              Generator
            </Button>
          </Link>
          <Button className="bg-secondary hover:bg-secondary/90 text-white gap-2 font-medium">
            <PenLine className="w-4 h-4" />
            Start Writing
          </Button>
        </div>
      </div>
    </nav>
  );
}
