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
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold overflow-hidden rounded-full bg-brand-primary text-white transition-all hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] hover:-translate-y-1"
        >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-campaign-primary via-campaign-tertiary to-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300 drop-shadow-md">
                Explore Menu
            </span>
        </button>
    );
}
