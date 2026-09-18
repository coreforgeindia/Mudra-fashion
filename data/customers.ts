export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'retail' | 'wholesale';
  companyName?: string;
  gstNumber?: string;
  status: 'active' | 'pending' | 'suspended';
  totalOrders: number;
  totalSpent: number;
  joinedDate: string;
}

export interface WholesaleApplication {
  id: string;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  gstNumber: string;
  businessType: string;
  city: string;
  state: string;
  expectedOrderQty: string;
  categories: string[];
  appliedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  image: string;
  size: string;
  color: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  type: 'retail' | 'wholesale';
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'packed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: string;
}

export interface QuotationItem {
  productName: string;
  sku: string;
  requestedQty: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Quotation {
  id: string;
  quoteNumber: string;
  businessName: string;
  contactPerson: string;
  email: string;
  items: QuotationItem[];
  subtotal: number;
  gstAmount: number;
  grandTotal: number;
  status: 'draft' | 'pending' | 'sent' | 'accepted' | 'rejected' | 'expired';
  createdDate: string;
  validUntil: string;
}

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'c1',
    name: 'Vikramaditya Sharma',
    email: 'vikram.sharma@example.com',
    phone: '+91 98765 43210',
    type: 'retail',
    status: 'active',
    totalOrders: 6,
    totalSpent: 8494,
    joinedDate: '12 Jan 2025',
  },
  {
    id: 'c2',
    name: 'Apex Corporate Garments Ltd',
    email: 'procurement@apexcorp.com',
    phone: '+91 80 4567 8900',
    type: 'wholesale',
    companyName: 'Apex Corporate Garments Ltd',
    gstNumber: '29ABCDE1234F1Z5',
    status: 'active',
    totalOrders: 14,
    totalSpent: 384500,
    joinedDate: '04 Nov 2024',
  },
  {
    id: 'c3',
    name: 'Rajesh Textiles & Retail',
    email: 'rajesh.textiles@example.in',
    phone: '+91 94441 23890',
    type: 'wholesale',
    companyName: 'Rajesh Textiles',
    gstNumber: '33AAACR5432B1Z2',
    status: 'pending',
    totalOrders: 0,
    totalSpent: 0,
    joinedDate: '28 Aug 2026',
  },
  {
    id: 'c4',
    name: 'Ananya Deshmukh',
    email: 'ananya.d@example.com',
    phone: '+91 98200 11223',
    type: 'retail',
    status: 'active',
    totalOrders: 3,
    totalSpent: 4297,
    joinedDate: '15 Feb 2025',
  },
];

