'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import ExploreMenuButton from '@/components/ExploreMenuButton';
import { Flower2, Sparkles, CakeSlice, Gift, Palette } from 'lucide-react';

type Variation = 'parallax' | 'platter' | 'explosion' | 'arch' | 'blobs';

export default function HeroVariations() {
  const [activeVariation, setActiveVariation] = useState<Variation>('parallax');

  const { scrollY } = useScroll();
  // Parallax transforms for Concept 1
  const y1 = useTransform(scrollY, [0, 500], [0, -150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -250]);
  const y3 = useTransform(scrollY, [0, 500], [0, -100]);

  // Concept 1: Floating Ingredients Parallax
  const ParallaxHero = () => (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 py-12 md:py-20 overflow-hidden">
      {/* Floating Elements */}
      <motion.div style={{ y: y1 }} className="absolute top-1/4 left-1/4 text-campaign-primary opacity-60 hidden md:block">
        <motion.div animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          <Flower2 size={48} />
        </motion.div>
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute bottom-1/3 right-1/4 text-campaign-tertiary opacity-50 hidden md:block">
        <motion.div animate={{ y: [0, -30, 0], rotate: [0, -15, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
          <Sparkles size={56} />
        </motion.div>
      </motion.div>
      <motion.div style={{ y: y3 }} className="absolute top-1/3 right-1/3 text-brand-primary opacity-40 hidden md:block">
        <motion.div animate={{ y: [0, 20, 0], rotate: [0, 20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
          <CakeSlice size={40} />
        </motion.div>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center">
        <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-widest uppercase text-campaign-primary mb-6 antialiased">
          Ras & Batter
        </h2>
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-extrabold mb-4 leading-none tracking-tight">
          <span className="bg-gradient-to-r from-campaign-primary via-campaign-tertiary to-brand-primary bg-clip-text text-transparent">
            Holi Special
          </span>
          <span className="block text-brand-text font-sans mt-2 md:mt-4 text-4xl md:text-6xl lg:text-7xl tracking-widest font-black uppercase">
            Menu
          </span>
        </h1>
        <p className="max-w-xl mx-auto text-lg md:text-xl text-brand-text-muted mt-8 mb-12">
          Celebrate the festival of colors with our exquisite, handcrafted bakes and treats.
        </p>
        <ExploreMenuButton />
      </div>
    </section>
  );

  // Concept 2: Hero Platter Image
  const PlatterHero = () => (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-20 pb-12 mt-8 md:mt-0">
      <h2 className="font-serif text-xl md:text-2xl font-bold tracking-widest uppercase text-campaign-primary mb-4 antialiased">
        Ras & Batter
      </h2>
      <h1 className="font-serif text-5xl md:text-7xl font-extrabold mb-8 leading-none tracking-tight text-brand-text">
        The Holi Collection
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-5xl aspect-[4/3] md:aspect-video rounded-3xl overflow-hidden shadow-2xl mb-12 border border-brand-primary/10"
      >
        <Image
          src="/images/hero-platter.png"
          alt="Holi Special Dessert Platter"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      <p className="max-w-xl mx-auto text-lg md:text-xl text-brand-text-muted mb-8">
        Immerse yourself in Masterchef-level indulgence and vibrant festive flavors.
      </p>
      <ExploreMenuButton />
    </section>
  );

  // Concept 3: Color Explosion (CSS radial gradients)
  const ExplosionHero = () => (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 py-12 md:py-20 overflow-hidden bg-[#FDFBF7]">
      {/* CSS Blur Explosions */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[800px] md:h-[800px] bg-campaign-primary/20 rounded-full blur-[80px] md:blur-[120px] mix-blend-multiply opacity-70 animate-pulse"></div>
      <div className="absolute top-1/3 left-1/4 md:left-1/3 w-[200px] h-[200px] md:w-[600px] md:h-[600px] bg-campaign-secondary/20 rounded-full blur-[60px] md:blur-[100px] mix-blend-multiply opacity-60"></div>
      <div className="absolute bottom-1/3 right-1/4 md:right-1/3 w-[250px] h-[250px] md:w-[700px] md:h-[700px] bg-campaign-tertiary/20 rounded-full blur-[80px] md:blur-[120px] mix-blend-multiply opacity-60"></div>

      <div className="relative z-10 flex flex-col items-center backdrop-blur-sm bg-white/40 p-8 md:p-12 rounded-3xl border border-white/60 shadow-xl max-w-4xl mx-auto">
        <h2 className="font-serif text-xl md:text-3xl font-bold tracking-widest uppercase text-brand-text mb-4 antialiased">
          Ras & Batter
        </h2>
        <h1 className="font-serif text-6xl md:text-9xl font-extrabold mb-4 leading-none tracking-tight text-brand-text drop-shadow-sm">
          Happy Holi
        </h1>
        <p className="max-w-xl mx-auto text-lg md:text-xl text-brand-text font-medium mt-4 mb-10">
          A vibrant explosion of flavor in every bite.
        </p>
        <ExploreMenuButton />
      </div>
    </section>
  );

  // Concept 4: SVG Icon Arch
  const ArchHero = () => (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-12 md:py-20 overflow-hidden relative">
      {/* Arch Container */}
      <div className="relative w-full h-[150px] md:h-[300px] max-w-2xl mx-auto mb-[-50px] md:mb-[-100px] flex justify-center items-end pb-10">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-dashed border-campaign-primary/30 flex items-center justify-center">
          {/* Placing icons on the circle perimeter */}
          <Palette className="absolute -top-4 md:-top-6 text-campaign-primary" size={32} />
          <Gift className="absolute top-1/4 -right-1 md:-right-2 text-campaign-secondary" size={32} />
          <CakeSlice className="absolute top-1/4 -left-1 md:-left-2 text-campaign-tertiary" size={32} />
          <Flower2 className="absolute bottom-1/4 -right-1 md:-right-2 text-brand-primary" size={32} />
          <Sparkles className="absolute bottom-1/4 -left-1 md:-left-2 text-campaign-primary" size={32} />
        </motion.div>
      </div>

      <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-widest uppercase text-campaign-primary mt-6 mb-4 z-10 relative bg-[#FDFBF7] px-4 rounded-full">
        Ras & Batter
      </h2>
      <h1 className="font-serif text-5xl md:text-8xl font-black uppercase tracking-tighter text-brand-text z-10 relative mb-8 leading-tight">
        Colors <br className="md:hidden" /> of Joy
      </h1>
      <ExploreMenuButton />
    </section>
  );

  // Concept 5: Abstract Blobs
  const BlobsHero = () => (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-12 md:py-20 relative overflow-hidden bg-white">

      {/* Animated Blobs */}
      <div className="absolute inset-0 z-0 flex items-center justify-center mix-blend-multiply opacity-60">
        {/* Blob 1 */}
        <motion.div
          animate={{
            borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 70% 70% 30% / 30% 30% 70% 70%", "60% 40% 30% 70% / 60% 30% 70% 40%"]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-tr from-campaign-primary to-campaign-secondary absolute"
          style={{ filter: 'blur(30px)' }}
        />
        {/* Blob 2 */}
        <motion.div
          animate={{
            borderRadius: ["40% 60% 70% 30% / 40% 40% 60% 50%", "60% 40% 20% 80% / 50% 50% 50% 50%", "40% 60% 70% 30% / 40% 40% 60% 50%"]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-gradient-to-bl from-campaign-tertiary to-brand-primary absolute opacity-70"
          style={{ filter: 'blur(40px)' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <h2 className="font-serif text-xl md:text-3xl font-bold tracking-widest uppercase text-brand-text mb-6 bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">
          Ras & Batter
        </h2>
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-extrabold mb-4 leading-none tracking-tight text-white drop-shadow-2xl">
          Holi Menu
        </h1>
        <p className="max-w-xl mx-auto text-lg md:text-xl text-stone-800 font-medium mt-4 mb-12 bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
          Experience the abstract art of fine baking.
        </p>
        <ExploreMenuButton />
      </div>
    </section>
  );

  return (
    <>
      {/* Floating Toggle Dropdown */}
      <div className="fixed top-2 md:top-4 left-1/2 -translate-x-1/2 z-[100] bg-white/90 backdrop-blur-md shadow-lg border border-stone-200 rounded-full px-3 py-1.5 md:px-4 md:py-2 flex items-center gap-2 md:gap-4 w-auto max-w-[90vw]">
        <label htmlFor="hero-toggle" className="text-xs md:text-sm font-semibold text-stone-600 hidden md:block uppercase tracking-wider whitespace-nowrap">
          Hero Variation
        </label>
        <select
          id="hero-toggle"
          value={activeVariation}
          onChange={(e) => setActiveVariation(e.target.value as Variation)}
          className="bg-stone-50 text-stone-800 text-xs md:text-sm rounded-full py-1.5 md:py-1.5 px-2 md:px-3 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-campaign-primary cursor-pointer font-medium appearance-none"
        >
          <option value="parallax">1. Floating Parallax</option>
          <option value="platter">2. Image Platter</option>
          <option value="explosion">3. Color Explosion</option>
          <option value="arch">4. Icon Arch</option>
          <option value="blobs">5. Abstract Blobs</option>
        </select>
        {/* custom dropdown arrow to offset appearance-none */}
        <div className="pointer-events-none absolute inset-y-0 right-3 md:right-5 flex items-center text-stone-500">
          <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>

      {/* Render selected variation */}
      {activeVariation === 'parallax' && <ParallaxHero />}
      {activeVariation === 'platter' && <PlatterHero />}
      {activeVariation === 'explosion' && <ExplosionHero />}
      {activeVariation === 'arch' && <ArchHero />}
      {activeVariation === 'blobs' && <BlobsHero />}
    </>
  );
}
