'use client';

import { motion } from 'framer-motion';
import { icons } from 'lucide-react';
import ItemCard from './ItemCard';

interface CategoryProps {
    id: string;
    title: string;
    subtitle?: string;
    icon: string;
    items: any[];
}

export default function MenuCategory({ id, title, subtitle, icon, items }: CategoryProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 15 } },
    };

    const IconComponent = icons[icon as keyof typeof icons] as React.ElementType;

    return (
        <motion.section
            id={id}
            className="mb-12 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
        >
            <div className="mb-6 relative">
                <div className="flex flex-col md:flex-row md:items-end gap-3 px-4 border-l-4 border-brand-primary">
                    <div>
                        <h3 className="font-serif text-3xl md:text-4xl font-bold text-brand-text">{title}</h3>
                        {subtitle && (
                            <span className="inline-block mt-2 px-3 py-1 bg-brand-primary/10 text-brand-primary text-sm font-semibold italic rounded-full">
                                {subtitle}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {items.map((item, index) => {
                    // Create a unique deterministic ID from category ID and item name
                    const uniqueId = `${id}-${item.name.toLowerCase().replace(/\s+/g, '-')}`;
                    return (
                        <motion.div key={uniqueId} variants={itemVariants}>
                            <ItemCard id={uniqueId} categoryId={id} {...item} />
                        </motion.div>
                    );
                })}
            </div>
        </motion.section>
    );
}
