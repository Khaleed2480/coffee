import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Minus, Plus } from 'lucide-react';

const BREW_METHODS = {
  v60: {
    id: 'v60',
    label: 'V60 Pour-Over',
    description:
      'Conical percolation designed to highlight floral aromatics and crisp acidity.',
    defaultDose: 18,
    ratio: 16,
    temp: '94°C',
    totalTime: '02:55',
    grind: '620 µm · Medium-Fine',
    steps: [
      {
        num: '01. Bloom & Degas',
        time: '0:00 - 0:40',
        desc: 'Saturate dry grounds evenly with gentle concentric spirals and swirl once.',
        fraction: 0.19,
      },
      {
        num: '02. First Core Pour',
        time: '0:40 - 1:25',
        desc: 'Pour steadily at 5g/sec into the center dime-sized zone to maintain thermal mass.',
        fraction: 0.6,
      },
      {
        num: '03. Pulse Agitation',
        time: '1:25 - 2:05',
        desc: 'Finish remaining water in a smooth outer-to-center spiral to rinse filter walls.',
        fraction: 1.0,
      },
      {
        num: '04. Final Drawdown',
        time: '2:05 - 2:55',
        desc: 'Allow the slurry to drain cleanly onto a flat coffee bed before serving.',
        fraction: 1.0,
      },
    ],
  },
  chemex: {
    id: 'chemex',
    label: 'Chemex Carafe',
    description:
      'Thick bonded paper filters produce a remarkably tea-like, sediment-free cup.',
    defaultDose: 30,
    ratio: 16.5,
    temp: '95°C',
    totalTime: '04:15',
    grind: '780 µm · Medium-Coarse',
    steps: [
      {
        num: '01. Heavy Bloom',
        time: '0:00 - 0:45',
        desc: 'Wet all grounds thoroughly with 2x coffee weight and gently stir crust.',
        fraction: 0.15,
      },
      {
        num: '02. Primary Spiral',
        time: '0:45 - 2:00',
        desc: 'Maintain slurry height halfway up the cone using slow, steady circles.',
        fraction: 0.62,
      },
      {
        num: '03. High-Water Finish',
        time: '2:00 - 3:00',
        desc: 'Top off remaining water steadily without pouring directly onto paper walls.',
        fraction: 1.0,
      },
      {
        num: '04. Drawdown & Swirl',
        time: '3:00 - 4:15',
        desc: 'Discard filter once dripping slows and swirl carafe to aerate aromatics.',
        fraction: 1.0,
      },
    ],
  },
  aeropress: {
    id: 'aeropress',
    label: 'AeroPress',
    description:
      'Gentle immersion paired with air pressure for juicy sweetness and round body.',
    defaultDose: 15,
    ratio: 15,
    temp: '92°C',
    totalTime: '02:15',
    grind: '540 µm · Medium-Fine',
    steps: [
      {
        num: '01. Immersion Pour',
        time: '0:00 - 0:20',
        desc: 'Add all brew water swiftly over grounds to ensure uniform saturation.',
        fraction: 1.0,
      },
      {
        num: '02. Gentle Paddle Stir',
        time: '0:20 - 0:35',
        desc: 'Stir back-and-forth three times, then insert plunger slightly to create vacuum.',
        fraction: 1.0,
      },
      {
        num: '03. Steep & Settle',
        time: '0:35 - 1:45',
        desc: 'Allow grounds to steep undisturbed while aromatic oils extract cleanly.',
        fraction: 1.0,
      },
      {
        num: '04. Slow Plunge',
        time: '1:45 - 2:15',
        desc: 'Press down smoothly with steady palm weight over 30 seconds; stop at hiss.',
        fraction: 1.0,
      },
    ],
  },
  espresso: {
    id: 'espresso',
    label: 'Espresso',
    description:
      'High-pressure 9-bar extraction calibrated for syrupy texture and lingering sweetness.',
    defaultDose: 18,
    ratio: 2.2,
    temp: '93°C',
    totalTime: '00:29',
    grind: '240 µm · Fine Espresso',
    steps: [
      {
        num: '01. WDT & Tamp',
        time: 'Prep',
        desc: 'Distribute grounds evenly to break clumps and tamp level with 15kg pressure.',
        fraction: 0.0,
      },
      {
        num: '02. Pre-Infusion',
        time: '0:00 - 0:07',
        desc: 'Low-pressure saturation until the first dark honey drops form at bottomless basket.',
        fraction: 0.15,
      },
      {
        num: '03. Peak Extraction',
        time: '0:07 - 0:22',
        desc: 'Steady 9-bar pull as streams coalesce into a tiger-striped central cone.',
        fraction: 0.72,
      },
      {
        num: '04. Blonding Cut',
        time: '0:22 - 0:29',
        desc: 'Cut shot cleanly as crema lightens to preserve balanced cacao sweetness.',
        fraction: 1.0,
      },
    ],
  },
};

