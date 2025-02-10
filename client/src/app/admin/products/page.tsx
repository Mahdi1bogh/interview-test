"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  supply: number;
  images: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categoryId: number;
}

interface Category {
  id: number;
  title: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    description: "",
    price: 0,
    supply: 0,
    images: [],
    categoryId: 1,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/products"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast("Error fetching products");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/categories/all"
      );
      setCategories(() => [...response.data]);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast("Error fetching categories");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const numValue =
      name === "price" || name === "supply" ? Number.parseFloat(value) : value;
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: numValue });
    } else {
      setNewProduct({ ...newProduct, [name]: numValue });
    }
  };

  const handleCategoryChange = (value: string) => {
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, categoryId: +value });
    } else {
      setNewProduct({ ...newProduct, categoryId: +value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingProduct) {
        await axios.patch(
          `http://localhost:5005/api/v1/products/${editingProduct.id}`,
          editingProduct,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        toast("Product updated successfully");
      } else {
        await axios.post(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/products",
          {
            ...newProduct,
            images: [
              `https://picsum.photos/200?random=${Math.floor(
                Math.random() * 1000
              )}`,
              `https://picsum.photos/200?random=${Math.floor(
                Math.random() * 50
              )}`,
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        toast("Product added successfully");
      }
      setIsDialogOpen(false);
      setEditingProduct(null);
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        images: [],
        supply: 0,
        categoryId: 1,
      });
      fetchProducts();
    } catch (error) {
      console.error("Error submitting product:", error);
      toast("Error submitting product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      await axios.delete(
        process.env.NEXT_PUBLIC_BACKEND_URL + `/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      toast("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast("Error deleting product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProduct(null)}>Add Product</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Edit Product" : "Add New Product"}
              </DialogTitle>
              <DialogDescription>
                {editingProduct
                  ? "Edit the details of the product."
                  : "Add the details of the new product."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={
                      editingProduct ? editingProduct.name : newProduct.name
                    }
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={
                      editingProduct
                        ? editingProduct.description
                        : newProduct.description
                    }
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={
                      editingProduct ? editingProduct.price : newProduct.price
                    }
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="supply" className="text-right">
                    Supply
                  </Label>
                  <Input
                    id="supply"
                    name="supply"
                    type="number"
                    value={
                      editingProduct ? editingProduct.supply : newProduct.supply
                    }
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select
                    value={
                      editingProduct
                        ? editingProduct.categoryId + ""
                        : newProduct.categoryId + ""
                    }
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id + ""}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Loading..." : editingProduct ? "Update" : "Add"}{" "}
                  Product
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Supply</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id + Math.random()}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.supply}</TableCell>
                <TableCell>{product.categoryId}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
