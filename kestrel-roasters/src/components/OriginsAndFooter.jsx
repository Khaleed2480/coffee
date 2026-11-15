import React, { useState } from 'react';
import {
  ArrowUpRight,
  ArrowUp,
  MapPin,
  Clock,
  Mail,
  CheckCircle2,
} from 'lucide-react';

const ORIGIN_PARTNERS = [
  {
    country: 'ETHIOPIA',
    harvest: 'Nov - Jan',
    region: 'Gedeb & Guji Highlands',
    partner: 'Worka Sakaro Washing Station',
    description:
      'Raised-bed natural and clean mountain spring washed heirlooms paid 2.4x commodity benchmark.',
    elevation: '2,080 - 2,200 MASL',
    lots: '14 Micro-Lots',
  },
  {
    country: 'HONDURAS',
    harvest: 'Feb - Apr',
    region: 'La Paz, Marcala',
    partner: 'Finca El Puente Producers',
    description:
      'Shade-grown under native inga trees with solar patio drying for crisp stone-fruit clarity.',
    elevation: '1,620 - 1,740 MASL',
    lots: '9 Micro-Lots',
  },
  {
    country: 'COLOMBIA',
    harvest: 'May - Jul',
    region: 'Acevedo, Southern Huila',
    partner: 'Asociación Los Naranjos',
    description:
      'Long-fermentation washed Caturra lots forming the sweet backbone of our espresso program.',
    elevation: '1,800 - 1,950 MASL',
    lots: '11 Micro-Lots',
  },
];

