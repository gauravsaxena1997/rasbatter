import Image from 'next/image';
import SmoothScroller from '@/components/SmoothScroller';
import MenuCategory from '@/components/MenuCategory';
import menuData from '@/config/menu.json';
import { Gift, Instagram } from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';
import ExploreMenuButton from '@/components/ExploreMenuButton';

export default function Home() {
  return (
    <SmoothScroller>
      <main className="min-h-screen text-brand-text font-sans selection:bg-campaign-primary/20 selection:text-campaign-primary">



        <div className="relative z-10">
          {/* Finalized Hero Section: Full viewport background image */}
          <section className="relative min-h-screen w-full flex flex-col justify-center items-center text-center px-6 overflow-hidden">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none">
              <Image
                src="/images/hero-platter.png"
                alt="Holi Special Dessert Platter"
                fill
                className="object-cover object-center"
                quality={90}
                priority
              />
              {/* Subtle dark overlays to ensure maximum text contrast & depth */}
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            {/* Content overlay with drop shadows for depth */}
            <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto px-4 mt-12 md:mt-24">
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-widest uppercase text-white mb-4 md:mb-6 antialiased drop-shadow-md">
                Ras & Batter
              </h2>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 leading-[1.1] tracking-tight text-white drop-shadow-2xl">
                <span className="bg-gradient-to-r from-pink-200 via-yellow-100 to-cyan-100 bg-clip-text text-transparent drop-shadow-2xl">
                  The Holi Collection
                </span>
              </h1>
              <p className="max-w-xl mx-auto text-lg md:text-xl text-stone-100 font-medium mb-10 md:mb-12 drop-shadow-lg">
                Where every bite is a celebration, handcrafted with love and vibrant festive flavors.
              </p>
              <ExploreMenuButton />
            </div>
          </section>

          {/* Menu Sections */}
          <div id="menu" className="max-w-7xl mx-auto px-6 pt-8 pb-4 md:pt-16 md:pb-8">
            {/* Combos Section (Moved to top) */}
            <section id="combos" className="mb-12 md:mb-16">
              <div className="flex flex-col items-center text-center mb-8 md:mb-10">
                <h3 className="font-serif text-3xl md:text-5xl font-bold text-brand-text">Holi Combo Offers</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {menuData.combos.map((combo) => {
                  const originalPrice = Math.round(combo.price / 0.7);
                  return (
                    <div
                      key={combo.id}
                      className="relative p-5 md:p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl flex flex-col sm:flex-row gap-5 md:gap-6 transition-all duration-500 hover:-translate-y-1"
                    >
                      {/* Left Side: Image */}
                      {combo.image && (
                        <div className="relative w-full sm:w-40 md:w-48 flex-shrink-0 h-48 sm:h-auto min-h-[12rem] rounded-2xl overflow-hidden shadow-sm bg-brand-text/5">
                          <Image
                            src={`/images/${combo.image}.png`}
                            alt={combo.title}
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-105"
                            sizes="(max-width: 640px) 100vw, 33vw"
                          />
                        </div>
                      )}

                      {/* Right Side: Content */}
                      <div className="flex flex-col flex-grow">
                        <h4 className="font-serif text-2xl md:text-3xl font-bold mb-4 text-brand-text">{combo.title}</h4>

                        <ul className="flex-grow space-y-2 mb-6">
                          {combo.items.map((item, idx) => (
                            <li key={idx} className="flex items-center text-sm md:text-base text-brand-text-muted font-medium pb-2 border-b border-brand-text-muted/10 last:border-0 pl-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-campaign-primary mr-3 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-auto flex items-end justify-between border-t border-brand-text-muted/20 pt-4">
                          <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-2">
                              <span className="text-sm md:text-base font-medium text-brand-text-muted line-through">₹{originalPrice}</span>
                              <span className="text-[10px] md:text-xs font-bold px-1.5 py-0.5 rounded bg-campaign-primary/10 text-campaign-primary tracking-wider">30% OFF</span>
                            </div>
                            <span className="text-3xl md:text-4xl font-black text-campaign-primary">₹{combo.price}</span>
                          </div>
                          <div className="scale-100 origin-bottom-right">
                            <AddToCartButton item={{ id: combo.id, name: combo.title, price: combo.price, categoryId: 'combos' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Regular Menu Categories */}
            {menuData.categories.map((category) => (
              <MenuCategory key={category.id} {...category} />
            ))}
          </div>

          <footer className="bg-gradient-to-t from-campaign-primary/10 to-transparent pt-12 pb-32 md:pb-16 text-center">
            <h2 className="font-serif text-2xl font-bold text-brand-primary mb-2">Ras & Batter</h2>
            <p className="text-brand-text-muted text-lg mb-6">Wishing you a joyful and colorful Holi!</p>

            <div className="flex flex-col items-center justify-center gap-3">
              <p className="font-medium text-brand-text">Follow our baking journey</p>
              <a
                href="https://www.instagram.com/rasbatter_homebakery/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-primary/10 text-brand-primary font-semibold hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(217,119,6,0.1)] hover:shadow-[0_0_20px_rgba(217,119,6,0.4)] hover:-translate-y-1"
              >
                <Instagram className="w-5 h-5" />
                @rasbatter_homebakery
              </a>
            </div>

            <p className="mt-8 font-semibold text-brand-text">To place an order, please contact us directly.</p>
          </footer>
        </div>
      </main>
    </SmoothScroller>
  );
}
