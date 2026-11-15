import React, { useState } from 'react';

const ROAST_PROFILES = {
  nordic: {
    id: 'nordic',
    tabLabel: 'Nordic Filter',
    subtitle: 'High-heat momentum for crystalline floral clarity',
    firstCrackLabel: 'First Crack · 196°C',
    dropLabel: 'Drop · 206.5°C',
    fcPoint: { x: 392, y: 72 },
    dropPoint: { x: 505, y: 57 },
    beanCurve: 'M 55 198 C 165 182, 290 112, 392 72 Q 448 61, 505 57',
    rorCurve: 'M 55 82 Q 280 135, 505 188',
    stats: [
      { label: 'Charge Temp', value: '202°C' },
      { label: 'Development', value: '13.5%' },
      { label: 'Total Time', value: '09:45' },
    ],
  },
  omni: {
    id: 'omni',
    tabLabel: 'Balanced Omni',
    subtitle: 'Versatile sweetness bridging filter clarity and espresso body',
    firstCrackLabel: 'First Crack · 195°C',
    dropLabel: 'Drop · 210.5°C',
    fcPoint: { x: 375, y: 75 },
    dropPoint: { x: 505, y: 51 },
    beanCurve: 'M 55 198 C 160 176, 275 110, 375 75 Q 440 59, 505 51',
    rorCurve: 'M 55 92 Q 280 142, 505 192',
    stats: [
      { label: 'Charge Temp', value: '205°C' },
      { label: 'Development', value: '16.8%' },
      { label: 'Total Time', value: '10:30' },
    ],
  },
  espresso: {
    id: 'espresso',
    tabLabel: 'Classic Espresso',
    subtitle: 'Extended Maillard caramelization for syrupy crema & cacao depth',
    firstCrackLabel: 'First Crack · 194°C',
    dropLabel: 'Drop · 215.0°C',
    fcPoint: { x: 345, y: 76 },
    dropPoint: { x: 505, y: 44 },
    beanCurve: 'M 55 198 C 150 170, 250 106, 345 76 Q 425 54, 505 44',
    rorCurve: 'M 55 100 Q 270 150, 505 196',
    stats: [
      { label: 'Charge Temp', value: '208°C' },
      { label: 'Development', value: '20.4%' },
      { label: 'Total Time', value: '11:20' },
    ],
  },
};

const Y_TICKS = [
  { label: '215°', y: 45 },
  { label: '180°', y: 95 },
  { label: '145°', y: 145 },
  { label: '110°', y: 195 },
];

const X_TICKS = [
  { label: '00:00', x: 55 },
  { label: '03:30', x: 205 },
  { label: '07:00', x: 355 },
  { label: '10:30', x: 505 },
];

