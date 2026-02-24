'use client';

import { useCart, CartItem } from '@/context/CartContext';
import { Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface Props {
    item: Omit<CartItem, 'quantity'>;
}

// Vibrant Holi colors for the subtle powder splash effect
const SPLASH_COLORS = ['#d946ef', '#22d3ee', '#f59e0b', '#10b981', '#f43f5e', '#a855f7'];

export default function AddToCartButton({ item }: Props) {
    const { items, addItem, updateQuantity } = useCart();
    const cartItem = items.find(i => i.id === item.id);
    const quantity = cartItem?.quantity || 0;

    const [showSplash, setShowSplash] = useState(false);

    // Determine the max limit for this item's category
    const getCategoryLimit = (categoryId?: string) => {
        switch (categoryId) {
            case 'gujiya': return 5;
            case 'cakes': return 2;
            case 'chocolates': return 20;
            case 'brownies': return 20;
            case 'cupcakes': return 5;
            case 'combos': return 5;
            default: return 99;
        }
    };
    const maxLimit = getCategoryLimit(item.categoryId);
    const isAtLimit = quantity >= maxLimit;

    // Trigger splash only when going from 0 to 1
    const handleAddClick = () => {
        addItem(item);
        setShowSplash(true);
        // Hide splash particles after animation completes
        setTimeout(() => setShowSplash(false), 800);
    };

    return (
        <div className="relative flex items-center justify-center w-[90px] h-9">
            {/* Contextual Splash Particles - Holi Powder Effect */}
            <AnimatePresence>
                {showSplash && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
                        {[...Array(12)].map((_, i) => {
                            const color = SPLASH_COLORS[i % SPLASH_COLORS.length];
                            const angle = (i / 12) * Math.PI * 2;
                            // Randomize particle travel distance
                            const distance = 25 + Math.random() * 35;
                            const x = Math.cos(angle) * distance;
                            const y = Math.sin(angle) * distance;

                            // Scale down to simulate fine powder
                            const size = 3 + Math.random() * 5;

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                                    animate={{
                                        scale: [0, 1.2, 0.5],
                                        x: x,
                                        y: y,
                                        opacity: [1, 1, 0]
                                    }}
                                    transition={{
                                        duration: 0.5 + Math.random() * 0.4,
                                        ease: "easeOut"
                                    }}
                                    className="absolute rounded-full blur-[1px]"
                                    style={{
                                        backgroundColor: color,
                                        width: size,
                                        height: size
                                    }}
                                />
                            );
                        })}
                    </div>
                )}
            </AnimatePresence>

            {/* Seamless Component morphing between ADD and the Counter */}
            <AnimatePresence mode="wait">
                {quantity === 0 ? (
                    <motion.button
                        key="add-button"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
                        transition={{ duration: 0.2 }}
                        onClick={handleAddClick}
                        className="absolute inset-0 w-full h-full bg-brand-primary/5 text-brand-primary border border-brand-primary/20 font-bold rounded-xl shadow-sm hover:bg-brand-primary/10 hover:border-brand-primary/30 transition-all active:scale-95 text-sm"
                    >
                        ADD
                    </motion.button>
                ) : (
                    <motion.div
                        key="counter-widget"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 flex items-center justify-between w-full h-full bg-brand-primary/5 border border-brand-primary/20 rounded-xl shadow-sm overflow-hidden"
                    >
                        <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-1/3 h-full flex items-center justify-center text-brand-primary hover:bg-brand-primary/10 transition-colors active:bg-brand-primary/20"
                            aria-label="Decrease quantity"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <motion.span
                            key={quantity} // Simple pop animation when quantity changes
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="w-1/3 text-center text-sm font-bold text-brand-primary"
                        >
                            {quantity}
                        </motion.span>
                        <button
                            onClick={() => !isAtLimit && updateQuantity(item.id, 1)}
                            disabled={isAtLimit}
                            className={`w-1/3 h-full flex items-center justify-center transition-colors 
                                ${isAtLimit
                                    ? 'text-brand-primary/30 cursor-not-allowed bg-brand-primary/5'
                                    : 'text-brand-primary hover:bg-brand-primary/10 active:bg-brand-primary/20'
                                }`}
                            aria-label={isAtLimit ? "Maximum quantity reached" : "Increase quantity"}
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
