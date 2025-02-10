import { cache } from "react"

export interface Product {
  id: number
  name: string
  description: string
  images: string[]
  price: number
  supply: number
}

export const getProducts = cache(async (): Promise<Product[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/all`, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }

  return res.json()
})

export const buyProduct = async (productId: number): Promise<void> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${productId}/purchase`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })

  if (!res.ok) {
    throw new Error("Failed to buy product")
  }

  const data = await res.json()
  if (!data.success) {
    throw new Error(data.message)
  }
}

