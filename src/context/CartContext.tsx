import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useAuth } from "./AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type Cart = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  quantity: number;
};

type CartContextType = {
  cart: Cart[];
  addToCart: (cart: Cart, size: number, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setIsCart] = useState<Cart[]>([]);
  const { toast } = useToast();
  const router = useRouter();
  const auth = useAuth();
  const token = auth.token;

  // load cart dari localStorage;
  useEffect(() => {
    const storedItem = localStorage.getItem("cart");
    if (storedItem) {
      setIsCart(JSON.parse(storedItem));
    }
  }, []);

  // save to the localStorage if have change on the cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Cart, size: number, quantity: number) => {
    if (!token) {
      toast({
        title: "Error",
        description:"You must be logged in to continue your shopping",
        variant: "destructive",
      });
      router.push("/auth/sign-in");
      return;
    }

    setIsCart((prev: any) => {
      const existingItem = prev.find((p: Cart) => p.id === product.id);

      // if item has been in the cart
      if (existingItem) {
        return prev.map((p: Cart) => {
          p.id === product.id
            ? { quantity: quantity + 1  }
            : p;
        });
      }

      return [...prev, { ...product, quantity: quantity, size: size }];
    });
  };

  const removeItem = (id: string) => {
    setIsCart((prev: any) => prev.filter((p: Cart) => p.id !== id));
  };

  const clearCart = () => {
    setIsCart([]);
    localStorage.removeItem("cart")
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("Cart Context Must be use the CartProvider");
  }
  return context;
};