export default function OriginsAndFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleDispatchSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 04. Direct Trade Origins */}
      <section id="origins" className="mx-auto max-w-6xl px-6 pb-20 pt-6">
        <div className="mb-8">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7A736B]">
            04. Direct Trade Origins
          </p>
          <h2 className="font-serif-editorial text-3xl font-semibold text-[#181615] sm:text-4xl">
            Partner farms & seasonal harvests.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {ORIGIN_PARTNERS.map((origin) => (
            <article
              key={origin.country}
              className="flex flex-col justify-between rounded-2xl border border-[#E6E1D8] bg-[#F5F2EC]/70 p-6 transition-colors hover:bg-white"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-medium">
                  <span className="tracking-[0.16em] text-[#7A736B]">
                    {origin.country}
                  </span>
                  <span className="font-mono text-[#7A736B]">
                    {origin.harvest}
                  </span>
                </div>

                <h3 className="font-serif-editorial mt-3 text-xl font-semibold text-[#181615]">
                  {origin.region}
                </h3>
                <p className="mt-1 text-xs font-medium text-[#A34E26]">
                  {origin.partner}
                </p>

                <p className="mt-4 text-xs leading-relaxed text-[#5C5650]">
                  {origin.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#E6E1D8] pt-4 font-mono text-[11px] text-[#7A736B]">
                <span>{origin.elevation}</span>
                <span>{origin.lots}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Professional Editorial Footer */}
      <footer className="bg-[#161412] text-[#FBF9F5]">
        <div className="mx-auto max-w-6xl px-6 pb-10 pt-16">
          {/* Top Newsletter / Harvest Dispatch Tier */}
          <div className="grid items-center gap-8 border-b border-[#2B2722] pb-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E08E55]">
                Harvest Dispatch
              </p>
              <h2 className="font-serif-editorial mt-2 text-2xl font-semibold text-[#FBF9F5] sm:text-3xl">
                First access to seasonal micro-lots.
              </h2>
              <p className="mt-2 max-w-md text-xs leading-relaxed text-[#A8A198]">
                Join our cupping log for early release notes when new washed
                Ethiopian, Colombian, and anaerobic lots land at the roastery.
              </p>
            </div>

            <div className="lg:col-span-6">
              <form
                onSubmit={handleDispatchSubmit}
                className="flex flex-col gap-2.5 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSubscribed(false);
                  }}
                  placeholder="Enter your email address"
                  className="flex-1 rounded-lg border border-[#2E2A25] bg-[#1E1B18] px-4 py-3 text-xs text-[#FBF9F5] placeholder-[#7D766D] transition-colors focus:border-[#E08E55] focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#A34E26] px-6 py-3 text-xs font-semibold text-white transition-colors hover:bg-[#8B411E]"
                >
                  <span>Join Dispatch</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </form>

              {subscribed ? (
                <p className="mt-2.5 flex items-center gap-1.5 text-xs text-[#E08E55]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>
                    Subscribed — watch your inbox for our next roast log.
                  </span>
                </p>
              ) : (
                <p className="mt-2.5 text-[11px] text-[#7D766D]">
                  Sent bi-weekly on roast mornings. Unsubscribe anytime.
                </p>
              )}
            </div>
          </div>

          {/* Middle 4-Column Navigation & Roastery Card */}
          <div className="grid gap-10 py-14 md:grid-cols-12">
            {/* Brand Identity */}
            <div className="md:col-span-4">
              <a
                href="#"
                className="font-serif-editorial text-2xl font-semibold tracking-tight text-[#FBF9F5]"
              >
                Kestrel Roasters
              </a>
              <p className="mt-3 max-w-xs text-xs leading-relaxed text-[#A8A198]">
                Small-batch specialty coffee roasted on cast-iron Probat drums
                in Portland’s Pearl District. Direct trade lots roasted to order
                and dispatched within 24 hours.
              </p>

              {/* Trust Badges */}
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-md border border-[#2B2722] bg-[#1C1916] px-2.5 py-1 font-mono text-[10px] text-[#A8A198]">
                  87.5+ SCA Graded
                </span>
                <span className="rounded-md border border-[#2B2722] bg-[#1C1916] px-2.5 py-1 font-mono text-[10px] text-[#A8A198]">
                  100% Direct Trade
                </span>
              </div>

              {/* Minimal Social Links */}
              <div className="mt-6 flex items-center gap-4 text-xs text-[#A8A198]">
                <a
                  href="#instagram"
                  className="transition-colors hover:text-[#E08E55]"
                >
                  Instagram
                </a>
                <span className="text-[#2E2A25]">·</span>
                <a
                  href="#journal"
                  className="transition-colors hover:text-[#E08E55]"
                >
                  Cupping Journal
                </a>
                <span className="text-[#2E2A25]">·</span>
                <a
                  href="#wholesale"
                  className="transition-colors hover:text-[#E08E55]"
                >
                  Wholesale
                </a>
              </div>
            </div>

            {/* Column 2: Coffee & Brew */}
            <div className="md:col-span-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7D766D]">
                Coffee & Brew
              </p>
              <ul className="mt-4 space-y-2.5 text-xs text-[#D6D0C7]">
                <li>
                  <a href="#roasts" className="transition-colors hover:text-[#E08E55]">
                    Seasonal Roasts
                  </a>
                </li>
                <li>
                  <a href="#roasts" className="transition-colors hover:text-[#E08E55]">
                    Reserve Micro-Lots
                  </a>
                </li>
                <li>
                  <a href="#craft" className="transition-colors hover:text-[#E08E55]">
                    Thermal Profiling
                  </a>
                </li>
                <li>
                  <a href="#brew-guide" className="transition-colors hover:text-[#E08E55]">
                    Brew Calculator
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Roastery */}
            <div className="md:col-span-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7D766D]">
                Roastery
              </p>
              <ul className="mt-4 space-y-2.5 text-xs text-[#D6D0C7]">
                <li>
                  <a href="#origins" className="transition-colors hover:text-[#E08E55]">
                    Farm Partnerships
                  </a>
                </li>
                <li>
                  <a href="#origins" className="transition-colors hover:text-[#E08E55]">
                    2026 Transparency
                  </a>
                </li>
                <li>
                  <a href="#roasts" className="transition-colors hover:text-[#E08E55]">
                    Roaster Subscriptions
                  </a>
                </li>
                <li>
                  <a href="#craft" className="transition-colors hover:text-[#E08E55]">
                    Equipment & Training
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Tasting Bar & Contact Card */}
            <div className="md:col-span-4">
              <div className="rounded-2xl border border-[#2B2722] bg-[#1C1916] p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E08E55]">
                  Portland Tasting Bar
                </p>

                <div className="mt-4 space-y-3 text-xs text-[#D6D0C7]">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#7D766D]" />
                    <p className="leading-relaxed">
                      742 NW Flanders St
                      <br />
                      Pearl District, Portland, OR 97209
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#7D766D]" />
                    <p className="leading-relaxed text-[#A8A198]">
                      Mon–Fri: 07:00 – 16:00 PST
                      <br />
                      Sat–Sun: 08:00 – 17:00 PST
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 pt-1">
                    <Mail className="h-3.5 w-3.5 shrink-0 text-[#7D766D]" />
                    <a
                      href="mailto:hello@kestrelroasters.com"
                      className="font-mono text-[11px] text-[#FBF9F5] transition-colors hover:text-[#E08E55]"
                    >
                      hello@kestrelroasters.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Legal & Back-to-Top Bar */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-[#2B2722] pt-7 text-[11px] text-[#7D766D] sm:flex-row">
            <p>© 2026 Kestrel Roasters LLC. All rights reserved.</p>

            <div className="flex flex-wrap items-center gap-5">
              <a href="#privacy" className="transition-colors hover:text-[#D6D0C7]">
                Privacy Policy
              </a>
              <a href="#terms" className="transition-colors hover:text-[#D6D0C7]">
                Terms of Service
              </a>
              <a href="#shipping" className="transition-colors hover:text-[#D6D0C7]">
                Shipping & Returns
              </a>

              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1 rounded-md border border-[#2B2722] bg-[#1C1916] px-2.5 py-1 text-[#D6D0C7] transition-colors hover:border-[#E08E55] hover:text-[#FBF9F5]"
              >
                <span>Top</span>
                <ArrowUp className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}