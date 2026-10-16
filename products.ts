import type { Product, Category } from '@/types';

const shirtImages = [
  'https://images.pexels.com/photos/35415004/pexels-photo-35415004.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/4443831/pexels-photo-4443831.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/17076311/pexels-photo-17076311.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/9558723/pexels-photo-9558723.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6764918/pexels-photo-6764918.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/8468727/pexels-photo-8468727.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/13339846/pexels-photo-13339846.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7139527/pexels-photo-7139527.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/38285771/pexels-photo-38285771.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7905889/pexels-photo-7905889.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const pantImages = [
  'https://images.pexels.com/photos/16069736/pexels-photo-16069736.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/33278837/pexels-photo-33278837.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/5809818/pexels-photo-5809818.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/13921670/pexels-photo-13921670.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/12645627/pexels-photo-12645627.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6165403/pexels-photo-6165403.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/1808181/pexels-photo-1808181.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/10004175/pexels-photo-10004175.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/15140390/pexels-photo-15140390.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/2244954/pexels-photo-2244954.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const tshirtImages = [
  'https://images.pexels.com/photos/13651809/pexels-photo-13651809.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/30197672/pexels-photo-30197672.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/18139574/pexels-photo-18139574.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6428345/pexels-photo-6428345.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/29138679/pexels-photo-29138679.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/30725120/pexels-photo-30725120.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/12661581/pexels-photo-12661581.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/16701780/pexels-photo-16701780.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/14798947/pexels-photo-14798947.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/9157771/pexels-photo-9157771.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const shoeImages = [
  'https://images.pexels.com/photos/10480303/pexels-photo-10480303.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/18368127/pexels-photo-18368127.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/12745055/pexels-photo-12745055.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/35903994/pexels-photo-35903994.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/39713533/pexels-photo-39713533.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/5223777/pexels-photo-5223777.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/11887134/pexels-photo-11887134.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/1476209/pexels-photo-1476209.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/5758678/pexels-photo-5758678.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/36463718/pexels-photo-36463718.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const shirtBrands = ['Allen Solly', 'Van Heusen', 'Peter England', 'Raymond', 'Louis Philippe', 'Arrow', 'US Polo', 'Levis', 'Park Avenue', 'John Player'];
const pantBrands = ['Levis', 'Wrangler', 'Pepe Jeans', 'Spykar', 'Lee', 'US Polo', 'Flying Machine', 'Peter England', 'Allen Solly', 'Jack & Jones'];
const tshirtBrands = ['Puma', 'Adidas', 'Nike', 'Reebok', 'US Polo', 'Roadster', 'H&M', 'Jack & Jones', 'Levis', 'Under Armour'];
const shoeBrands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'Bata', 'Woodland', 'Red Chief', 'Sparx', 'Campus', 'ASICS'];

const shirtColors = ['White', 'Blue', 'Black', 'Navy', 'Olive', 'Grey', 'Pink', 'Cream', 'Charcoal', 'Sky Blue'];
const pantColors = ['Black', 'Blue', 'Navy', 'Grey', 'Olive', 'Khaki', 'Charcoal', 'Stone', 'Indigo', 'Washed Blue'];
const tshirtColors = ['Black', 'White', 'Navy', 'Grey', 'Maroon', 'Olive', 'Teal', 'Red', 'Blue', 'Charcoal'];
const shoeColors = ['Black', 'White', 'Grey', 'Navy', 'Brown', 'Red', 'Blue', 'Tan', 'Olive', 'Charcoal'];

const shirtNames = ['Slim Fit Formal', 'Classic Oxford', 'Mandarin Collar', 'Checked Casual', 'Linen Blend', 'Striped Office', 'Solid Casual', 'Denim Shirt', 'Khadi Print', 'Twill Weave'];
const pantNames = ['Slim Fit Jeans', 'Chino Pants', 'Formal Trousers', 'Cargo Pants', 'Jogger Pants', 'Straight Fit Jeans', 'Pleated Trousers', 'Skinny Jeans', 'Cotton Casual', 'Denim Ripped'];
const tshirtNames = ['Round Neck Solid', 'Graphic Print', 'Henley Neck', 'Polo T-Shirt', 'V-Neck Casual', 'Oversized Drop Shoulder', 'Striped Crew', 'Sports Dryfit', 'Acid Wash', 'Color Block'];
const shoeNames = ['Running Sneakers', 'Canvas Shoes', 'Leather Loafers', 'Sport Sneakers', 'Casual Walkers', 'High Top Sneakers', 'Slip-On Sneakers', 'Trail Shoes', 'Football Studs', 'Formal Oxfords'];

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
const shoeSizes = ['6', '7', '8', '9', '10', '11'];

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function roundTo(n: number, step: number): number {
  return Math.round(n / step) * step;
}

function generateProducts(
  category: Category,
  brands: string[],
  names: string[],
  colors: string[],
  images: string[],
  minPrice: number,
  maxPrice: number,
  count: number,
  startIndex: number,
  isShoes: boolean
): Product[] {
  const products: Product[] = [];
  for (let i = 0; i < count; i++) {
    const brand = brands[i % brands.length];
    const name = names[i % names.length];
    const color = colors[i % colors.length];
    const price = roundTo(rand(minPrice, maxPrice), 50);
    products.push({
      id: startIndex + i,
      name: `${brand} ${name} - ${color}`,
      brand,
      category,
      price,
      image: images[i % images.length],
      color,
      size: isShoes ? shoeSizes : sizes,
    });
  }
  return products;
}

const products: Product[] = [
  ...generateProducts('shirts', shirtBrands, shirtNames, shirtColors, shirtImages, 450, 3000, 60, 1, false),
  ...generateProducts('pants', pantBrands, pantNames, pantColors, pantImages, 600, 3500, 60, 61, false),
  ...generateProducts('tshirts', tshirtBrands, tshirtNames, tshirtColors, tshirtImages, 299, 1499, 50, 121, false),
  ...generateProducts('shoes', shoeBrands, shoeNames, shoeColors, shoeImages, 599, 3999, 40, 171, true),
];

export default products;

export const categoryLabels: Record<Category, string> = {
  shirts: 'Shirts',
  pants: 'Pants',
  tshirts: 'T-Shirts',
  shoes: 'Shoes',
};

export const allBrands = [...new Set(products.map((p) => p.brand))].sort();

export const priceRanges: Record<Category, [number, number]> = {
  shirts: [450, 3000],
  pants: [600, 3500],
  tshirts: [299, 1499],
  shoes: [599, 3999],
};
