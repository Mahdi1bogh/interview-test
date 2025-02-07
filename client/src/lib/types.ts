// types.ts
export interface Product {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    supply: number;
  }
  
  export interface CartItem extends Product {
    quantity: number;
  }
  
  export type CartContextType = {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string | number) => void;
    updateQuantity: (productId: string | number, quantity: number) => void;
    clearCart: () => void;
  };