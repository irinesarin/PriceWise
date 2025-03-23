"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, ShoppingBag, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { ModeToggle } from "@/components/mode-toggle"

export default function Navbar() {
  const pathname = usePathname()
  const [showSearch, setShowSearch] = useState(false)

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="font-bold text-2xl">
              PriceWise
            </Link>

            {!showSearch && (
              <nav className="hidden md:flex items-center space-x-4">
                <Link
                  href="/"
                  className={`text-sm font-medium transition-colors ${
                    pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/categories"
                  className={`text-sm font-medium transition-colors ${
                    pathname === "/categories" ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  Categories
                </Link>
                <Link
                  href="/deals"
                  className={`text-sm font-medium transition-colors ${
                    pathname === "/deals" ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  Deals
                </Link>
              </nav>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {showSearch ? (
              <form action="/search" className="flex items-center space-x-2" onSubmit={() => setShowSearch(false)}>
                <Input
                  type="text"
                  name="query"
                  placeholder="Search products..."
                  className="w-full md:w-[300px]"
                  autoFocus
                />
                <Button type="submit" size="icon" variant="ghost">
                  <Search className="h-5 w-5" />
                </Button>
                <Button type="button" size="icon" variant="ghost" onClick={() => setShowSearch(false)}>
                  &times;
                </Button>
              </form>
            ) : (
              <>
                <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)}>
                  <Search className="h-5 w-5" />
                </Button>
                <Link href="/wishlist">
                  <Button variant="ghost" size="icon">
                    <ShoppingBag className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <ModeToggle />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

