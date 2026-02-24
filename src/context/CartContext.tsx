'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface CartItem {
    id: string; // Unique identifier (name + optional variations)
    name: string;
    price: number;
    quantity: number;
    categoryId?: string; // To enforce max quantity limits
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
    isCartOpen: boolean;
    setCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setCartOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Hydration fix for localStorage (optional step, but good for carts)
    useEffect(() => {
        setIsMounted(true);
        const saved = localStorage.getItem('rasandbatter_cart');
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('rasandbatter_cart', JSON.stringify(items));
        }
    }, [items, isMounted]);

    // Define category limits
    const getCategoryLimit = (categoryId?: string) => {
        switch (categoryId) {
            case 'gujiya': return 5;
            case 'cakes': return 2;
            case 'chocolates': return 20;
            case 'brownies': return 20;
            case 'cupcakes': return 5;
            case 'combos': return 5;
            default: return 99; // Fallback
        }
    };

    const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
        setItems(prev => {
            const existing = prev.find(item => item.id === newItem.id);
            const limit = getCategoryLimit(newItem.categoryId);

            if (existing) {
                if (existing.quantity >= limit) return prev; // Do not exceed limit
                return prev.map(item =>
                    item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...newItem, quantity: 1 }];
        });
    };

    const removeItem = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id: string, delta: number) => {
        setItems(prev => prev.map(item => {
            if (item.id === id) {
                const limit = getCategoryLimit(item.categoryId);
                // Ensure new quantity doesn't exceed the limit
                const newQuantity = Math.min(limit, Math.max(0, item.quantity + delta));
                return { ...item, quantity: newQuantity };
            }
            return item;
        }).filter(item => item.quantity > 0)); // Auto-remove if quantity hits 0
    };

    const clearCart = () => {
        setItems([]);
        setCartOpen(false);
    };

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            items,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            totalItems,
            totalPrice,
            isCartOpen,
            setCartOpen
        }}>
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
