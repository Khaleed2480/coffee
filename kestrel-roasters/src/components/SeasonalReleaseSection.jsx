import React, { useState } from 'react';
import { Search, ArrowUpRight, Plus, Minus, X } from 'lucide-react';

const FILTER_TABS = ['All Lots', 'Filter Roast', 'Espresso', 'Reserve'];

const FEATURED_LOT = {
  id: 'ethiopia-gedeb',
  category: 'Reserve',
  badgeLeft: 'SINGLE ORIGIN RESERVE · LIGHT NORDIC',
  badgeRight: 'Limited Run',
  title: 'The Ethiopia Gedeb',
  originMeta: 'Gedeb, Yirgacheffe · 2,150 MASL · Washed Process',
  region: 'Gedeb, Yirgacheffe',
  elevation: '2,150 MASL',
  process: 'Washed Spring',
  varietal: 'Ethiopian Heirloom',
  description:
    'Grown at high altitude in the Gedeo Zone and washed in mountain spring channels for 48 hours. Roasted on a delicate Nordic curve to preserve crystalline jasmine aromatics and silky stone-fruit sweetness.',
  cuppingNotes: ['White Peach', 'Bergamot Blossom', 'Oolong Honey'],
  sensory: { floral: 9.2, acidity: 8.8, sweetness: 8.5, body: 6.4, clarity: 9.5 },
  price: 28,
  weight: '250g Tin',
  image: '/product_geisha_reserve.jpg',
};

const CATALOG_LOTS = [
  {
    id: 'honduras-marcala',
    category: 'Filter Roast',
    badgeLeft: 'SINGLE ORIGIN FILTER · LIGHT ROAST',
    badgeRight: 'IN STOCK',
    title: 'Honduras Marcala',
    originMeta: 'Honduras · Light Roast · 350g',
    region: 'La Paz, Marcala',
    elevation: '1,650 MASL',
    process: 'Solar Washed',
    varietal: 'Catuai & Lempira',
    cuppingNotes: ['Golden Pear', 'Toasted Almond', 'Cane Sugar'],
    sensory: { floral: 6.5, acidity: 7.4, sweetness: 8.6, body: 7.2, clarity: 8.3 },
    description:
      'Grown on shaded terraces at 1,650m in La Paz. Clean honey-sweet acidity with a silky almond praline finish tailored for V60 and Chemex.',
    price: 19,
    weight: '350g',
    image: '/product_ethiopia_filter.jpg',
  },
  {
    id: 'nocturne-blend',
    category: 'Espresso',
    badgeLeft: 'SIGNATURE BLEND · MEDIUM ROAST',
    badgeRight: 'ROASTER FAVORITE',
    title: 'Nocturne Blend',
    originMeta: 'Ethiopia & Colombia · Medium Roast · 250g',
    region: 'Guji & Huila',
    elevation: '1,850 MASL',
    process: 'Washed & Natural',
    varietal: 'Caturra & Heirloom',
    cuppingNotes: ['Dark Cacao', 'Black Cherry', 'Roasted Hazelnut'],
    sensory: { floral: 5.5, acidity: 5.8, sweetness: 8.8, body: 9.1, clarity: 7.4 },
    description:
      'Engineered for syrupy extraction and effortless sweetness under 9 bars of pressure. Pairs Huila caramel structure with Guji fruit lift so it shines both as straight ristretto and velvety flat whites.',
    price: 21,
    weight: '250g',
    image: '/product_colombia_washed.jpg',
  },
  {
    id: 'ethiopia-guji',
    category: 'Espresso',
    badgeLeft: 'SINGLE ORIGIN ESPRESSO · MEDIUM-LIGHT',
    badgeRight: 'SMALL BATCH',
    title: 'Ethiopia Guji',
    originMeta: 'Ethiopia · Medium-Light · 250g',
    region: 'Hambela, Guji',
    elevation: '2,100 MASL',
    process: 'Anaerobic Natural',
    varietal: '74110 & 74112',
    cuppingNotes: ['Blood Orange', 'Cacao Nib', 'Wild Berry'],
    sensory: { floral: 7.8, acidity: 8.2, sweetness: 8.9, body: 7.9, clarity: 8.0 },
    description:
      'Anaerobic natural lot from Hambela Wamena. Vibrant citrus aromatics layered over dark chocolate richness for modern single-origin espresso.',
    price: 24,
    weight: '250g',
    image: '/product_espresso_blend.jpg',
  },
];

const WEIGHT_OPTIONS = [
  { label: '250g', multiplier: 1 },
  { label: '500g', multiplier: 1.85 },
  { label: '1kg', multiplier: 3.4 },
];

const GRIND_OPTIONS = ['Whole Bean', 'Pour-Over', 'Espresso', 'French Press'];