export const MOCK_WHOLESALE_APPLICATIONS: WholesaleApplication[] = [
  {
    id: 'wa-101',
    businessName: 'Vanguard Hospitality Uniforms',
    contactPerson: 'Rohan Mehra',
    email: 'rohan@vanguardhospitality.in',
    phone: '+91 98112 33445',
    gstNumber: '07AAAAA0000A1Z5',
    businessType: 'Hotel & Restaurant Supplier',
    city: 'New Delhi',
    state: 'Delhi',
    expectedOrderQty: '500 - 1000 pieces / month',
    categories: ['Uniforms', 'Corporate Uniforms', 'Hotel/Restaurant Uniforms'],
    appliedDate: '28 Aug 2026',
    status: 'pending',
  },
  {
    id: 'wa-102',
    businessName: 'Southern Star Retail Chain',
    contactPerson: 'Karthik Subramanian',
    email: 'karthik@southernstar.co.in',
    phone: '+91 94432 99881',
    gstNumber: '33BBBBB1111B2Z4',
    businessType: 'Clothing Retail Chain',
    city: 'Bengaluru',
    state: 'Karnataka',
    expectedOrderQty: '1000+ pieces / month',
    categories: ["Men's Shirts", "Men's Pants", 'Formal Wear'],
    appliedDate: '26 Aug 2026',
    status: 'approved',
  },
  {
    id: 'wa-103',
    businessName: 'Fortis Health Care Logistics',
    contactPerson: 'Dr. Sameer Joshi',
    email: 'supply@fortishealth.org',
    phone: '+91 99000 88776',
    gstNumber: '27CCCCC2222C3Z3',
    businessType: 'Hospital Group',
    city: 'Mumbai',
    state: 'Maharashtra',
    expectedOrderQty: '200 - 500 pieces / month',
    categories: ['Uniforms', 'Lab Coats', 'Hospital Uniforms'],
    appliedDate: '20 Aug 2026',
    status: 'approved',
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-8901',
    orderNumber: 'MF-2026-8901',
    customerName: 'Vikramaditya Sharma',
    customerEmail: 'vikram.sharma@example.com',
    type: 'retail',
    items: [
      {
        productId: 'p1',
        productName: 'Executive Royale Formal Shirt',
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800',
        size: 'L (42)',
        color: 'Crisp White',
        unitPrice: 1299,
        quantity: 2,
        total: 2598,
      },
      {
        productId: 'p3',
        productName: 'Signature Flex-Waist Formal Trouser',
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800',
        size: '34',
        color: 'Charcoal Grey',
        unitPrice: 1399,
        quantity: 1,
        total: 1399,
      },
    ],
    subtotal: 3997,
    tax: 199,
    shipping: 0,
    discount: 200,
    totalAmount: 3996,
    paymentMethod: 'UPI (Google Pay)',
    paymentStatus: 'paid',
    orderStatus: 'shipped',
    createdAt: '27 Aug 2026',
    shippingAddress: '#42, Indiranagar 100ft Road, Bengaluru, KA 560038',
  },
  {
    id: 'ord-8902',
    orderNumber: 'MF-BULK-2026-044',
    customerName: 'Apex Corporate Garments Ltd',
    customerEmail: 'procurement@apexcorp.com',
    type: 'wholesale',
    items: [
      {
        productId: 'p6',
        productName: 'ProServe Corporate Uniform Shirt',
        image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=800',
        size: 'M (40)',
        color: 'Corporate White',
        unitPrice: 480,
        quantity: 100,
        total: 48000,
      },
      {
        productId: 'p6',
        productName: 'ProServe Corporate Uniform Shirt',
        image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=800',
        size: 'L (42)',
        color: 'Corporate White',
        unitPrice: 480,
        quantity: 150,
        total: 72000,
      },
    ],
    subtotal: 120000,
    tax: 6000,
    shipping: 1500,
    discount: 5000,
    totalAmount: 122500,
    paymentMethod: 'Net Banking (NEFT)',
    paymentStatus: 'paid',
    orderStatus: 'processing',
    createdAt: '25 Aug 2026',
    shippingAddress: 'Apex Towers, Tech Park Phase 2, Whitefield, Bengaluru 560066',
  },
];

export const MOCK_QUOTATIONS: Quotation[] = [
  {
    id: 'q-501',
    quoteNumber: 'QT-2026-501',
    businessName: 'Vanguard Hospitality Uniforms',
    contactPerson: 'Rohan Mehra',
    email: 'rohan@vanguardhospitality.in',
    items: [
      { productName: 'ProServe Corporate Uniform Shirt', sku: 'UNI-SH-01', requestedQty: 200, unitPrice: 480, totalPrice: 96000 },
      { productName: 'MediGuard Antibacterial Lab Coat', sku: 'UNI-LC-02', requestedQty: 100, unitPrice: 420, totalPrice: 42000 },
    ],
    subtotal: 138000,
    gstAmount: 6900,
    grandTotal: 144900,
    status: 'pending',
    createdDate: '28 Aug 2026',
    validUntil: '15 Sep 2026',
  },
  {
    id: 'q-502',
    quoteNumber: 'QT-2026-488',
    businessName: 'Southern Star Retail Chain',
    contactPerson: 'Karthik Subramanian',
    email: 'karthik@southernstar.co.in',
    items: [
      { productName: 'Executive Royale Formal Shirt', sku: 'SH-ROY-01', requestedQty: 500, unitPrice: 720, totalPrice: 360000 },
      { productName: 'Signature Flex-Waist Formal Trouser', sku: 'TR-SIG-03', requestedQty: 400, unitPrice: 800, totalPrice: 320000 },
    ],
    subtotal: 680000,
    gstAmount: 34000,
    grandTotal: 714000,
    status: 'sent',
    createdDate: '22 Aug 2026',
    validUntil: '05 Sep 2026',
  },
];
