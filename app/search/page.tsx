import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import Image from "next/image"
import { SearchIcon, Heart, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock search results
const searchResults = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds",
    image: "/placeholder.svg?height=200&width=200",
    amazonPrice: 1999,
    flipkartPrice: 1899,
    description: "True wireless earbuds with noise cancellation and long battery life",
    ratings: 4.5,
    reviews: 1250,
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    image: "/placeholder.svg?height=200&width=200",
    amazonPrice: 3499,
    flipkartPrice: 3299,
    description: "Fitness tracker with heart rate monitor, sleep tracking and notifications",
    ratings: 4.3,
    reviews: 890,
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    image: "/placeholder.svg?height=200&width=200",
    amazonPrice: 2499,
    flipkartPrice: 2599,
    description: "Waterproof portable speaker with 20 hours battery life",
    ratings: 4.7,
    reviews: 1560,
  },
  {
    id: 4,
    name: "10000mAh Power Bank",
    image: "/placeholder.svg?height=200&width=200",
    amazonPrice: 1299,
    flipkartPrice: 1199,
    description: "Fast charging power bank with dual USB ports",
    ratings: 4.2,
    reviews: 2100,
  },
]

export default function SearchPage({
  searchParams,
}: {
  searchParams: { query?: string }
}) {
  const query = searchParams.query || ""

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="w-full md:w-64 space-y-6">
          <div>
            <h3 className="font-medium mb-3">Search</h3>
            <form className="flex items-center space-x-2">
              <Input type="text" name="query" placeholder="Search..." defaultValue={query} />
              <Button type="submit" size="icon">
                <SearchIcon className="h-4 w-4" />
              </Button>
            </form>
          </div>

          <div>
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="space-y-4">
              <Slider defaultValue={[0, 10000]} max={20000} step={100} />
              <div className="flex items-center justify-between">
                <span>₹0</span>
                <span>₹20,000</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Sort By</h3>
            <Select defaultValue="relevance">
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="font-medium mb-3">Platform</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="amazon" defaultChecked />
                <label htmlFor="amazon">Amazon</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="flipkart" defaultChecked />
                <label htmlFor="flipkart">Flipkart</label>
              </div>
            </div>
          </div>

          <Button className="w-full">Apply Filters</Button>
        </div>

        {/* Search results */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{query ? `Search results for "${query}"` : "All Products"}</h2>
            <p className="text-muted-foreground">{searchResults.length} results</p>
          </div>

          <div className="space-y-6">
            {searchResults.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-48 h-48 relative">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-xl mb-2">{product.name}</h3>
                      <Button variant="ghost" size="icon">
                        <Heart className="h-5 w-5" />
                      </Button>
                    </div>
                    <p className="text-muted-foreground mb-4">{product.description}</p>
                    <div className="flex items-center mb-4">
                      <Badge variant="secondary" className="mr-2">
                        {product.ratings} ★
                      </Badge>
                      <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Amazon</span>
                          <Badge variant={product.amazonPrice <= product.flipkartPrice ? "default" : "outline"}>
                            {product.amazonPrice <= product.flipkartPrice ? "Best Price" : ""}
                          </Badge>
                        </div>
                        <p className="font-bold text-lg">₹{product.amazonPrice}</p>
                        <Button variant="outline" size="sm" className="w-full mt-2">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View on Amazon
                        </Button>
                      </div>
                      <div className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Flipkart</span>
                          <Badge variant={product.flipkartPrice <= product.amazonPrice ? "default" : "outline"}>
                            {product.flipkartPrice <= product.amazonPrice ? "Best Price" : ""}
                          </Badge>
                        </div>
                        <p className="font-bold text-lg">₹{product.flipkartPrice}</p>
                        <Button variant="outline" size="sm" className="w-full mt-2">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View on Flipkart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