const SENSORY_AXES = [
  { key: 'floral', label: 'Floral', anchor: 'middle', dx: 0, dy: -12 },
  { key: 'acidity', label: 'Acidity', anchor: 'start', dx: 10, dy: 2 },
  { key: 'sweetness', label: 'Sweetness', anchor: 'start', dx: 6, dy: 14 },
  { key: 'body', label: 'Body', anchor: 'end', dx: -6, dy: 14 },
  { key: 'clarity', label: 'Clarity', anchor: 'end', dx: -10, dy: 2 },
];

function SensoryRadarChart({ sensory }) {
  const cx = 115;
  const cy = 105;
  const radius = 60;

  const getPoint = (index, ratio) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / 5;
    return {
      x: cx + Math.cos(angle) * radius * ratio,
      y: cy + Math.sin(angle) * radius * ratio,
    };
  };

  const ringLevels = [0.25, 0.5, 0.75, 1];
  const dataPoints = SENSORY_AXES.map((axis, i) =>
    getPoint(i, (sensory[axis.key] || 7) / 10)
  )
    .map((p) => `${p.x},${p.y}`)
    .join(' ');

  return (
    <svg viewBox="0 0 230 205" className="mx-auto w-full max-w-[240px]">
      {/* Concentric Pentagon Rings */}
      {ringLevels.map((lvl) => {
        const pts = SENSORY_AXES.map((_, i) => getPoint(i, lvl))
          .map((p) => `${p.x},${p.y}`)
          .join(' ');
        return (
          <polygon
            key={lvl}
            points={pts}
            fill="none"
            stroke="#DFD9CF"
            strokeWidth="1"
          />
        );
      })}

      {/* Axis Spokes */}
      {SENSORY_AXES.map((axis, i) => {
        const outer = getPoint(i, 1);
        return (
          <line
            key={axis.key}
            x1={cx}
            y1={cy}
            x2={outer.x}
            y2={outer.y}
            stroke="#DFD9CF"
            strokeWidth="1"
          />
        );
      })}

      {/* Filled Sensory Polygon */}
      <polygon
        points={dataPoints}
        fill="#A34E26"
        fillOpacity="0.2"
        stroke="#A34E26"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Axis Labels */}
      {SENSORY_AXES.map((axis, i) => {
        const outer = getPoint(i, 1);
        return (
          <text
            key={axis.key}
            x={outer.x + axis.dx}
            y={outer.y + axis.dy}
            textAnchor={axis.anchor}
            className="fill-[#5C5650] text-[10px] font-medium"
          >
            {axis.label}
          </text>
        );
      })}
    </svg>
  );
}

