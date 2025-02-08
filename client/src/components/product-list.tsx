import { use } from "react";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

export default function ProductList() {
  const products = use(getProducts());

  if (products.length === 0) {
    return (
      <div className="text-center text-muted-foreground p-8 bg-muted/50 rounded-lg">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
