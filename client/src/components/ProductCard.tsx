"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AddToCartButton from "./add-to-cart-button";
import { buyProduct } from "@/lib/api";
import { toast } from "sonner";
interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    images: string[];
    price: number;
    supply: number;
    category: {
      id: number;
      title: string;
    };
    avgRating: number;
  };
  onBuy: (product: ProductCardProps["product"]) => Promise<void>;
}

export default function ProductCard({
  product: initialProduct,
}: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] =
    useState<ProductCardProps["product"]>(initialProduct);

  const handleBuy = async () => {
    setIsLoading(true);
    try {
      await buyProduct(product.id);
      setProduct((prevProduct) => ({
        ...prevProduct,
        supply: prevProduct.supply - 1,
      }));
      toast.success(`You've bought ${product.name}`);
    } catch (error) {
      console.error(error);
      toast.error("Purchase failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="group overflow-hidden flex flex-col h-full">
        <CardHeader className="p-0">
          <div className="aspect-square relative overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {product.supply < 5 && product.supply > 0 && (
              <Badge
                variant="destructive"
                className="absolute top-2 right-2 z-10"
              >
                Low Stock: {product.supply} left
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-1">
          <CardTitle className="line-clamp-1 mb-2">{product.name}</CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {product.description.split("\n").slice(0, 2).join("\n")}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold">${product.price}</p>
            <p className="text-sm text-muted-foreground">
              Stock: {product.supply}
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-4 space-x-1 pt-0">
          <Button
            className="w-full transition-all"
            onClick={handleBuy}
            disabled={product.supply === 0 || isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
                Processing...
              </div>
            ) : product.supply > 0 ? (
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Buy Now
              </div>
            ) : (
              "Out of Stock"
            )}
          </Button>
          <AddToCartButton product={product} />
        </CardFooter>
      </Card>
    </motion.div>
  );
}
