export type PricingType = "FIXED" | "FAIR";
export type OrderStatus = "NEW" | "CONFIRMED" | "CANCELLED";

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  description: string | null;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string | null;
  brand_id: string;
  category_id: string;
  pricing_type: PricingType;
  regular_price: number | null;
  catalog_price: number | null;
  fair_price: number | null;
  featured: boolean;
  active: boolean;
  created_at?: string;
  updated_at?: string;
  brand: Brand;
  category: Category;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  id: string;
  product_id: string | null;
  product_name: string;
  product_image_url: string | null;
  unit_price: number;
  quantity: number;
  subtotal: number;
  created_at?: string;
}

export interface Order {
  id: string;
  public_token?: string;
  order_number: string;
  first_name: string;
  last_name: string;
  phone: string;
  notes: string | null;
  status: OrderStatus;
  total: number;
  created_at: string;
  updated_at?: string;
  order_items: OrderItem[];
}

export interface StoreData {
  products: Product[];
  brands: Brand[];
  categories: Category[];
  isDemo: boolean;
}
