import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Heart, ExternalLink, Star, BarChart3, TrendingUp } from "lucide-react"

// Mock product data
const product = {
  id: 1,
  name: "Wireless Bluetooth Earbuds",
  images: [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ],
  amazonPrice: 1999,
  flipkartPrice: 1899,
  description:
    "True wireless earbuds with noise cancellation and long battery life. Features Bluetooth 5.0, touch controls, and IPX7 water resistance. Perfect for workouts and everyday use.",
  specifications: [
    { name: "Bluetooth Version", value: "5.0" },
    { name: "Battery Life", value: "Up to 6 hours (24 hours with case)" },
    { name: "Water Resistance", value: "IPX7" },
    { name: "Charging", value: "USB-C" },
    { name: "Controls", value: "Touch" },
  ],
  ratings: {
    amazon: 4.5,
    flipkart: 4.3,
  },
  reviews: {
    amazon: 1250,
    flipkart: 890,
  },
  priceHistory: [
    { date: "2023-07-01", amazon: 2499, flipkart: 2399 },
    { date: "2023-08-01", amazon: 2299, flipkart: 2199 },
    { date: "2023-09-01", amazon: 2199, flipkart: 2099 },
    { date: "2023-10-01", amazon: 1999, flipkart: 1899 },
  ],
}

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Page({ params }: Props) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden border">
            <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <div key={index} className="aspect-square relative rounded-lg overflow-hidden border">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="ml-1 font-medium">{product.ratings.amazon}</span>
              <span className="ml-1 text-sm text-muted-foreground">({product.reviews.amazon} Amazon reviews)</span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="ml-1 font-medium">{product.ratings.flipkart}</span>
              <span className="ml-1 text-sm text-muted-foreground">({product.reviews.flipkart} Flipkart reviews)</span>
            </div>
          </div>

          <p className="text-muted-foreground mb-6">{product.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Amazon</span>
                  <Badge variant={product.amazonPrice <= product.flipkartPrice ? "default" : "outline"}>
                    {product.amazonPrice <= product.flipkartPrice ? "Best Price" : ""}
                  </Badge>
                </div>
                <p className="font-bold text-2xl mb-4">₹{product.amazonPrice}</p>
                <div className="space-y-2">
                  <Button className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Amazon
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Heart className="h-4 w-4 mr-2" />
                    Add to Wishlist
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Flipkart</span>
                  <Badge variant={product.flipkartPrice <= product.amazonPrice ? "default" : "outline"}>
                    {product.flipkartPrice <= product.amazonPrice ? "Best Price" : ""}
                  </Badge>
                </div>
                <p className="font-bold text-2xl mb-4">₹{product.flipkartPrice}</p>
                <div className="space-y-2">
                  <Button className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Flipkart
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Heart className="h-4 w-4 mr-2" />
                    Add to Wishlist
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="specifications">
            <TabsList className="w-full">
              <TabsTrigger value="specifications" className="flex-1">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="price-history" className="flex-1">
                Price History
              </TabsTrigger>
              <TabsTrigger value="price-alerts" className="flex-1">
                Price Alerts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-4">
              <div className="space-y-2">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between py-2 border-b">
                    <span className="font-medium">{spec.name}</span>
                    <span>{spec.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="price-history" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Price Trends</h3>
                </div>

                <div className="h-64 border rounded-lg p-4 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-2">Price history chart would be displayed here</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {product.priceHistory.map((history, index) => (
                    <div key={index} className="flex justify-between py-2 border-b">
                      <span>{new Date(history.date).toLocaleDateString()}</span>
                      <div className="flex space-x-4">
                        <span>Amazon: ₹{history.amazon}</span>
                        <span>Flipkart: ₹{history.flipkart}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="price-alerts" className="mt-4">
              <div className="space-y-4">
                <p>Set a price alert and we'll notify you when the price drops below your target.</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-medium">Amazon Alert</label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        placeholder="Target price"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        defaultValue={product.amazonPrice - 200}
                      />
                      <Button>Set Alert</Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-medium">Flipkart Alert</label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        placeholder="Target price"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        defaultValue={product.flipkartPrice - 200}
                      />
                      <Button>Set Alert</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
