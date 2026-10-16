/*
# Create orders table for A to Z Clothings

1. New Tables
- `orders`
- `id` (uuid, primary key)
- `customer_name` (text, not null) - customer's full name
- `customer_email` (text, not null) - customer's email address
- `customer_phone` (text, not null) - customer's mobile number
- `payment_method` (text, not null) - selected payment option (COD, Card, UPI, etc.)
- `items` (jsonb, not null) - array of selected product objects with name, price, brand, category, quantity
- `total_amount` (numeric, not null) - total order value
- `status` (text, default 'pending') - order status
- `created_at` (timestamp, default now)
2. Security
- Enable RLS on `orders`.
- Allow anon + authenticated CRUD because this is a no-auth e-commerce store where anyone can place orders.
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  payment_method text NOT NULL,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  total_amount numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders" ON orders FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_orders" ON orders;
CREATE POLICY "anon_update_orders" ON orders FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_orders" ON orders;
CREATE POLICY "anon_delete_orders" ON orders FOR DELETE
TO anon, authenticated USING (true);
