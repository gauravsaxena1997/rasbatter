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
          {/* Hero Section */}
          <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-12 md:py-20">
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
          </section>

          {/* Menu Sections */}
          <div id="menu" className="max-w-7xl mx-auto px-6 pt-8 pb-4 md:pt-16 md:pb-8">
            {menuData.categories.map((category) => (
              <MenuCategory key={category.id} {...category} />
            ))}

            {/* Combos Section */}
            <section id="combos" className="mb-0">
              <div className="flex flex-col items-center text-center mb-16">
                <h3 className="font-serif text-4xl md:text-5xl font-bold text-brand-text">Holi Combo Offers</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {menuData.combos.map((combo) => (
                  <div
                    key={combo.id}
                    className="relative p-6 md:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl flex flex-col transition-all duration-500 hover:-translate-y-2"
                  >
                    <h4 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-brand-text">{combo.title}</h4>

                    {combo.image && (
                      <div className="relative w-full h-48 md:h-56 mb-6 rounded-2xl overflow-hidden shadow-sm bg-brand-text/5">
                        <Image
                          src={`/images/${combo.image}.png`}
                          alt={combo.title}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    )}

                    <ul className="flex-grow space-y-4 mb-8">
                      {combo.items.map((item, idx) => (
                        <li key={idx} className="flex items-center text-lg text-brand-text-muted font-medium pb-4 border-b border-brand-text-muted/10 last:border-0 pl-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-campaign-primary mr-3 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex items-end justify-between border-t border-brand-text-muted/20 pt-5">
                      <span className="text-4xl lg:text-5xl font-black text-campaign-primary">₹{combo.price}</span>
                      <div className="scale-110 origin-bottom-right">
                        <AddToCartButton item={{ id: combo.id, name: combo.title, price: combo.price, categoryId: 'combos' }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
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
