import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SeasonalReleaseSection from './components/SeasonalReleaseSection';
import ThermalCraftSection from './components/ThermalCraftSection';
import BrewCalculatorSection from './components/BrewCalculatorSection';
import OriginsAndFooter from './components/OriginsAndFooter';
import BagDrawer from './components/BagDrawer';
import CheckoutModal from './components/CheckoutModal';

export default function App() {
  const [bagItems, setBagItems] = useState([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleAddToBag = (
    lot,
    grind = 'Whole Bean',
    weight = lot.weight,
    unitPrice = lot.price,
    quantity = 1
  ) => {
    setBagItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === lot.id && item.grind === grind && item.weight === weight
      );
      if (existing) {
        return prev.map((item) =>
          item.id === lot.id && item.grind === grind && item.weight === weight
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        { ...lot, grind, weight, price: unitPrice, quantity },
      ];
    });
    setIsBagOpen(true);
  };

  const handleUpdateQty = (id, grind, weight, delta) => {
    setBagItems((prev) =>
      prev
        .map((item) =>
          item.id === id && item.grind === grind && item.weight === weight
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id, grind, weight) => {
    setBagItems((prev) =>
      prev.filter(
        (item) =>
          !(item.id === id && item.grind === grind && item.weight === weight)
      )
    );
  };

  const handleProceedToCheckout = () => {
    setIsBagOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleBackToBag = () => {
    setIsCheckoutOpen(false);
    setIsBagOpen(true);
  };

  const totalCount = bagItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#181615]">
      <Navbar bagCount={totalCount} onOpenBag={() => setIsBagOpen(true)} />
      <main>
        <HeroSection />
        <SeasonalReleaseSection onAddToBag={handleAddToBag} />
        <ThermalCraftSection />
        <BrewCalculatorSection />
        <OriginsAndFooter />
      </main>
      <BagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        items={bagItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onBackToBag={handleBackToBag}
        items={bagItems}
        onClearBag={() => setBagItems([])}
      />
    </div>
  );
}