"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Trash2, ExternalLink } from "lucide-react"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Mock wishlist data
const initialWishlist = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds",
    image: "/placeholder.svg?height=200&width=200",
    amazonPrice: 1999,
    flipkartPrice: 1899,
    dateAdded: "2023-10-15",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    image: "/placeholder.svg?height=200&width=200",
    amazonPrice: 3499,
    flipkartPrice: 3299,
    dateAdded: "2023-10-10",
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    image: "/placeholder.svg?height=200&width=200",
    amazonPrice: 2499,
    flipkartPrice: 2599,
    dateAdded: "2023-10-05",
  },
]

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(initialWishlist)
  const [itemToRemove, setItemToRemove] = useState<number | null>(null)

  const handleRemoveItem = (id: number) => {
    setWishlist(wishlist.filter((item) => item.id !== id))
    setItemToRemove(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <p className="text-muted-foreground">{wishlist.length} items</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium mb-4">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">
            Start adding products to your wishlist to track prices and find the best deals.
          </p>
          <Button asChild>
            <a href="/">Browse Products</a>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {wishlist.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-48 h-48 relative">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-xl mb-2">{item.name}</h3>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setItemToRemove(item.id)}>
                          <Trash2 className="h-5 w-5 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove from Wishlist</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove this item from your wishlist?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            Remove
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Added on {new Date(item.dateAdded).toLocaleDateString()}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Amazon</span>
                        <Badge variant={item.amazonPrice <= item.flipkartPrice ? "default" : "outline"}>
                          {item.amazonPrice <= item.flipkartPrice ? "Best Price" : ""}
                        </Badge>
                      </div>
                      <p className="font-bold text-lg">₹{item.amazonPrice}</p>
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View on Amazon
                      </Button>
                    </div>
                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Flipkart</span>
                        <Badge variant={item.flipkartPrice <= item.amazonPrice ? "default" : "outline"}>
                          {item.flipkartPrice <= item.amazonPrice ? "Best Price" : ""}
                        </Badge>
                      </div>
                      <p className="font-bold text-lg">₹{item.flipkartPrice}</p>
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
      )}
    </div>
  )
}

