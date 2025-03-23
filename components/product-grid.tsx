import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

// Mock data for trending products
const trendingProducts = [
  {
    id: 1,
    name: "Wireless Earbuds",
    image: "/placeholder.svg?height=200&width=200",
    amazonPrice: 1999,
    flipkartPrice: 1899,
    discount: "15% off",
  },
  {
    id: 2,
    name: "Smart Watch",
    image: "/placeholder.svg?height=200&width=200",
    amazonPrice: 3499,
    flipkartPrice: 3299,
    discount: "20% off",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    image: "/placeholder.svg?height=200&width=200",
    amazonPrice: 2499,
    flipkartPrice: 2599,
    discount: "10% off",
  },
  {
    id: 4,
    name: "Power Bank",
    image: "/placeholder.svg?height=200&width=200",
    amazonPrice: 1299,
    flipkartPrice: 1199,
    discount: "25% off",
  },
]

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {trendingProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <CardContent className="p-0 relative">
            <div className="absolute top-2 right-2 z-10">
              <Button variant="ghost" size="icon" className="rounded-full bg-white/80 hover:bg-white">
                <Heart className="h-5 w-5 text-muted-foreground hover:text-red-500" />
              </Button>
            </div>
            <div className="absolute top-2 left-2 z-10">
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                {product.discount}
              </Badge>
            </div>
            <div className="h-48 relative">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start p-4">
            <h3 className="font-medium text-lg mb-2">{product.name}</h3>
            <div className="flex justify-between w-full">
              <div>
                <p className="text-sm text-muted-foreground">Amazon</p>
                <p className="font-bold">₹{product.amazonPrice}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Flipkart</p>
                <p className="font-bold">₹{product.flipkartPrice}</p>
              </div>
            </div>
            <Button className="w-full mt-4">Compare Prices</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

