import { useState } from 'react';
import { ArrowLeft, CreditCard, Banknote, Smartphone, Wallet, Loader2, ShoppingBag, Check } from 'lucide-react';
import type { CartItem, OrderDetails } from '@/types';

interface CheckoutPageProps {
  cart: CartItem[];
  onSubmit: (details: OrderDetails) => Promise<void>;
  onBack: () => void;
}

export default function CheckoutPage({ cart, onSubmit, onBack }: CheckoutPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const paymentOptions = [
    { id: 'Cash on Delivery', label: 'Cash on Delivery', icon: Banknote },
    { id: 'Credit/Debit Card', label: 'Credit / Debit Card', icon: CreditCard },
    { id: 'UPI Payment', label: 'UPI Payment', icon: Smartphone },
    { id: 'Wallet', label: 'Digital Wallet', icon: Wallet },
  ];

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please enter your name';
    if (!email.trim()) errs.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Please enter a valid email';
    if (!phone.trim()) errs.phone = 'Please enter your mobile number';
    else if (!/^[0-9+\-\s]{10,15}$/.test(phone)) errs.phone = 'Please enter a valid mobile number';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onSubmit({ customerName: name, customerEmail: email, customerPhone: phone, paymentMethod });
    } catch (err) {
      setSubmitting(false);
      setErrors({ submit: 'Something went wrong. Please try again.' });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-center px-6 text-center">
        <ShoppingBag size={56} className="text-stone-600 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Your cart is empty</h2>
        <p className="text-stone-400 mb-6">Add some products before checking out.</p>
        <button onClick={onBack} className="px-6 py-3 bg-amber-500 text-stone-950 font-semibold rounded-xl hover:bg-amber-400 transition-colors">
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-900 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-amber-500 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-amber-600 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-4 md:px-8 py-4 flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span className="text-sm">Back to Shop</span>
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-bold text-white">
              A to Z <span className="text-amber-400">Clothings</span>
            </h1>
          </div>
          <div className="w-24" />
        </header>

        <div className="max-w-5xl mx-auto px-4 md:px-8 py-6">
          <h2 className="text-3xl font-bold text-white mb-2">Checkout</h2>
          <p className="text-stone-400 mb-8">Enter your details and choose a payment method to complete your order.</p>

          <div className="grid md:grid-cols-5 gap-6">
            {/* Form */}
            <div className="md:col-span-3 space-y-6">
              {/* Customer details */}
              <div className="bg-stone-800/50 rounded-2xl p-6 border border-stone-700">
                <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-amber-500 text-stone-950 text-sm flex items-center justify-center font-bold">1</span>
                  Customer Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-300 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 rounded-xl bg-stone-900 border text-white placeholder-stone-500 outline-none transition-colors ${
                        errors.name ? 'border-red-500' : 'border-stone-700 focus:border-amber-500'
                      }`}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-300 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-stone-900 border text-white placeholder-stone-500 outline-none transition-colors ${
                        errors.email ? 'border-red-500' : 'border-stone-700 focus:border-amber-500'
                      }`}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-300 mb-1.5">Mobile Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Your 10-digit mobile number"
                      className={`w-full px-4 py-3 rounded-xl bg-stone-900 border text-white placeholder-stone-500 outline-none transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-stone-700 focus:border-amber-500'
                      }`}
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Payment method */}
              <div className="bg-stone-800/50 rounded-2xl p-6 border border-stone-700">
                <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-amber-500 text-stone-950 text-sm flex items-center justify-center font-bold">2</span>
                  Payment Method
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  {paymentOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setPaymentMethod(option.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all text-left ${
                        paymentMethod === option.id
                          ? 'border-amber-500 bg-amber-500/10'
                          : 'border-stone-700 bg-stone-900 hover:border-stone-600'
                      }`}
                    >
                      <option.icon
                        size={22}
                        className={paymentMethod === option.id ? 'text-amber-400' : 'text-stone-400'}
                      />
                      <span className={`text-sm font-medium ${paymentMethod === option.id ? 'text-white' : 'text-stone-400'}`}>
                        {option.label}
                      </span>
                      {paymentMethod === option.id && <Check size={16} className="text-amber-400 ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>

              {errors.submit && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
                  {errors.submit}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="md:col-span-2">
              <div className="bg-stone-800/50 rounded-2xl p-6 border border-stone-700 sticky top-6">
                <h3 className="text-lg font-bold text-white mb-4">Order Summary</h3>

                <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-3 text-sm">
                      <img src={item.image} alt={item.name} className="w-12 h-14 object-cover rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-stone-200 font-medium line-clamp-1">{item.name}</p>
                        <p className="text-xs text-stone-500">
                          Size: {item.selectedSize} &middot; Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-stone-300 font-semibold flex-shrink-0">Rs.{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-stone-700 pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-stone-400">
                    <span>Items</span>
                    <span>{cart.reduce((s, i) => s + i.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-white">
                    <span>Total</span>
                    <span className="text-amber-400">Rs.{cartTotal}</span>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full mt-6 py-3.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-stone-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Order
                      <Check size={18} />
                    </>
                  )}
                </button>

                <p className="text-xs text-stone-500 text-center mt-3">
                  By submitting, you agree to our terms and conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
