"use client";

import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  supply: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const buyProduct = async (product: Product) => {
    try {
      const response = await fetch(
        `https://interview-test-5hkw.onrender.com/products/${product.id}/purchase`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to buy product");
      }

      const { data } = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === product.id
            ? { ...product, supply: product.supply - 1 }
            : product
        )
      );

      toast.success(`You've bought ${product.name}`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Purchase failed");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://interview-test-5hkw.onrender.com/products",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log("response data", data);
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-muted rounded-lg h-[400px]"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      {products.length === 0 ? (
        <div className="text-center text-muted-foreground p-8 bg-muted/50 rounded-lg">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuy={buyProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
}
