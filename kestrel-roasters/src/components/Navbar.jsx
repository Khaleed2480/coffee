import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function Navbar({ bagCount = 0, onOpenBag }) {
  const navLinks = [
    { label: 'Roasts', href: '#roasts' },
    { label: 'Craft', href: '#craft' },
    { label: 'Brew Guide', href: '#brew-guide' },
    { label: 'Origins', href: '#origins' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#E6E1D8]/80 bg-[#FBF9F5]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <a
          href="#"
          className="font-serif-editorial text-xl font-semibold tracking-tight text-[#181615]"
        >
          Kestrel Roasters
        </a>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#5C5650] transition-colors hover:text-[#181615]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Bag Button */}
        <button
          type="button"
          onClick={onOpenBag}
          className="flex items-center gap-2 rounded-lg bg-[#181615] px-4 py-2 text-xs font-medium text-[#FBF9F5] shadow-sm transition-colors hover:bg-[#2E2A28]"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          <span>Bag</span>
          <span className="font-mono text-[#D89C74]">({bagCount})</span>
        </button>
      </div>
    </header>
  );
}