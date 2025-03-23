import { NextResponse } from "next/server"

// Mock wishlist data - in a real app, this would be stored in a database
let wishlist = [
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

export async function GET() {
  return NextResponse.json({ wishlist })
}

export async function POST(request: Request) {
  const data = await request.json()

  // Add item to wishlist
  const newItem = {
    id: Date.now(), // Generate a unique ID
    ...data,
    dateAdded: new Date().toISOString().split("T")[0],
  }

  wishlist.push(newItem)

  return NextResponse.json({ success: true, item: newItem })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 })
  }

  const initialLength = wishlist.length
  wishlist = wishlist.filter((item) => item.id !== Number.parseInt(id))

  if (wishlist.length === initialLength) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}

