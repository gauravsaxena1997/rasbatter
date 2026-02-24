'use client';

import { useCart } from '@/context/CartContext';
import { ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function FloatingCart() {
    const { totalItems, totalPrice, isCartOpen, setCartOpen, clearCart } = useCart();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const phoneNumber = '917023235162';
    const message = encodeURIComponent('Hi! I would like to place an order from your Holi Special Menu.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    // Prevent Hydration errors by returning null or a static skeleton on server
    if (!isMounted) return null;

    return (
        <AnimatePresence>
            {!isCartOpen && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="fixed bottom-6 w-full px-4 md:px-0 md:right-6 md:left-auto md:w-[400px] z-40 flex items-end justify-between md:justify-end gap-3 pointer-events-none"
                >
                    {/* Placeholder space on mobile for the Floating Menu which sits on the left */}
                    <div className="md:hidden flex-shrink-0 w-14 h-14" aria-hidden="true" />
                    {/* Cart Button - animates in when items > 0 */}
                    <AnimatePresence>
                        {totalItems > 0 && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="flex-grow"
                            >
                                <div className="pointer-events-auto w-full h-14 bg-brand-text text-white rounded-2xl flex items-center justify-between pl-3 pr-2 md:pl-5 md:pr-3 shadow-2xl transition-colors">
                                    <button
                                        onClick={() => setCartOpen(true)}
                                        className="flex-grow flex items-center justify-between h-full hover:bg-brand-text/90 group rounded-l-2xl transition-all"
                                    >
                                        <div className="flex flex-col items-start leading-none h-full justify-center group-hover:pl-1 transition-all">
                                            <span className="text-[11px] font-medium text-white/70 tracking-wider mb-0.5">
                                                {totalItems} {totalItems === 1 ? 'ITEM' : 'ITEMS'}
                                            </span>
                                            <span className="text-sm md:text-base font-bold">₹{totalPrice}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 font-bold text-xs md:text-sm mr-2 group-hover:mr-1 transition-all">
                                            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 mb-0.5" />
                                        </div>
                                    </button>

                                    <div className="w-[1px] h-8 bg-white/20 mx-1"></div>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            clearCart();
                                        }}
                                        className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-rose-500/80 text-white/70 hover:text-white transition-all group"
                                        aria-label="Clear Cart"
                                        title="Clear Cart"
                                    >
                                        <X className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {/* WhatsApp Button - Always present */}
                    <div className="flex-shrink-0 h-14 w-14 pointer-events-auto flex items-end justify-end">
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-14 h-14 flex items-center justify-center bg-[#25D366] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-transform duration-300 hover:scale-105"
                            aria-label="Contact support on WhatsApp"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="w-7 h-7 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.446 4.432-9.877 9.881-9.877 2.639 0 5.119 1.028 6.985 2.896a9.832 9.832 0 012.89 6.986c-.001 5.447-4.432 9.878-9.882 9.878m10.835-18.243A11.83 11.83 0 0012.042 0C5.41 0 .011 5.399.009 12.03c0 2.119.554 4.188 1.607 6.046L0 24l6.117-1.605a11.803 11.803 0 005.922 1.57h.005c6.631 0 12.03-5.399 12.032-12.03.003-3.213-1.251-6.234-3.527-8.508z" />
                            </svg>
                        </a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
