export type Category = 'shirts' | 'pants' | 'tshirts' | 'shoes';

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: Category;
  price: number;
  image: string;
  color: string;
  size: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export interface OrderDetails {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: string;
}

export type Page = 'landing' | 'shop' | 'checkout' | 'thankyou';
