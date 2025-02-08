"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/cart-context";
import CartItems from "./cart-items";
import { ShoppingCart } from "lucide-react";

export default function CartButton() {
  const { cart } = useCart();

  return (
    <>
      <Sheet>
        <SheetTrigger>
          {/* make me a cart button with badge showing items count with tailwindcss */}
          <ShoppingCart className="h-5 w-5" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
          <span className="sr-only">Cart</span>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
          </SheetHeader>
          <CartItems />
        </SheetContent>
      </Sheet>
    </>
  );
}
