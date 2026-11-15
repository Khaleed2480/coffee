import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const metrics = [
    {
      label: 'Direct Trade Lots',
      value: '34 Farms',
      sub: 'Ethiopia, Honduras & Colombia',
    },
    {
      label: 'Roast Batch Size',
      value: '12 kg',
      sub: 'Cast-iron Probat drum precision',
    },
    {
      label: 'Peak Freshness',
      value: '24 Hours',
      sub: 'Roasted to order before dispatch',
    },
    {
      label: 'Minimum Cupping',
      value: '87.5+ SCA',
      sub: 'Scored weekly by Q-graders',
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-12 md:pt-16">
      {/* Main Hero Grid */}
      <div className="grid items-center gap-12 lg:grid-cols-12">
        {/* Left Copy Column */}
        <div className="lg:col-span-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7A736B]">
            Portland Roastery · Small-Batch Direct Trade
          </p>

          <h1 className="font-serif-editorial text-4xl font-semibold leading-[1.08] tracking-tight text-[#181615] sm:text-5xl lg:text-[54px]">
            Single-origin lots,
            <br />
            roasted for{' '}
            <span className="font-medium italic text-[#A34E26]">clarity</span>
            <br />
            and sweetness.
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-[#5C5650]">
            Every seasonal micro-lot is sourced directly from high-elevation
            washing stations, profiled on a cast-iron drum roaster, and
            dispatched within twenty-four hours of roast.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a
              href="#roasts"
              className="inline-flex items-center gap-2 rounded-lg bg-[#A34E26] px-5 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#8B411E]"
            >
              <span>Explore Current Roasts</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="#brew-guide"
              className="inline-flex items-center rounded-lg border border-[#DED8CE] bg-white px-5 py-3 text-sm font-medium text-[#181615] transition-colors hover:border-[#181615]/40 hover:bg-[#F5F2EC]"
            >
              Interactive Brew Guide
            </a>
          </div>
        </div>

        {/* Right Image Column */}
        <div className="lg:col-span-6">
          <div className="overflow-hidden rounded-2xl border border-[#E6E1D8] bg-[#F1EDE5] shadow-sm">
            <img
              src="/hero_coffee_pour.jpg"
              alt="Pour-over coffee brewing on sunlit concrete counter"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Bottom Metrics Strip */}
      <div className="mt-16 border-t border-[#E6E1D8] pt-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {metrics.map((item) => (
            <div key={item.label}>
              <p className="text-xs font-medium text-[#7A736B]">{item.label}</p>
              <p className="font-serif-editorial mt-1 text-2xl font-semibold text-[#181615]">
                {item.value}
              </p>
              <p className="mt-1 text-xs text-[#7A736B]">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}