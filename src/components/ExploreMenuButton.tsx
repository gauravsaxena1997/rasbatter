'use client';

export default function ExploreMenuButton() {
    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                // @ts-ignore - lenis is added to window by SmoothScroller component
                if (window.lenis) {
                    // @ts-ignore
                    window.lenis.scrollTo('#menu', { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
                } else {
                    // Fallback to native smooth scroll if lenis isn't ready
                    document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' });
                }
            }}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 rounded-full bg-brand-primary hover:shadow-[0_0_30px_var(--color-brand-primary)] hover:-translate-y-1"
        >
            Explore Menu
        </button>
    );
}
