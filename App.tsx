import { useState, useCallback } from 'react';
import type { Page, Product, CartItem, OrderDetails } from '@/types';
import LandingPage from '@/components/LandingPage';
import ShopPage from '@/components/ShopPage';
import CheckoutPage from '@/components/CheckoutPage';
import ThankYouPage from '@/components/ThankYouPage';
import { supabase } from '@/lib/supabase';

function App() {
  const [page, setPage] = useState<Page>('landing');
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product, size: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number, size: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId && item.selectedSize === size);
      if (existing && existing.quantity > 1) {
        return prev.map((item) =>
          item.id === productId && item.selectedSize === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prev.filter((item) => !(item.id === productId && item.selectedSize === size));
    });
  }, []);

  const handleSubmitOrder = useCallback(
    async (details: OrderDetails) => {
      const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const items = cart.map((item) => ({
        id: item.id,
        name: item.name,
        brand: item.brand,
        category: item.category,
        price: item.price,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
      }));

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const functionUrl = `${supabaseUrl}/functions/v1/send-order-notification`;

      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          customerName: details.customerName,
          customerEmail: details.customerEmail,
          customerPhone: details.customerPhone,
          paymentMethod: details.paymentMethod,
          items,
          totalAmount: cartTotal,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed (${response.status})`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Order submission failed');
      }

      setCart([]);
      setPage('thankyou');
    },
    [cart]
  );

  if (page === 'landing') {
    return <LandingPage onShopNow={() => setPage('shop')} />;
  }

  if (page === 'shop') {
    return (
      <ShopPage
        cart={cart}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
        onOrderNow={() => setPage('checkout')}
        onBackHome={() => setPage('landing')}
      />
    );
  }

  if (page === 'checkout') {
    return (
      <CheckoutPage
        cart={cart}
        onSubmit={handleSubmitOrder}
        onBack={() => setPage('shop')}
      />
    );
  }

  return <ThankYouPage onBackHome={() => setPage('landing')} />;
}

export default App;