export default function BrewCalculatorSection() {
  const [methodKey, setMethodKey] = useState('v60');
  const method = BREW_METHODS[methodKey];

  const [dose, setDose] = useState(method.defaultDose);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const totalWater = Math.round(dose * method.ratio);
  const currentStep = method.steps[activeStepIdx];
  const targetWeight = Math.round(totalWater * currentStep.fraction);
  const fillPercent = totalWater > 0 ? Math.min((targetWeight / totalWater) * 100, 100) : 0;

  const handleMethodChange = (key) => {
    setMethodKey(key);
    setDose(BREW_METHODS[key].defaultDose);
    setActiveStepIdx(0);
    setIsSimulating(false);
  };

  useEffect(() => {
    if (!isSimulating) return;
    const timer = setInterval(() => {
      setActiveStepIdx((prev) => {
        if (prev >= method.steps.length - 1) {
          setIsSimulating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1600);
    return () => clearInterval(timer);
  }, [isSimulating, method.steps.length]);

  const handleToggleSimulate = () => {
    if (!isSimulating && activeStepIdx === method.steps.length - 1) {
      setActiveStepIdx(0);
    }
    setIsSimulating((prev) => !prev);
  };

  const handleReset = () => {
    setIsSimulating(false);
    setActiveStepIdx(0);
    setDose(method.defaultDose);
  };

  // Liquid height inside SVG carafe (y goes from 166 bottom to 96 top -> max 70px)
  const liquidHeight = (fillPercent / 100) * 66;

  return (
    <section id="brew-guide" className="mx-auto max-w-6xl px-6 py-20">
      {/* Header Row */}
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7A736B]">
            03. Extraction Calculator
          </p>
          <h2 className="font-serif-editorial text-3xl font-semibold leading-tight text-[#181615] sm:text-4xl">
            Dial in your morning
            <br />
            pour with exact ratios.
          </h2>
        </div>

        {/* Method Tabs */}
        <div className="inline-flex flex-wrap rounded-lg border border-[#E6E1D8] bg-[#F1EDE5] p-1">
          {Object.values(BREW_METHODS).map((item) => {
            const isActive = item.id === methodKey;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleMethodChange(item.id)}
                className={`rounded-md px-3.5 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-white text-[#181615] shadow-sm'
                    : 'text-[#6E675F] hover:text-[#181615]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Calculator Panel */}
      <div className="mt-10 grid gap-8 rounded-2xl border border-[#E6E1D8] bg-[#F3EFE8]/70 p-6 lg:grid-cols-12 lg:p-8">
        {/* Left Brewer Visual + Scale Weight Card */}
        <div className="flex flex-col justify-between rounded-xl border border-[#E6E1D8] bg-white p-6 lg:col-span-5">
          <div className="flex flex-1 items-center justify-center py-8">
            <svg
              viewBox="0 0 180 190"
              className="h-52 w-48"
              role="img"
              aria-label="Pour-over brewer scale simulation"
            >
              <defs>
                <clipPath id="carafe-clip">
                  <path d="M 62 88 L 118 88 L 136 156 Q 138 166 126 166 L 54 166 Q 42 166 44 156 Z" />
                </clipPath>
              </defs>

              {/* V60 Dripper Cone */}
              <polygon
                points="50,32 130,32 103,72 77,72"
                fill="none"
                stroke="#181615"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
              <line
                x1="54"
                y1="27"
                x2="126"
                y2="27"
                stroke="#181615"
                strokeWidth="2.4"
                strokeLinecap="round"
              />

              {/* Falling Coffee Drop */}
              <circle
                cx="90"
                cy="81"
                r="2.6"
                fill="#A34E26"
                className={isSimulating ? 'animate-bounce' : ''}
              />

              {/* Liquid Inside Carafe */}
              <g clipPath="url(#carafe-clip)">
                <rect
                  x="38"
                  y={166 - liquidHeight}
                  width="104"
                  height={liquidHeight + 4}
                  fill="#8C5230"
                  className="transition-all duration-500 ease-out"
                />
              </g>

              {/* Carafe Glass Outline */}
              <path
                d="M 62 88 L 118 88 L 136 156 Q 138 166 126 166 L 54 166 Q 42 166 44 156 Z"
                fill="none"
                stroke="#181615"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />

              {/* Carafe Handle */}
              <path
                d="M 122 100 Q 144 100 144 126 Q 144 148 134 152"
                fill="none"
                stroke="#181615"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Bottom Scale Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#EBE7DF] pt-5">
            <div>
              <p className="text-[11px] font-medium text-[#7A736B]">
                Target Scale Weight
              </p>
              <p className="font-mono mt-0.5 text-lg font-semibold text-[#181615]">
                {targetWeight}g{' '}
                <span className="font-normal text-[#7A736B]">
                  / {totalWater}g
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleSimulate}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#A34E26] px-4 py-2.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-[#8B411E]"
              >
                {isSimulating ? (
                  <>
                    <Pause className="h-3.5 w-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5" />
                    <span>Simulate</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                title="Reset calculator"
                className="inline-flex items-center justify-center rounded-lg border border-[#DED8CE] bg-[#FBF9F5] p-2.5 text-[#181615] transition-colors hover:bg-[#F1EDE5]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Controls & Steps */}
        <div className="flex flex-col justify-between lg:col-span-7">
          <div>
            <p className="text-sm text-[#5C5650]">{method.description}</p>

            {/* Dose / Total Water / Temp Card */}
            <div className="mt-4 grid gap-6 rounded-xl border border-[#E6E1D8] bg-white p-5 sm:grid-cols-3">
              {/* Coffee Dose */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7A736B]">
                  Coffee Dose
                </p>
                <div className="mt-2 flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setDose((d) => Math.max(10, d - 1))}
                    className="rounded-md border border-[#DED8CE] p-1.5 text-[#181615] hover:bg-[#F1EDE5]"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="font-mono w-10 text-center text-base font-semibold text-[#181615]">
                    {dose}g
                  </span>
                  <button
                    type="button"
                    onClick={() => setDose((d) => Math.min(45, d + 1))}
                    className="rounded-md border border-[#DED8CE] p-1.5 text-[#181615] hover:bg-[#F1EDE5]"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <input
                  type="range"
                  min={10}
                  max={45}
                  value={dose}
                  onChange={(e) => setDose(Number(e.target.value))}
                  className="mt-3 h-1.5 w-full cursor-pointer accent-[#A34E26]"
                />
              </div>

              {/* Total Water */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7A736B]">
                  Total Water
                </p>
                <p className="font-mono mt-1.5 text-2xl font-semibold text-[#A34E26]">
                  {totalWater}g
                </p>
                <p className="font-mono mt-1 text-xs text-[#7A736B]">
                  1 : {method.ratio} ratio
                </p>
              </div>

              {/* Water & Grind */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7A736B]">
                  Water & Grind
                </p>
                <p className="font-mono mt-1.5 text-sm font-semibold text-[#181615]">
                  {method.temp} · {method.totalTime}
                </p>
                <p className="mt-1.5 text-xs text-[#7A736B]">{method.grind}</p>
              </div>
            </div>
          </div>

          {/* 4 Step Cards Grid */}
          <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
            {method.steps.map((step, idx) => {
              const isSelected = idx === activeStepIdx;
              const cumulative = Math.round(totalWater * step.fraction);
              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => {
                    setIsSimulating(false);
                    setActiveStepIdx(idx);
                  }}
                  className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                    isSelected
                      ? 'border-[#A34E26] bg-white shadow-sm'
                      : 'border-[#E6E1D8] bg-white/80 hover:border-[#A34E26]/50 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-semibold text-[#A34E26]">
                        {step.num}
                      </span>
                      <span className="font-mono text-[11px] text-[#7A736B]">
                        {step.time}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-[#5C5650]">
                      {step.desc}
                    </p>
                  </div>
                  <p className="font-mono mt-3 text-xs font-semibold text-[#181615]">
                    Cumulative: {cumulative}g
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}