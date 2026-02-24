'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UtensilsCrossed, X } from 'lucide-react';
import menuData from '@/config/menu.json';
import { useCart } from '@/context/CartContext';

export default function FloatingMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { totalItems } = useCart();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const scrollToCategory = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            // Offset for sticky headers and neat spacing
            const y = element.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    // Dynamically compile categories and counts from menu.json
    const categories = menuData.categories.map(cat => ({
        id: cat.id,
        title: cat.title,
        count: cat.items.length
    }));

    // Append Combos if they exist
    if (menuData.combos && menuData.combos.length > 0) {
        categories.push({
            id: 'combos',
            title: 'Holi Combo Offers',
            count: menuData.combos.length
        });
    }

    // Prevent Hydration errors by returning null or a static skeleton on server
    if (!isMounted) return null;

    return (
        <div
            ref={menuRef}
            className={`fixed z-40 flex flex-col transition-all duration-300 bottom-6 left-4 md:left-6 items-start`}
        >
            {/* The Popup Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className={`mb-4 bg-white/95 backdrop-blur-xl border border-brand-primary/20 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-3xl p-3 w-72 max-h-[60vh] overflow-y-auto ${totalItems > 0 ? 'origin-bottom-left' : 'origin-bottom'
                            }`}
                    >
                        <h3 className="text-xs font-bold tracking-widest text-brand-text-muted uppercase text-center mb-2 mt-1">Menu</h3>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => scrollToCategory(cat.id)}
                                className="w-full text-left px-5 py-3.5 rounded-2xl hover:bg-brand-primary/10 transition-colors flex items-center justify-between group"
                            >
                                <span className="font-semibold text-brand-text text-sm md:text-base group-hover:text-brand-primary transition-colors">
                                    {cat.title}
                                </span>
                                <span className="text-xs font-bold text-brand-text-muted bg-brand-text/5 px-2.5 py-1 rounded-full group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-colors">
                                    {cat.count}
                                </span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* The Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center gap-2 bg-brand-text text-white rounded-full shadow-[0_4px_20px_rgba(44,30,22,0.4)] hover:bg-brand-text/90 hover:shadow-[0_0_20px_rgba(44,30,22,0.6)] transition-all active:scale-95 border border-white/10
                    /* Mobile: Circular icon */
                    w-14 h-14 md:w-auto md:h-14 md:px-6 md:py-3.5"
            >
                {isOpen ? <X className="w-6 h-6 md:w-5 md:h-5" /> : <UtensilsCrossed className="w-6 h-6 md:w-5 md:h-5" />}
                <span className="hidden md:inline font-bold tracking-widest uppercase text-xs">Menu</span>
            </button>
        </div>
    );
}
