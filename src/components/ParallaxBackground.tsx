'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ParallaxBackground() {
    const { scrollYProgress } = useScroll();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Transform values for parallax effect
    // Y-axis movement (slower than scroll)
    const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
    const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
    const y4 = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);

    // Rotation
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 90]);
    const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
    const rotate3 = useTransform(scrollYProgress, [0, 1], [0, 45]);
    const rotate4 = useTransform(scrollYProgress, [0, 1], [0, -90]);

    if (!isMounted) return null;

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-brand-bg">
            {/* Blob 1: Fuchsia (Top Right) */}
            <motion.div
                style={{ y: y1, rotate: rotate1 }}
                className="absolute -top-40 -right-40 w-96 h-96 bg-campaign-primary/5 rounded-full blur-[100px] mix-blend-multiply"
            />

            {/* Blob 2: Yellow (Middle Left) */}
            <motion.div
                style={{ y: y2, rotate: rotate2 }}
                className="absolute top-[30%] -left-32 w-[28rem] h-[28rem] bg-campaign-tertiary/5 rounded-full blur-[100px] mix-blend-multiply"
            />

            {/* Blob 3: Cyan (Bottom Right) */}
            <motion.div
                style={{ y: y3, rotate: rotate3 }}
                className="absolute top-[60%] -right-48 w-[32rem] h-[32rem] bg-campaign-secondary/5 rounded-full blur-[120px] mix-blend-multiply"
            />

            {/* Blob 4: Magenta (Bottom Left) */}
            <motion.div
                style={{ y: y4, rotate: rotate4 }}
                className="absolute top-[80%] -left-40 w-[30rem] h-[30rem] bg-campaign-primary/5 rounded-full blur-[100px] mix-blend-multiply"
            />

            {/* Base noise texture for extra premium feel (optional, keeps it subtle) */}
            <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%22")' }}></div>
        </div>
    );
}
