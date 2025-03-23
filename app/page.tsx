import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import ProductGrid from "@/components/product-grid"
import { SearchIcon } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center space-y-6 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center">Compare Prices Across Platforms</h1>
        <p className="text-xl text-center text-muted-foreground max-w-2xl">
          Find the best deals on your favorite products from Amazon, Flipkart, and more.
        </p>

        <div className="w-full max-w-2xl flex items-center space-x-2">
          <form action="/search" className="flex w-full items-center space-x-2">
            <Input type="text" name="query" placeholder="Search for products..." className="flex-1" required />
            <Button type="submit">
              <SearchIcon className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Electronics", "Fashion", "Home & Kitchen", "Books"].map((category) => (
            <Link
              href={`/search?query=${category}`}
              key={category}
              className="bg-primary/5 hover:bg-primary/10 transition-colors rounded-lg p-6 text-center"
            >
              <h3 className="font-medium text-lg">{category}</h3>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Trending Products</h2>
        <ProductGrid />
      </div>
    </div>
  )
}

