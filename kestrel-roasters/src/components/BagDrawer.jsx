import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

const FREE_SHIPPING_THRESHOLD = 50;

export default function BagDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout,
}) {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const amountRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex justify-end bg-[#181615]/50 backdrop-blur-xs"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-md flex-col bg-[#FBF9F5] shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E6E1D8] px-6 py-5">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-4 w-4 text-[#181615]" />
            <h2 className="font-serif-editorial text-xl font-semibold text-[#181615]">
              Your Roast Bag
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#7A736B] transition-colors hover:bg-[#F1EDE5] hover:text-[#181615]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free Shipping Progress Strip */}
        {items.length > 0 && (
          <div className="border-b border-[#E6E1D8] bg-[#F4F1EA] px-6 py-3">
            <p className="text-[11px] font-medium text-[#5C5650]">
              {amountRemaining === 0 ? (
                <span className="text-[#A34E26]">
                  You’ve unlocked complimentary 24-hour Priority Dispatch.
                </span>
              ) : (
                <>
                  Add{' '}
                  <span className="font-mono font-semibold text-[#181615]">
                    ${amountRemaining.toFixed(2)}
                  </span>{' '}
                  more for complimentary Priority Dispatch.
                </>
              )}
            </p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#E6E1D8]">
              <div
                style={{ width: `${shippingProgress}%` }}
                className="h-full rounded-full bg-[#A34E26] transition-all duration-300"
              />
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#E6E1D8] bg-white">
                <ShoppingBag className="h-5 w-5 text-[#7A736B]" />
              </div>
              <p className="font-serif-editorial text-lg font-medium text-[#181615]">
                Your bag is empty
              </p>
              <p className="mt-1 max-w-xs text-xs leading-relaxed text-[#7A736B]">
                Select a seasonal lot or reserve release—every bag is roasted
                to order and dispatched within 24 hours.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.grind}-${item.weight}`}
                  className="flex gap-4 rounded-xl border border-[#E6E1D8] bg-white p-3.5 shadow-2xs"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 w-20 shrink-0 rounded-lg bg-[#F1EDE5] object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-serif-editorial text-base font-semibold text-[#181615]">
                          {item.title}
                        </h3>
                        <p className="mt-0.5 text-[11px] text-[#7A736B]">
                          {item.grind} · {item.weight}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          onRemoveItem(item.id, item.grind, item.weight)
                        }
                        title="Remove item"
                        className="rounded p-1 text-[#7A736B] transition-colors hover:bg-[#FBF4EF] hover:text-[#A34E26]"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-md border border-[#DED8CE] bg-[#FBF9F5]">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQty(item.id, item.grind, item.weight, -1)
                          }
                          className="p-1.5 text-[#181615] transition-colors hover:bg-[#F1EDE5]"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center font-mono text-xs font-medium">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQty(item.id, item.grind, item.weight, 1)
                          }
                          className="p-1.5 text-[#181615] transition-colors hover:bg-[#F1EDE5]"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <span className="font-mono text-sm font-semibold text-[#181615]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Subtotal */}
        {items.length > 0 && (
          <div className="border-t border-[#E6E1D8] bg-white px-6 py-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#5C5650]">Roasted-to-order Subtotal</span>
              <span className="font-mono text-lg font-semibold text-[#181615]">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-[#7A736B]">
              Dispatched within 24 hours of cast-iron drum roasting.
            </p>

            <button
              type="button"
              onClick={onProceedToCheckout}
              className="mt-4 w-full rounded-lg bg-[#A34E26] py-3 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#8B411E]"
            >
              Proceed to Checkout · ${subtotal.toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}