import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  coverImage: string;
  category: {
    name: string;
  };
}

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
}

interface Cart {
  items: CartItem[];
  totalAmount: number;
  itemCount: number;
}

interface CartContextType {
  cart: Cart;
  sessionId: string;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateCartItem: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Cart>({ items: [], totalAmount: 0, itemCount: 0 });
  const [sessionId, setSessionId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Generate or get session ID
  useEffect(() => {
    let id = localStorage.getItem('cart_session_id');
    if (!id) {
      id = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('cart_session_id', id);
    }
    setSessionId(id);
  }, []);

  // Load cart when sessionId is available
  useEffect(() => {
    if (sessionId) {
      refreshCart();
    }
  }, [sessionId]);

  const refreshCart = async () => {
    if (!sessionId) return;
    
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3001/api/cart?sessionId=${sessionId}`);
      if (response.ok) {
        const cartData = await response.json();
        setCart(cartData);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId: number, quantity: number = 1) => {
    if (!sessionId) return;

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3001/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity,
          sessionId,
        }),
      });

      if (response.ok) {
        await refreshCart();
      } else {
        throw new Error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId: number) => {
    if (!sessionId) return;

    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3001/api/cart/remove/${productId}?sessionId=${sessionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await refreshCart();
      } else {
        throw new Error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItem = async (productId: number, quantity: number) => {
    if (!sessionId) return;

    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3001/api/cart/update/${productId}?sessionId=${sessionId}&quantity=${quantity}`, {
        method: 'PUT',
      });

      if (response.ok) {
        await refreshCart();
      } else {
        throw new Error('Failed to update cart item');
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    if (!sessionId) return;

    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3001/api/cart/clear?sessionId=${sessionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCart({ items: [], totalAmount: 0, itemCount: 0 });
      } else {
        throw new Error('Failed to clear cart');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: CartContextType = {
    cart,
    sessionId,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    refreshCart,
    isLoading,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 