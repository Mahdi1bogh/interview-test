"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface Product {
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
}

interface Category {
  id: number;
  title: string;
}

interface FilterOptions {
  search?: string;
  category?: number;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  maxRating?: number;
  limit?: number;
  offset?: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    limit: 8,
    offset: 0,
  });
  const router = useRouter();
  const fetchProducts = async (options: FilterOptions) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
        { params: options }
      );
      setProducts(response.data.products);
      setTotalProducts(response.data.totalProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/all`
      );
      setCategories(response.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchProducts(filterOptions);
    fetchCategories();
  }, [filterOptions]);

  const handleFilterChange = (name: string, value: string | number) => {
    setFilterOptions((prev) => ({ ...prev, [name]: value, offset: 0 }));
  };

  const applyFilters = () => {
    fetchProducts(filterOptions);
  };

  const resetFilters = () => {
    setFilterOptions({ limit: 8, offset: 0 });
    router.push("/");
  };

  const loadMore = () => {
    const newOffset = filterOptions.offset! + filterOptions.limit!;
    setFilterOptions((prev) => ({ ...prev, offset: newOffset }));
    fetchProducts({ ...filterOptions, offset: newOffset });
  };

  const buyProduct = async (product: Product) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${product.id}/purchase`,
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

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === product.id ? { ...p, supply: p.supply - 1 } : p
        )
      );

      toast.success(`You've bought ${product.name}`);
    } catch (err) {
      console.error("Failed to buy product:", err);
      toast.error("Purchase failed");
    }
  };

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
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search products..."
            value={filterOptions.search || ""}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={filterOptions.category?.toString() || "0"}
            onValueChange={(value) =>
              handleFilterChange("category", Number(value))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">All Categories</SelectItem>{" "}
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Price Range</Label>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Min"
              value={filterOptions.minPrice || ""}
              onChange={(e) =>
                handleFilterChange("minPrice", Number(e.target.value))
              }
            />
            <span>-</span>
            <Input
              type="number"
              placeholder="Max"
              value={filterOptions.maxPrice || ""}
              onChange={(e) =>
                handleFilterChange("maxPrice", Number(e.target.value))
              }
            />
          </div>
        </div>
        {/* <div>
          <Label>Rating Range</Label>
          <Slider
            min={0}
            max={5}
            step={0.5}
            value={[filterOptions.minRating || 0, filterOptions.maxRating || 5]}
            onValueChange={([min, max]: number[]) => {
              handleFilterChange("minRating", min);
              handleFilterChange("maxRating", max);
            }}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{filterOptions.minRating || 0}</span>
            <span>{filterOptions.maxRating || 5}</span>
          </div>
        </div> */}
      </div>
      <div className="flex justify-end space-x-2 mb-6">
        <Button variant="outline" onClick={resetFilters}>
          Reset Filters
        </Button>
        <Button onClick={applyFilters}>Apply Filters</Button>
      </div>
      <p className="mb-4">Total Products: {totalProducts}</p>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-muted rounded-lg h-[400px]"
            />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center text-muted-foreground p-8 bg-muted/50 rounded-lg">
          No products found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onBuy={buyProduct}
              />
            ))}
          </div>
          {products.length < totalProducts && (
            <div className="mt-6 text-center">
              <Button onClick={loadMore}>Load More</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
