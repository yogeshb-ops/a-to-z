import { useState, useMemo } from 'react';
import { ShoppingCart, Filter, X, Plus, Minus, ArrowRight, Star, Check } from 'lucide-react';
import type { Product, Category, CartItem } from '@/types';
import products, { categoryLabels, allBrands, priceRanges } from '@/data/products';

interface ShopPageProps {
  cart: CartItem[];
  onAddToCart: (product: Product, size: string) => void;
  onRemoveFromCart: (productId: number, size: string) => void;
  onOrderNow: () => void;
  onBackHome: () => void;
}

export default function ShopPage({ cart, onAddToCart, onRemoveFromCart, onOrderNow, onBackHome }: ShopPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4000]);
  const [showFilters, setShowFilters] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState<Record<number, string>>({});

  const categories: (Category | 'all')[] = ['all', 'shirts', 'pants', 'tshirts', 'shoes'];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });
  }, [selectedCategory, selectedBrands, priceRange]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleProductAdd = (product: Product) => {
    const size = selectedSize[product.id] || product.size[0];
    onAddToCart(product, size);
  };

  const isInCart = (productId: number) => cart.some((item) => item.id === productId);

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-stone-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <button onClick={onBackHome} className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center">
              <span className="text-stone-950 font-bold text-sm">AZ</span>
            </div>
            <span className="text-lg font-bold text-white hidden md:block">
              A to Z <span className="text-amber-400">Clothings</span>
            </span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-800 text-stone-300 text-sm"
            >
              <Filter size={16} />
              Filters
            </button>

            <button
              onClick={() => setShowCart(true)}
              className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-sm transition-colors"
            >
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex gap-6">
        {/* Sidebar Filters - Desktop */}
        <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-72 flex-shrink-0`}>
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-stone-900 text-lg flex items-center gap-2">
                <Filter size={18} className="text-amber-600" />
                Filters
              </h3>
              <button onClick={() => setShowFilters(false)} className="md:hidden text-stone-400">
                <X size={20} />
              </button>
            </div>

            {/* Category */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-stone-700 mb-3">Category</h4>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === cat
                        ? 'bg-amber-500 text-stone-950'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {cat === 'all' ? 'All Products' : categoryLabels[cat]}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-stone-700 mb-3">
                Price Range: Rs.{priceRange[0]} - Rs.{priceRange[1]}
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-stone-500">Min: Rs.{priceRange[0]}</label>
                  <input
                    type="range"
                    min={0}
                    max={4000}
                    step={50}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Math.min(Number(e.target.value), priceRange[1] - 50), priceRange[1]])}
                    className="w-full accent-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-stone-500">Max: Rs.{priceRange[1]}</label>
                  <input
                    type="range"
                    min={0}
                    max={4000}
                    step={50}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0] + 50)])}
                    className="w-full accent-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Brands */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-stone-700 mb-3">Brands</h4>
              <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                {allBrands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-stone-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                      className="w-4 h-4 accent-amber-500 rounded"
                    />
                    <span className="text-sm text-stone-600">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedBrands([]);
                setPriceRange([0, 4000]);
              }}
              className="w-full py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 text-sm font-medium transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold text-stone-900">Men's Collection</h2>
              <p className="text-sm text-stone-500 mt-0.5">
                {filteredProducts.length} products available
              </p>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center">
              <p className="text-stone-400 text-lg">No products match your filters.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedBrands([]);
                  setPriceRange([0, 4000]);
                }}
                className="mt-4 text-amber-600 font-semibold hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => {
                const inCart = isInCart(product.id);
                const currentSize = selectedSize[product.id] || product.size[0];
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-lg hover:border-amber-300 transition-all duration-300 group"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-stone-900/80 backdrop-blur-sm text-white text-xs font-medium">
                        {categoryLabels[product.category]}
                      </div>
                      <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-amber-500 text-stone-950 text-xs font-bold">
                        Rs.{product.price}
                      </div>
                    </div>

                    <div className="p-3">
                      <p className="text-xs text-amber-600 font-semibold mb-0.5">{product.brand}</p>
                      <h3 className="text-sm font-medium text-stone-800 leading-snug mb-2 line-clamp-2 min-h-[2.5rem]">
                        {product.name}
                      </h3>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.size.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize((prev) => ({ ...prev, [product.id]: size }))}
                            className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
                              currentSize === size
                                ? 'bg-stone-900 text-white'
                                : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => handleProductAdd(product)}
                        className={`w-full py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
                          inCart
                            ? 'bg-green-500 text-white'
                            : 'bg-stone-900 text-white hover:bg-stone-800'
                        }`}
                      >
                        {inCart ? (
                          <>
                            <Check size={14} />
                            Added
                          </>
                        ) : (
                          <>
                            <Plus size={14} />
                            Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-stone-950/50 backdrop-blur-sm" onClick={() => setShowCart(false)} />
          <div className="relative ml-auto w-full max-w-md bg-stone-50 shadow-2xl flex flex-col animate-slide-in">
            <div className="px-5 py-4 bg-stone-900 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShoppingCart size={20} className="text-amber-400" />
                Your Cart ({cartCount})
              </h3>
              <button onClick={() => setShowCart(false)} className="text-stone-400 hover:text-white">
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingCart size={48} className="text-stone-300 mx-auto mb-3" />
                  <p className="text-stone-400">Your cart is empty.</p>
                  <p className="text-stone-400 text-sm mt-1">Add some products to get started.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-3 bg-white rounded-xl p-3 shadow-sm">
                    <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-amber-600 font-semibold">{item.brand}</p>
                      <h4 className="text-sm font-medium text-stone-800 line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-stone-500 mt-0.5">Size: {item.selectedSize}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onRemoveFromCart(item.id, item.selectedSize)}
                            className="w-6 h-6 rounded bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-semibold text-stone-700">{item.quantity}</span>
                          <button
                            onClick={() => onAddToCart(item, item.selectedSize)}
                            className="w-6 h-6 rounded bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-stone-900">Rs.{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-stone-200 p-4 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-stone-600 text-sm">Total Amount</span>
                  <span className="text-2xl font-bold text-stone-900">Rs.{cartTotal}</span>
                </div>
                <button
                  onClick={() => {
                    setShowCart(false);
                    onOrderNow();
                  }}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  Order Now
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
