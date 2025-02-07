"use client";

import { useCart } from "@/contexts/cart-context";
import { Product } from "@/lib/types";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <Button
      onClick={() => addToCart(product)}
      className="bg-blue-500 text-white px-4 py-2 rounded"
      size={"icon"}
    >
      <ShoppingBag />
    </Button>
  );
}
