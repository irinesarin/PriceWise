'use client';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { searchProducts } from "@/lib/api"
import type { Product } from "@/lib/api"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

export default function Home() {
  const [query, setQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return
    
    setLoading(true)
    try {
      const results = await searchProducts(query)
      setProducts(results)
    } catch (error) {
      console.error('Error searching:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8">PriceWise</h1>
      
      <div className="flex w-full max-w-2xl gap-4 mb-8">
        <Input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
        {products.map((product, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="relative w-32 h-32">
                  <Image
                    src={product.image_url || '/placeholder.svg'}
                    alt={product.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2 line-clamp-2">{product.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold">₹{product.price.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground capitalize">on {product.source}</span>
                  </div>
                  <a
                    href={product.product_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
                  >
                    View on {product.source} <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && !loading && (
        <p className="text-muted-foreground mt-8">
          Search for products to see price comparisons
        </p>
      )}
    </main>
  )
}