export default function SeasonalReleaseSection({ onAddToBag }) {
  const [activeFilter, setActiveFilter] = useState('All Lots');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLot, setSelectedLot] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(WEIGHT_OPTIONS[0]);
  const [selectedGrind, setSelectedGrind] = useState('Espresso');
  const [modalQty, setModalQty] = useState(1);

  const matchesCriteria = (lot) => {
    const matchesTab =
      activeFilter === 'All Lots' || lot.category === activeFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      lot.title.toLowerCase().includes(query) ||
      lot.originMeta.toLowerCase().includes(query) ||
      lot.cuppingNotes.some((note) => note.toLowerCase().includes(query));

    return matchesTab && matchesSearch;
  };

  const showFeatured = matchesCriteria(FEATURED_LOT);
  const filteredCatalog = CATALOG_LOTS.filter(matchesCriteria);

  const openModal = (lot) => {
    setSelectedLot(lot);
    setSelectedWeight(WEIGHT_OPTIONS[0]);
    setSelectedGrind(lot.category === 'Espresso' ? 'Espresso' : 'Whole Bean');
    setModalQty(1);
  };

  const modalUnitPrice = selectedLot
    ? Math.round(selectedLot.price * selectedWeight.multiplier)
    : 0;
  const modalTotalPrice = modalUnitPrice * modalQty;

  return (
    <section id="roasts" className="mx-auto max-w-6xl px-6 py-16">
      {/* Section Header + Search & Filter Controls */}
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7A736B]">
            01. Seasonal Release
          </p>
          <h2 className="font-serif-editorial text-3xl font-semibold leading-tight text-[#181615] sm:text-4xl">
            Small-batch coffees
            <br />
            roasted to highlight terroir.
          </h2>
        </div>

        {/* Search & Tabs */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A736B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search origin or note.."
              className="w-full rounded-lg border border-[#E6E1D8] bg-[#F1EDE5]/70 py-2 pl-9 pr-4 text-xs text-[#181615] placeholder-[#7A736B] focus:border-[#181615]/40 focus:bg-white focus:outline-none sm:w-52"
            />
          </div>

          <div className="inline-flex rounded-lg border border-[#E6E1D8] bg-[#F1EDE5] p-1">
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveFilter(tab)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-white text-[#181615] shadow-sm'
                      : 'text-[#6E675F] hover:text-[#181615]'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured Lot Horizontal Card */}
      {showFeatured && (
        <article className="mt-10 grid overflow-hidden rounded-2xl border border-[#E6E1D8] bg-white shadow-sm lg:grid-cols-12">
          <div className="bg-[#F1EDE5] lg:col-span-6">
            <img
              src={FEATURED_LOT.image}
              alt={FEATURED_LOT.title}
              className="h-full min-h-[280px] w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-between p-7 sm:p-10 lg:col-span-6">
            <div>
              <div className="flex items-center justify-between text-[11px] font-semibold tracking-[0.14em]">
                <span className="uppercase text-[#7A736B]">
                  SINGLE ORIGIN RESERVE
                </span>
                <span className="text-[#A34E26]">{FEATURED_LOT.badgeRight}</span>
              </div>

              <h3 className="font-serif-editorial mt-3 text-3xl font-semibold text-[#181615]">
                {FEATURED_LOT.title}
              </h3>
              <p className="mt-1.5 text-xs text-[#7A736B]">
                {FEATURED_LOT.originMeta}
              </p>

              <p className="mt-5 text-sm leading-relaxed text-[#5C5650]">
                {FEATURED_LOT.description}
              </p>
            </div>

            <div className="mt-8 border-t border-[#EBE7DF] pt-5">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                <span className="text-[#7A736B]">Cupping Notes:</span>
                {FEATURED_LOT.cuppingNotes.map((note, idx) => (
                  <React.Fragment key={note}>
                    <span className="font-medium text-[#181615]">{note}</span>
                    {idx < FEATURED_LOT.cuppingNotes.length - 1 && (
                      <span className="text-[#7A736B]">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono text-xl font-semibold text-[#181615]">
                    ${FEATURED_LOT.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-[#7A736B]">
                    / {FEATURED_LOT.weight}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => openModal(FEATURED_LOT)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#DED8CE] bg-[#FBF9F5] px-4 py-2.5 text-xs font-medium text-[#181615] transition-colors hover:border-[#181615]/40 hover:bg-[#F1EDE5]"
                  >
                    <span>Inspect Lot</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onAddToBag(
                        FEATURED_LOT,
                        'Whole Bean',
                        FEATURED_LOT.weight,
                        FEATURED_LOT.price,
                        1
                      )
                    }
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#A34E26] px-4 py-2.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-[#8B411E]"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* 3-Column Coffee Grid */}
      {filteredCatalog.length > 0 ? (
        <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filteredCatalog.map((lot) => (
            <article
              key={lot.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#E6E1D8] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="overflow-hidden bg-[#F1EDE5]">
                <img
                  src={lot.image}
                  alt={lot.title}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.14em]">
                    <span className="text-[#7A736B]">
                      {lot.badgeLeft.split('·')[0].trim()}
                    </span>
                    <span className="text-[#A34E26]">{lot.badgeRight}</span>
                  </div>

                  <div className="mt-2.5 flex items-baseline justify-between gap-2">
                    <h3 className="font-serif-editorial text-xl font-semibold text-[#181615] transition-colors group-hover:text-[#A34E26]">
                      {lot.title}
                    </h3>
                    <span className="font-mono text-sm font-semibold text-[#181615]">
                      ${lot.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-[#7A736B]">{lot.originMeta}</p>

                  <p className="mt-3 text-xs font-medium text-[#5C5650]">
                    {lot.cuppingNotes.join(' · ')}
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => openModal(lot)}
                    className="rounded-lg border border-[#DED8CE] bg-[#FBF9F5] px-3 py-2.5 text-xs font-medium text-[#181615] transition-colors hover:border-[#181615]/40 hover:bg-[#F1EDE5]"
                  >
                    Details & Grind
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onAddToBag(lot, 'Whole Bean', lot.weight, lot.price, 1)
                    }
                    className="inline-flex items-center justify-center gap-1 rounded-lg bg-[#A34E26] px-3 py-2.5 text-xs font-medium text-white transition-colors hover:bg-[#8B411E]"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Quick Add</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        !showFeatured && (
          <div className="mt-10 rounded-2xl border border-[#E6E1D8] bg-white p-12 text-center text-sm text-[#7A736B]">
            No seasonal lots match your current filter.
          </div>
        )
      )}

      {/* Detailed Split Modal with Radar Chart */}
      {selectedLot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#181615]/55 p-4 backdrop-blur-xs">
          <div className="relative grid max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-[#E6E1D8] bg-white shadow-2xl md:grid-cols-12">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedLot(null)}
              className="absolute right-4 top-4 z-10 rounded-lg border border-[#E6E1D8] bg-white p-1.5 text-[#5C5650] hover:bg-[#F1EDE5] hover:text-[#181615]"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Left Column: Image + Sensory Cupping Profile */}
            <div className="flex flex-col justify-between bg-[#F4F1EA] p-6 sm:p-8 md:col-span-5">
              <div className="overflow-hidden rounded-xl border border-[#E6E1D8]">
                <img
                  src={selectedLot.image}
                  alt={selectedLot.title}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

              <div className="mt-8">
                <p className="text-xs font-semibold text-[#A34E26]">
                  Sensory Cupping Profile
                </p>
                <div className="mt-2">
                  <SensoryRadarChart sensory={selectedLot.sensory} />
                </div>
              </div>
            </div>

            {/* Right Column: Specs, Bag Weight, Grind & Add to Bag */}
            <div className="flex flex-col justify-between p-6 sm:p-8 md:col-span-7">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#A34E26]">
                  {selectedLot.badgeLeft}
                </p>

                <div className="mt-1.5 flex items-baseline justify-between gap-4 pr-8">
                  <h3 className="font-serif-editorial text-3xl font-semibold text-[#181615]">
                    {selectedLot.title}
                  </h3>
                  <span className="font-mono text-2xl font-semibold text-[#181615]">
                    ${modalUnitPrice.toFixed(2)}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[#5C5650]">
                  {selectedLot.description}
                </p>

                {/* 2x2 Origin Specs Grid */}
                <div className="mt-6 grid grid-cols-2 gap-y-4 border-y border-[#EBE7DF] py-5 text-xs">
                  <div>
                    <p className="text-[#7A736B]">Region</p>
                    <p className="mt-0.5 font-medium text-[#181615]">
                      {selectedLot.region}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#7A736B]">Elevation</p>
                    <p className="font-mono mt-0.5 font-medium text-[#181615]">
                      {selectedLot.elevation}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#7A736B]">Process</p>
                    <p className="mt-0.5 font-medium text-[#181615]">
                      {selectedLot.process}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#7A736B]">Varietal</p>
                    <p className="mt-0.5 font-medium text-[#181615]">
                      {selectedLot.varietal}
                    </p>
                  </div>
                </div>

                {/* Bag Weight */}
                <div className="mt-5">
                  <p className="mb-2 text-xs font-medium text-[#181615]">
                    Bag Weight
                  </p>
                  <div className="grid grid-cols-3 gap-2.5">
                    {WEIGHT_OPTIONS.map((w) => {
                      const active = selectedWeight.label === w.label;
                      return (
                        <button
                          key={w.label}
                          type="button"
                          onClick={() => setSelectedWeight(w)}
                          className={`rounded-lg border py-2.5 text-xs font-medium transition-all ${
                            active
                              ? 'border-[#181615] bg-[#181615] text-white'
                              : 'border-[#DED8CE] bg-white text-[#181615] hover:bg-[#F5F2EC]'
                          }`}
                        >
                          {w.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Grind Preparation */}
                <div className="mt-5">
                  <p className="mb-2 text-xs font-medium text-[#181615]">
                    Grind Preparation
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {GRIND_OPTIONS.map((grind) => {
                      const active = selectedGrind === grind;
                      return (
                        <button
                          key={grind}
                          type="button"
                          onClick={() => setSelectedGrind(grind)}
                          className={`rounded-lg border py-2 text-xs font-medium transition-all ${
                            active
                              ? 'border-[#A34E26] bg-[#FBF4EF] text-[#A34E26]'
                              : 'border-[#DED8CE] bg-white text-[#5C5650] hover:bg-[#F5F2EC]'
                          }`}
                        >
                          {grind}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Quantity & Add to Bag Row */}
              <div className="mt-7 flex items-center gap-3 border-t border-[#EBE7DF] pt-5">
                <div className="inline-flex items-center rounded-lg border border-[#DED8CE] bg-white">
                  <button
                    type="button"
                    onClick={() => setModalQty((q) => Math.max(1, q - 1))}
                    className="p-3 text-[#181615] hover:bg-[#F5F2EC]"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center font-mono text-xs font-semibold">
                    {modalQty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setModalQty((q) => q + 1)}
                    className="p-3 text-[#181615] hover:bg-[#F5F2EC]"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onAddToBag(
                      selectedLot,
                      selectedGrind,
                      selectedWeight.label,
                      modalUnitPrice,
                      modalQty
                    );
                    setSelectedLot(null);
                  }}
                  className="flex-1 rounded-lg bg-[#A34E26] py-3 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#8B411E]"
                >
                  Add to Bag · ${modalTotalPrice.toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}