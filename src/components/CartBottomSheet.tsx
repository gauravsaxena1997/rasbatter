'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin } from 'lucide-react';
import AddToCartButton from './AddToCartButton';

export default function CartBottomSheet() {
    const { items, isCartOpen, setCartOpen, totalPrice, clearCart } = useCart();

    // Delivery Form State
    const [deliveryDate, setDeliveryDate] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');

    // Compute min and max dates (Today to Today + 7 days)
    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    const maxDateObj = new Date(today);
    maxDateObj.setDate(maxDateObj.getDate() + 7);
    const maxDate = maxDateObj.toISOString().split('T')[0];

    useEffect(() => {
        if (isCartOpen && !deliveryDate) {
            setDeliveryDate(minDate); // Default to today securely on client-side
        }
    }, [isCartOpen, deliveryDate, minDate]);

    const handleWhatsAppOrder = () => {
        const phoneNumber = '917023235162';
        let message = 'Hi! I would like to place an order from your Holi Special Menu:\n\n';

        items.forEach(item => {
            message += `${item.quantity}x ${item.name} - ₹${item.price * item.quantity}\n`;
        });

        message += `\n*Delivery Date:* ${deliveryDate}`;
        if (deliveryAddress.trim()) {
            message += `\n*Delivery Address:* ${deliveryAddress.trim()}`;
        }
        message += `\n\n*Grand Total: ₹${totalPrice}*`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setCartOpen(false)}
                        className="fixed inset-0 bg-brand-text/40 backdrop-blur-sm z-50 flex items-end sm:items-center sm:justify-center p-0 sm:p-4"
                    >
                        {/* Bottom Sheet Modal */}
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[85vh] sm:max-h-[80vh] overflow-hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-5 border-b border-brand-text-muted/10">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-xl font-bold text-brand-text">Your Cart</h2>
                                    {items.length > 0 && (
                                        <button
                                            onClick={() => clearCart()}
                                            className="text-sm font-semibold text-rose-500 hover:text-rose-600 transition-colors uppercase tracking-wide"
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>
                                <button
                                    onClick={() => setCartOpen(false)}
                                    className="p-2 bg-brand-text-muted/10 text-brand-text-muted hover:text-brand-text rounded-full transition-colors active:scale-95"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Cart Items List */}
                            <div className="flex-grow overflow-y-auto p-5 scroll-smooth overscroll-contain" data-lenis-prevent="true">
                                {items.length === 0 ? (
                                    <div className="text-center text-brand-text-muted py-10">
                                        Your cart is empty. Add some festive treats!
                                    </div>
                                ) : (
                                    <ul className="space-y-6">
                                        {items.map((item) => (
                                            <li key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                                <div>
                                                    <h3 className="font-semibold text-brand-text">{item.name}</h3>
                                                    <p className="text-brand-primary font-bold">₹{item.price * item.quantity}</p>
                                                </div>
                                                <div className="self-start sm:self-auto">
                                                    <AddToCartButton item={item} />
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Footer / Checkout */}
                            {items.length > 0 && (
                                <div className="p-5 bg-white border-t border-brand-text-muted/20 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] sm:rounded-b-2xl">
                                    {/* Additional Delivery Details */}
                                    <div className="flex flex-col gap-3 mb-5 border-b border-brand-text-muted/10 pb-5">
                                        <div className="flex flex-col gap-1.5">
                                            <label htmlFor="deliveryDate" className="text-sm font-semibold text-brand-text flex items-center gap-1.5">
                                                <Calendar size={14} className="text-campaign-tertiary" />
                                                Delivery Date <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                id="deliveryDate"
                                                min={minDate}
                                                max={maxDate}
                                                value={deliveryDate}
                                                onChange={(e) => setDeliveryDate(e.target.value)}
                                                className="border border-brand-text-muted/30 rounded-lg p-2.5 bg-stone-50 focus:ring-2 focus:ring-campaign-tertiary/50 focus:border-campaign-tertiary outline-none transition-all text-brand-text font-medium text-sm"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label htmlFor="deliveryAddress" className="text-sm font-semibold text-brand-text flex items-center gap-1.5">
                                                <MapPin size={14} className="text-brand-primary" />
                                                Delivery Address <span className="text-brand-text-muted text-[10px] font-normal uppercase tracking-wider ml-1">(Optional)</span>
                                            </label>
                                            <textarea
                                                id="deliveryAddress"
                                                placeholder="Enter house, street, landmark..."
                                                rows={2}
                                                value={deliveryAddress}
                                                onChange={(e) => setDeliveryAddress(e.target.value)}
                                                className="border border-brand-text-muted/30 rounded-lg p-2.5 bg-stone-50 focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary outline-none transition-all text-brand-text resize-none text-sm placeholder:text-stone-400"
                                            />
                                        </div>
                                    </div>

                                    {/* Totals & Button */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-brand-text-muted font-medium">Grand Total</span>
                                        <span className="text-2xl font-black text-brand-text">₹{totalPrice}</span>
                                    </div>
                                    <button
                                        onClick={handleWhatsAppOrder}
                                        className="w-full flex items-center justify-center gap-2 py-4 bg-[#25D366] text-white font-bold text-lg rounded-xl shadow-lg hover:bg-[#20bd5a] transition-all active:scale-[0.98]"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="w-6 h-6 fill-current"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.446 4.432-9.877 9.881-9.877 2.639 0 5.119 1.028 6.985 2.896a9.832 9.832 0 012.89 6.986c-.001 5.447-4.432 9.878-9.882 9.878m10.835-18.243A11.83 11.83 0 0012.042 0C5.41 0 .011 5.399.009 12.03c0 2.119.554 4.188 1.607 6.046L0 24l6.117-1.605a11.803 11.803 0 005.922 1.57h.005c6.631 0 12.03-5.399 12.032-12.03.003-3.213-1.251-6.234-3.527-8.508z" />
                                        </svg>
                                        Book on WhatsApp
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
