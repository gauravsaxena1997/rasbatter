import Image from 'next/image';
import { useState } from 'react';
import AddToCartButton from './AddToCartButton';

interface ItemProps {
    id?: string;
    name: string;
    price: number;
    unit?: string;
    description?: string;
    premium?: boolean;
    image?: string;
    categoryId?: string;
}

export default function ItemCard({ id, name, price, unit, description, premium, image, categoryId }: ItemProps) {
    const [imgError, setImgError] = useState(false);
    const originalPrice = Math.round(price / 0.7);

    // Define fallback images from Unsplash based on keywords
    const getFallback = () => {
        if (name.toLowerCase().includes('chocolate')) return 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&h=500&fit=crop';
        if (name.toLowerCase().includes('brownie')) return 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&h=500&fit=crop';
        if (name.toLowerCase().includes('box') || name.toLowerCase().includes('jar')) return 'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=500&h=500&fit=crop';
        return 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&h=500&fit=crop'; // Generic pastry
    };

    const imageSrc = (!imgError && image) ? `/images/${image}.png` : getFallback();

    return (
        <div
            className="relative overflow-hidden group rounded-2xl bg-white/70 backdrop-blur-md shadow-sm border border-white/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-white/90 p-4"
        >
            <div className="flex flex-col md:flex-row gap-4 md:gap-5">

                {/* Top Section / Left Image Area */}
                <div className="flex flex-row gap-4 md:flex-shrink-0 items-start">
                    <div className="relative w-28 h-28 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-brand-text/5">
                        <Image
                            src={imageSrc}
                            alt={name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 112px, 128px"
                            onError={() => setImgError(true)}
                        />
                    </div>

                    {/* Mobile Title & Price (Hidden on MD and up, as they move to the right column) */}
                    <div className="flex-grow flex flex-col justify-center min-h-[7rem] md:hidden">
                        <h4 className="text-lg font-bold leading-tight text-brand-text">
                            {name}
                        </h4>
                        <div className="flex items-center flex-wrap gap-2 mt-1">
                            <div className="flex items-baseline">
                                <span className="text-xl font-bold text-brand-primary">₹{price}</span>
                                {unit && <span className="text-xs font-medium text-brand-text-muted ml-1">/{unit}</span>}
                            </div>
                            <span className="text-sm font-medium text-brand-text-muted line-through">₹{originalPrice}</span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-campaign-primary/10 text-campaign-primary tracking-wider">30% OFF</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Section / Right Content Area */}
                <div className="flex-grow flex flex-col justify-between">

                    {/* Desktop Title & Price (Hidden on Mobile) */}
                    <div className="hidden md:block mb-2">
                        <h4 className="text-xl font-bold leading-tight text-brand-text">
                            {name}
                        </h4>
                        <div className="flex items-center flex-wrap gap-2 mt-1">
                            <div className="flex items-baseline">
                                <span className="text-xl font-bold text-brand-primary">₹{price}</span>
                                {unit && <span className="text-xs font-medium text-brand-text-muted ml-1">/{unit}</span>}
                            </div>
                            <span className="text-sm font-medium text-brand-text-muted line-through">₹{originalPrice}</span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-campaign-primary/10 text-campaign-primary tracking-wider">30% OFF</span>
                        </div>
                    </div>

                    {/* Separator - Visible on both, but spacing differs slightly */}
                    <div className="border-t border-brand-text-muted/20 w-full my-3 md:mt-0 md:mb-3" />

                    {/* Description and Add Button Row */}
                    <div className="flex items-end justify-between gap-4 mt-auto">
                        <div className="flex-grow">
                            {description ? (
                                <p className="text-sm text-brand-text-muted italic leading-snug">
                                    {description}
                                </p>
                            ) : (
                                <p className="text-sm text-brand-text-muted/70 italic">Festive Delight</p>
                            )}
                        </div>
                        <div className="flex-shrink-0">
                            <AddToCartButton item={{ id: id || name, name, price, categoryId }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
