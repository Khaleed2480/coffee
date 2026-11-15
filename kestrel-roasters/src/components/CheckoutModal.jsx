import React, { useState } from 'react';
import {
  X,
  CreditCard,
  Building2,
  Lock,
  Copy,
  Check,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';

const FREE_SHIPPING_THRESHOLD = 50;
const FLAT_SHIPPING = 6;

export default function CheckoutModal({
  isOpen,
  onClose,
  onBackToBag,
  items,
  onClearBag,
}) {
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'transfer'
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState(null);

  // Customer & Card Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const grandTotal = subtotal + shippingFee;

  const handleCardNumberChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      setExpiry(`${digits.slice(0, 2)}/${digits.slice(2)}`);
    } else {
      setExpiry(digits);
    }
  };

  const handleCopyAccount = () => {
    navigator.clipboard?.writeText('0123456789');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment verification (plug Paystack / Flutterwave here for live payments)
    setTimeout(() => {
      const randomRef = `KST-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderReceipt({
        reference: randomRef,
        customer: fullName,
        email,
        method: paymentMethod === 'card' ? 'Debit Card' : 'Bank Transfer',
        total: grandTotal,
      });
      setIsProcessing(false);
      onClearBag();
    }, 900);
  };

  const handleCloseAll = () => {
    setOrderReceipt(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#181615]/60 p-4 backdrop-blur-xs">
      <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-[#E6E1D8] bg-[#FBF9F5] shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleCloseAll}
          className="absolute right-4 top-4 z-10 rounded-lg border border-[#E6E1D8] bg-white p-1.5 text-[#5C5650] hover:bg-[#F1EDE5] hover:text-[#181615]"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Receipt View After Payment */}
        {orderReceipt ? (
          <div className="mx-auto max-w-md px-6 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FBF4EF] text-[#A34E26]">
              <CheckCircle2 className="h-7 w-7" />
            </div>

            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A34E26]">
              Roast Order Confirmed
            </p>
            <h2 className="font-serif-editorial mt-2 text-3xl font-semibold text-[#181615]">
              Thank you, {orderReceipt.customer.split(' ')[0]}.
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-[#5C5650]">
              We’ve sent your receipt and roast schedule to{' '}
              <span className="font-medium text-[#181615]">
                {orderReceipt.email}
              </span>
              . Your beans will be drum-roasted and dispatched within 24 hours.
            </p>

            <div className="mt-7 space-y-3 rounded-xl border border-[#E6E1D8] bg-white p-5 text-left text-xs">
              <div className="flex justify-between">
                <span className="text-[#7A736B]">Order Reference</span>
                <span className="font-mono font-semibold text-[#181615]">
                  #{orderReceipt.reference}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A736B]">Payment Method</span>
                <span className="font-medium text-[#181615]">
                  {orderReceipt.method}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#EBE7DF] pt-3">
                <span className="font-medium text-[#181615]">Total Paid</span>
                <span className="font-mono text-sm font-semibold text-[#A34E26]">
                  ${orderReceipt.total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCloseAll}
              className="mt-7 w-full rounded-lg bg-[#181615] py-3 text-xs font-semibold text-white transition-colors hover:bg-[#2E2A28]"
            >
              Return to Kestrel Roasters
            </button>
          </div>
        ) : (
          /* 2-Column Checkout Form */
          <div className="grid md:grid-cols-12">
            {/* Left Column: Delivery & Payment */}
            <form
              onSubmit={handlePaymentSubmit}
              className="p-6 sm:p-8 md:col-span-7"
            >
              <button
                type="button"
                onClick={onBackToBag}
                className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#7A736B] hover:text-[#181615]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Bag</span>
              </button>

              <h2 className="font-serif-editorial text-2xl font-semibold text-[#181615]">
                Checkout & Payment
              </h2>
              <p className="mt-1 text-xs text-[#7A736B]">
                Enter your delivery information and choose how you’d like to pay.
              </p>

              {/* Delivery Fields */}
              <div className="mt-6 space-y-3.5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A736B]">
                  1. Delivery Details
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full rounded-lg border border-[#E6E1D8] bg-white px-3.5 py-2.5 text-xs text-[#181615] placeholder-[#7A736B] focus:border-[#181615] focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full rounded-lg border border-[#E6E1D8] bg-white px-3.5 py-2.5 text-xs text-[#181615] placeholder-[#7A736B] focus:border-[#181615] focus:outline-none"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full rounded-lg border border-[#E6E1D8] bg-white px-3.5 py-2.5 text-xs text-[#181615] placeholder-[#7A736B] focus:border-[#181615] focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street Address & City"
                    className="w-full rounded-lg border border-[#E6E1D8] bg-white px-3.5 py-2.5 text-xs text-[#181615] placeholder-[#7A736B] focus:border-[#181615] focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment Method Tabs */}
              <div className="mt-7">
                <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A736B]">
                  2. Payment Method
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-xs font-medium transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#A34E26] bg-[#FBF4EF] text-[#A34E26]'
                        : 'border-[#DED8CE] bg-white text-[#5C5650] hover:bg-[#F5F2EC]'
                    }`}
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Debit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('transfer')}
                    className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-xs font-medium transition-all ${
                      paymentMethod === 'transfer'
                        ? 'border-[#A34E26] bg-[#FBF4EF] text-[#A34E26]'
                        : 'border-[#DED8CE] bg-white text-[#5C5650] hover:bg-[#F5F2EC]'
                    }`}
                  >
                    <Building2 className="h-4 w-4" />
                    <span>Bank Transfer</span>
                  </button>
                </div>

                {/* Payment Details Area */}
                {paymentMethod === 'card' ? (
                  <div className="mt-4 space-y-3 rounded-xl border border-[#E6E1D8] bg-white p-4">
                    <div>
                      <label className="mb-1 block text-[11px] text-[#7A736B]">
                        Card Number
                      </label>
                      <input
                        type="text"
                        required
                        inputMode="numeric"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="0000 0000 0000 0000"
                        className="w-full rounded-lg border border-[#E6E1D8] bg-[#FBF9F5] px-3.5 py-2.5 font-mono text-xs text-[#181615] placeholder-[#9D958B] focus:border-[#181615] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1 block text-[11px] text-[#7A736B]">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          required
                          inputMode="numeric"
                          value={expiry}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          className="w-full rounded-lg border border-[#E6E1D8] bg-[#FBF9F5] px-3.5 py-2.5 font-mono text-xs text-[#181615] placeholder-[#9D958B] focus:border-[#181615] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[11px] text-[#7A736B]">
                          CVV
                        </label>
                        <input
                          type="password"
                          required
                          inputMode="numeric"
                          maxLength={4}
                          value={cvv}
                          onChange={(e) =>
                            setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))
                          }
                          placeholder="123"
                          className="w-full rounded-lg border border-[#E6E1D8] bg-[#FBF9F5] px-3.5 py-2.5 font-mono text-xs text-[#181615] placeholder-[#9D958B] focus:border-[#181615] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 rounded-xl border border-[#E6E1D8] bg-white p-4 text-xs">
                    <p className="text-[#5C5650]">
                      Transfer the exact total of{' '}
                      <span className="font-mono font-semibold text-[#A34E26]">
                        ${grandTotal.toFixed(2)}
                      </span>{' '}
                      to the roastery account below, then click confirm:
                    </p>

                    <div className="mt-3 space-y-2 rounded-lg bg-[#F4F1EA] p-3.5">
                      <div className="flex justify-between">
                        <span className="text-[#7A736B]">Bank Name</span>
                        <span className="font-medium text-[#181615]">
                          Providus Bank · Kestrel Checkout
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#7A736B]">Account Name</span>
                        <span className="font-medium text-[#181615]">
                          Kestrel Roasters Ltd
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-t border-[#E6E1D8] pt-2">
                        <span className="text-[#7A736B]">Account Number</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-semibold text-[#181615]">
                            0123456789
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyAccount}
                            className="inline-flex items-center gap-1 rounded border border-[#DED8CE] bg-white px-2 py-1 text-[10px] font-medium text-[#181615] hover:bg-[#F1EDE5]"
                          >
                            {copied ? (
                              <>
                                <Check className="h-3 w-3 text-[#A34E26]" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Payment Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#A34E26] py-3.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#8B411E] disabled:opacity-60"
              >
                <Lock className="h-3.5 w-3.5" />
                <span>
                  {isProcessing
                    ? 'Verifying Payment...'
                    : paymentMethod === 'card'
                      ? `Pay $${grandTotal.toFixed(2)}`
                      : `I Have Sent the Transfer · $${grandTotal.toFixed(2)}`}
                </span>
              </button>
            </form>

            {/* Right Column: Order Summary */}
            <div className="flex flex-col justify-between border-t border-[#E6E1D8] bg-[#F4F1EA] p-6 sm:p-8 md:col-span-5 md:border-l md:border-t-0">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7A736B]">
                  Order Summary
                </p>

                <div className="mt-5 max-h-64 space-y-3.5 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.grind}-${item.weight}`}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-12 w-12 rounded-lg border border-[#E6E1D8] object-cover"
                        />
                        <div>
                          <p className="font-serif-editorial text-sm font-semibold text-[#181615]">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-[#7A736B]">
                            {item.grind} · {item.weight} × {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-semibold text-[#181615]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 space-y-2.5 border-t border-[#E6E1D8] pt-5 text-xs">
                <div className="flex justify-between text-[#5C5650]">
                  <span>Subtotal</span>
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#5C5650]">
                  <span>Priority Dispatch</span>
                  <span className="font-mono">
                    {shippingFee === 0 ? 'Complimentary' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between border-t border-[#E6E1D8] pt-3 text-sm font-semibold text-[#181615]">
                  <span>Total</span>
                  <span className="font-mono text-base">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}