export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  description: string;
  features: string[];
  fabric: string;
  material: string;
  fit: string;
  pattern: string;
  sleeveType?: string;
  collarType?: string;
  careInstructions: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  inStock: boolean;
  stockCount: number;
  isNew?: boolean;
  isSale?: boolean;
  isFeatured?: boolean;
  sizeChartType: 'shirt' | 'pants' | 'tshirt' | 'labcoat' | 'uniform';
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

export const CATEGORIES: Category[] = [
  {
    id: 'shirts',
    slug: 'shirts',
    name: "Men's Luxury Shirts",
    description: "Premium executive formal, Oxford, and pure linen shirts crafted with fine long-staple cotton.",
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800',
    itemCount: 28,
  },
  {
    id: 'pants',
    slug: 'pants',
    name: "Tailored Trousers & Chinos",
    description: "Hand-finished formal trousers, stretch comfort chinos, and modern pleated trousers.",
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800',
    itemCount: 22,
  },
  {
    id: 'formal-wear',
    slug: 'formal-wear',
    name: 'Suits & Bespoke Blazers',
    description: 'Italian cut blazers, evening tuxedos, and handcrafted double-breasted formal ensembles.',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800',
    itemCount: 18,
  },
  {
    id: 'fabrics',
    slug: 'fabrics',
    name: 'Luxury Fabrics & Textiles',
    description: '100% Egyptian Giza cottons, pure European linen rolls, and superfine wool suiting fabrics by the meter.',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=800',
    itemCount: 45,
  },
  {
    id: 'ethnic',
    slug: 'ethnic',
    name: 'Ethnic & Festive Wear',
    description: 'Silk Nehru jackets, raw silk bandhgalas, and handcrafted festive linen kurtas.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
    itemCount: 16,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    slug: 'premium-formal-shirt',
    name: 'Executive Royale Giza Cotton Shirt',
    category: 'shirts',
    subcategory: 'Formal Shirts',
    price: 1899,
    rating: 4.9,
    reviewsCount: 168,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
    ],
    description: 'Impeccably tailored from 100% Egyptian Giza cotton. Features a semi-spread collar, single-button convertible cuffs, and a wrinkle-resistant silk finish ideal for discerning professionals.',
    features: [
      '100% Giza Compact Superfine Cotton',
      'Wrinkle-Resistant Silk Touch Handfeel',
      'German Interlining Collar & Cuffs',
      'Reinforced Split Yoke Construction',
    ],
    fabric: 'Superfine Giza Cotton',
    material: '100% Cotton',
    fit: 'Slim Fit',
    pattern: 'Solid Micro-Structure',
    sleeveType: 'Full Sleeve',
    collarType: 'Semi-Spread Collar',
    careInstructions: ['Machine wash cold gentle', 'Do not bleach', 'Warm iron if needed', 'Tumble dry low'],
    colors: [
      { name: 'Crisp White', hex: '#FFFFFF' },
      { name: 'Soft Blue', hex: '#93C5FD' },
      { name: 'Midnight Navy', hex: '#1E293B' },
    ],
    sizes: ['38', '40', '42', '44', '46'],
    inStock: true,
    stockCount: 120,
    isFeatured: true,
    isNew: true,
    sizeChartType: 'shirt',
  },
  {
    id: 'p2',
    slug: 'classic-oxford-shirt',
    name: 'Heritage Oxford Button-Down Shirt',
    category: 'shirts',
    subcategory: 'Oxford Shirts',
    price: 1599,
    rating: 4.8,
    reviewsCount: 114,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800',
    ],
    description: 'Heavyweight pinpoint Oxford weave with a classic button-down collar. Designed for versatile smart-casual styling from day to evening.',
    features: [
      'Pinpoint Heavyweight Oxford Weave',
      'Button-Down Collar with Natural Roll',
      'Mother of Pearl Luster Buttons',
      'Reinforced Chest Pocket',
    ],
    fabric: 'Pinpoint Oxford Cotton',
    material: '100% Cotton',
    fit: 'Regular Fit',
    pattern: 'Solid Oxford',
    sleeveType: 'Full Sleeve',
    collarType: 'Button-Down Collar',
    careInstructions: ['Machine wash medium', 'Line dry recommended', 'Medium iron'],
    colors: [
      { name: 'Sky Blue', hex: '#60A5FA' },
      { name: 'Optic White', hex: '#F8FAFC' },
      { name: 'Sage Green', hex: '#84CC16' },
    ],
    sizes: ['38', '40', '42', '44'],
    inStock: true,
    stockCount: 85,
    isFeatured: true,
    sizeChartType: 'shirt',
  },
  {
    id: 'p3',
    slug: 'pure-italian-linen-shirt',
    name: 'Bespoke Pure Italian Linen Shirt',
    category: 'shirts',
    subcategory: 'Linen Shirts',
    price: 2199,
    rating: 4.9,
    reviewsCount: 86,
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800',
    ],
    description: '100% European flax certified linen shirt. Exceptionally lightweight, naturally cooling, and pre-softened for relaxed luxury elegance.',
    features: [
      '100% Pure Normandy Linen',
      'Natural Slub Airy Weave',
      'Relaxed Mandarin/Band Collar',
      'Pre-washed Ultra Soft Finish',
    ],
    fabric: 'Pure European Linen',
    material: '100% Linen',
    fit: 'Relaxed Tailored',
    pattern: 'Solid Slub Texture',
    sleeveType: 'Full Sleeve',
    collarType: 'Band Collar',
    careInstructions: ['Gentle wash cold', 'Hang dry in shade', 'Warm steam iron'],
    colors: [
      { name: 'Natural Sand', hex: '#E5D9C5' },
      { name: 'Olive Sage', hex: '#657760' },
      { name: 'Pure Ivory', hex: '#FFFFF0' },
    ],
    sizes: ['38', '40', '42', '44', '46'],
    inStock: true,
    stockCount: 95,
    isFeatured: true,
    isNew: true,
    sizeChartType: 'shirt',
  },
  {
    id: 'p4',
    slug: 'slim-fit-formal-trouser',
    name: 'Signature Flex-Waist Tailored Trouser',
    category: 'pants',
    subcategory: 'Formal Pants',
    price: 1999,
    rating: 4.9,
    reviewsCount: 132,
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
    ],
    description: 'Refined flat-front formal trousers crafted from stretch wool-viscose blend. Features hidden comfort waistband, double jet back pockets, and stain-shield finish.',
    features: [
      'Stretch Poly-Viscose-Wool Blend',
      'Hidden Expandable Comfort Waistband',
      'Wrinkle & Stain Shield Technology',
      'Tailored Tapered Cut',
    ],
    fabric: 'Poly-Viscose Wool Stretch',
    material: '65% Polyester, 33% Viscose, 2% Elastane',
    fit: 'Slim Tapered',
    pattern: 'Solid Matt Finish',
    careInstructions: ['Dry clean preferred', 'Warm machine wash gentle', 'Iron on low setting'],
    colors: [
      { name: 'Jet Black', hex: '#0F172A' },
      { name: 'Charcoal Grey', hex: '#334155' },
      { name: 'Midnight Navy', hex: '#1E1B4B' },
    ],
    sizes: ['30', '32', '34', '36', '38', '40'],
    inStock: true,
    stockCount: 160,
    isFeatured: true,
    sizeChartType: 'pants',
  },
  {
    id: 'p5',
    slug: 'classic-chino-pant',
    name: 'Urban Stretch Twill Chino Trousers',
    category: 'pants',
    subcategory: 'Chinos',
    price: 1699,
    rating: 4.7,
    reviewsCount: 94,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800',
    ],
    description: 'Versatile cotton twill chinos infused with elastane for maximum range of motion. Modern flat front, deep slant pockets, and durable button waist fastening.',
    features: [
      'Pre-washed Premium Cotton Twill',
      '4-Way Comfort Stretch',
      'Reinforced Pocket Linings',
      'Garment Dyed Finish',
    ],
    fabric: 'Stretch Cotton Twill',
    material: '98% Cotton, 2% Spandex',
    fit: 'Modern Slim',
    pattern: 'Solid Twill',
    careInstructions: ['Machine wash cold inside out', 'Tumble dry medium', 'Iron warm'],
    colors: [
      { name: 'Khaki Beige', hex: '#D4A373' },
      { name: 'Olive Green', hex: '#4A5D4E' },
      { name: 'Dark Navy', hex: '#1E293B' },
    ],
    sizes: ['30', '32', '34', '36', '38'],
    inStock: true,
    stockCount: 110,
    sizeChartType: 'pants',
  },
  {
    id: 'p6',
    slug: 'executive-business-blazer',
    name: 'Italian Cut Wool-Blend Blazer',
    category: 'formal-wear',
    subcategory: 'Blazers',
    price: 4999,
    rating: 4.9,
    reviewsCount: 78,
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
    ],
    description: 'Structured single-breasted tailored blazer featuring notch lapels, pick-stitching detail, double rear vents, and premium cupro interior lining.',
    features: [
      'Super 110s Fine Suiting Fabric',
      'Half-Canvas Interior Construction',
      'Hand-finished Lapel Stitching',
      'Multiple Interior Utility Pockets',
    ],
    fabric: 'Super 110s Wool Blend',
    material: '70% Wool, 30% Polyester',
    fit: 'Tailored Fit',
    pattern: 'Subtle Herringbone',
    careInstructions: ['Strictly dry clean only', 'Store on padded hanger'],
    colors: [
      { name: 'Classic Navy', hex: '#1E293B' },
      { name: 'Charcoal Slate', hex: '#475569' },
      { name: 'Camel Tan', hex: '#C4A35A' },
    ],
    sizes: ['38', '40', '42', '44', '46'],
    inStock: true,
    stockCount: 45,
    isFeatured: true,
    sizeChartType: 'shirt',
  },
  {
    id: 'p7',
    slug: 'premium-linen-fabric-meter',
    name: 'Pure Normandy Linen Fabric (Per Meter)',
    category: 'fabrics',
    subcategory: 'Linen Fabrics',
    price: 650,
    rating: 4.9,
    reviewsCount: 88,
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
    ],
    description: '100% European flax certified pure linen fabric. 60 Lea count offering natural cooling, slub texture, and exceptional drape for bespoke suits and shirts.',
    features: [
      '100% Certified European Flax',
      '60 Lea Fine Count Weave',
      'Breathable Thermoregulating Natural Fibers',
      'Pre-shrunk Softened Handfeel',
    ],
    fabric: 'Pure European Linen',
    material: '100% Linen',
    fit: 'Custom Tailoring Material',
    pattern: 'Natural Slub Texture',
    careInstructions: ['Hand wash or gentle cycle', 'Dry flat', 'Steam iron while damp'],
    colors: [
      { name: 'Natural Oatmeal', hex: '#E5D9C5' },
      { name: 'Optic White', hex: '#FFFFFF' },
      { name: 'Indigo Navy', hex: '#1E293B' },
      { name: 'Terracotta Gold', hex: '#C4A35A' },
    ],
    sizes: ['1 Meter', '2.5 Meters (Shirt Length)', '3.5 Meters (Trouser & Shirt)', '5 Meters (Full Suit)'],
    inStock: true,
    stockCount: 3500,
    isFeatured: true,
    sizeChartType: 'shirt',
  },
  {
    id: 'p8',
    slug: 'egyptian-giza-cotton-fabric',
    name: 'Royal Giza 88 Mercerized Cotton Fabric',
    category: 'fabrics',
    subcategory: 'Cotton Fabrics',
    price: 550,
    rating: 4.9,
    reviewsCount: 112,
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800',
    ],
    description: 'Ultra-luxurious 80s count 2-ply Egyptian Giza cotton shirting fabric. Silky luster, feather-light weight, and unmatched breathability for custom shirts.',
    features: [
      '80/2 Ply Superfine Long Staple Giza Cotton',
      'Mercerized Silk-Gloss Finish',
      'High Thread Density for Decades of Durability',
      'Zero Synthetic Fillers',
    ],
    fabric: 'Giza 88 Mercerized Cotton',
    material: '100% Cotton',
    fit: 'Bespoke Shirting Cloth',
    pattern: 'Micro Satin Weave',
    careInstructions: ['Gentle wash', 'Do not tumble dry', 'Hot steam iron'],
    colors: [
      { name: 'Royal Sky Blue', hex: '#38BDF8' },
      { name: 'Pure Pearl White', hex: '#FFFFFF' },
      { name: 'Pastel Lilac', hex: '#E9D5FF' },
    ],
    sizes: ['1.6 Meters (Half Sleeve)', '2.5 Meters (Full Sleeve Shirt)', '5 Meters (Double Cut)'],
    inStock: true,
    stockCount: 4200,
    isFeatured: true,
    sizeChartType: 'shirt',
  },
];
