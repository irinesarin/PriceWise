import { NextResponse } from "next/server"

// This would be replaced with actual API calls to the Flask backend
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query") || ""

  // Mock data - in a real app, this would call the Flask backend
  const mockResults = [
    {
      id: 1,
      name: "Wireless Bluetooth Earbuds",
      image: "/placeholder.svg?height=200&width=200",
      amazonPrice: 1999,
      flipkartPrice: 1899,
      description: "True wireless earbuds with noise cancellation",
      ratings: 4.5,
      reviews: 1250,
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      image: "/placeholder.svg?height=200&width=200",
      amazonPrice: 3499,
      flipkartPrice: 3299,
      description: "Fitness tracker with heart rate monitor",
      ratings: 4.3,
      reviews: 890,
    },
    // More mock results would be here
  ]

  // Simulate a delay to mimic API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json({ results: mockResults, query })
}

