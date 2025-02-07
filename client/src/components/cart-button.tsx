"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/cart-context";
import CartItems from "./cart-items";

export default function CartButton() {
  const { cart } = useCart();

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          {/* make me a cart button with badge showing items count with tailwindcss */}
          <Button variant={"ghost"} size="lg">
            <Badge variant={"outline"}>{cart.length}</Badge>
            Cart
          </Button>
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