export default function ThermalCraftSection() {
  const [activeKey, setActiveKey] = useState('nordic');
  const profile = ROAST_PROFILES[activeKey];

  return (
    <section id="craft" className="bg-[#161412] py-20 text-[#FBF9F5]">
      <div className="mx-auto grid max-w-6xl items-stretch gap-10 px-6 lg:grid-cols-12">
        {/* Left Column: Heading, Tabs & Interactive Roast Curve */}
        <div className="flex flex-col justify-between lg:col-span-7">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9D958B]">
              02. Thermal Profiling & Craft
            </p>
            <h2 className="font-serif-editorial text-3xl font-semibold leading-[1.12] text-[#FBF9F5] sm:text-4xl">
              Precision heat curves
              <br />
              shaped for every origin.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#A8A198]">
              Every green lot responds differently to convective airflow and drum
              momentum. Explore how we modulate charge temperature and
              post-crack development across our three signature roast
              philosophies.
            </p>

            {/* Profile Selector Buttons */}
            <div className="mt-7 flex flex-wrap gap-2.5">
              {Object.values(ROAST_PROFILES).map((item) => {
                const isActive = item.id === activeKey;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveKey(item.id)}
                    className={`rounded-lg border px-4 py-2 text-xs font-medium transition-all ${
                      isActive
                        ? 'border-[#FBF9F5] bg-[#FBF9F5] text-[#161412]'
                        : 'border-[#2E2A25] bg-[#1C1916] text-[#A8A198] hover:border-[#4A433B] hover:text-[#FBF9F5]'
                    }`}
                  >
                    {item.tabLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chart Card */}
          <div className="mt-8 rounded-2xl border border-[#2B2722] bg-[#1C1916] p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-serif-editorial text-xl font-semibold text-[#FBF9F5]">
                  {profile.tabLabel}
                </h3>
                <p className="mt-0.5 text-xs text-[#9D958B]">
                  {profile.subtitle}
                </p>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-[11px] text-[#9D958B]">
                <span className="flex items-center gap-1.5">
                  <span className="h-0.5 w-3 bg-[#E08E55]" />
                  Bean Temp
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-0.5 w-3 bg-[#7D766D]" />
                  Rate of Rise
                </span>
              </div>
            </div>

            {/* SVG Temperature Chart */}
            <div className="mt-4">
              <svg
                viewBox="0 0 560 235"
                className="w-full overflow-visible"
                role="img"
                aria-label={`${profile.tabLabel} roast temperature curve`}
              >
                {/* Horizontal Gridlines & Y Labels */}
                {Y_TICKS.map((tick) => (
                  <g key={tick.label}>
                    <text
                      x="38"
                      y={tick.y + 4}
                      textAnchor="end"
                      className="fill-[#7D766D] font-mono text-[11px]"
                    >
                      {tick.label}
                    </text>
                    <line
                      x1="55"
                      y1={tick.y}
                      x2="520"
                      y2={tick.y}
                      stroke="#2B2722"
                      strokeWidth="1"
                    />
                  </g>
                ))}

                {/* X-Axis Labels */}
                {X_TICKS.map((tick) => (
                  <text
                    key={tick.label}
                    x={tick.x}
                    y="224"
                    textAnchor="middle"
                    className="fill-[#7D766D] font-mono text-[11px]"
                  >
                    {tick.label}
                  </text>
                ))}

                {/* Rate of Rise Line */}
                <path
                  d={profile.rorCurve}
                  fill="none"
                  stroke="#7D766D"
                  strokeWidth="1.75"
                  className="transition-all duration-500"
                />

                {/* Dashed Vertical Line at First Crack */}
                <line
                  x1={profile.fcPoint.x}
                  y1={profile.fcPoint.y}
                  x2={profile.fcPoint.x}
                  y2="200"
                  stroke="#5E564C"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />

                {/* Bean Temp Curve */}
                <path
                  d={profile.beanCurve}
                  fill="none"
                  stroke="#E08E55"
                  strokeWidth="2.75"
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />

                {/* First Crack Point & Label */}
                <circle
                  cx={profile.fcPoint.x}
                  cy={profile.fcPoint.y}
                  r="5"
                  fill="#1C1916"
                  stroke="#E08E55"
                  strokeWidth="2.2"
                />
                <text
                  x={profile.fcPoint.x - 10}
                  y={profile.fcPoint.y - 14}
                  textAnchor="end"
                  className="fill-[#FBF9F5] font-mono text-[11px]"
                >
                  {profile.firstCrackLabel}
                </text>

                {/* Drop Point & Label */}
                <circle
                  cx={profile.dropPoint.x}
                  cy={profile.dropPoint.y}
                  r="5"
                  fill="#E08E55"
                />
                <text
                  x={profile.dropPoint.x - 6}
                  y={profile.dropPoint.y - 14}
                  textAnchor="end"
                  className="fill-[#E08E55] font-mono text-[11px]"
                >
                  {profile.dropLabel}
                </text>
              </svg>
            </div>

            {/* Extra Roaster Metrics Strip */}
            <div className="mt-4 grid grid-cols-3 gap-4 border-t border-[#2B2722] pt-4">
              {profile.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-[11px] text-[#7D766D]">{stat.label}</p>
                  <p className="font-mono mt-0.5 text-sm font-semibold text-[#FBF9F5]">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Roastery Photo Card */}
        <div className="lg:col-span-5">
          <div className="relative h-full min-h-[420px] overflow-hidden rounded-2xl border border-[#2B2722] bg-[#1C1916]">
            <img
              src="/craft_roastery_drum.jpg"
              alt="Coffee roaster monitoring cast-iron Probat drum"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161412] via-[#161412]/30 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-7">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[#E08E55]">
                Probat UG-15 · Cast-Iron Drum
              </p>
              <h3 className="font-serif-editorial mt-2 text-2xl font-semibold leading-snug text-[#FBF9F5]">
                Cooled within three minutes to lock in volatile aromatics.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}