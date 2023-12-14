export type ProductCategory = {
  categoryId: number;
  name: string;
};

export type Product = {
  productId: number;
  category: ProductCategory;
  name: string;
  barcode?: string;
};

export type CreateProductDto = {
  categoryId: number;
  name: string;
  barcode: string;
};

export type UpdateProductDto = {
  categoryId: number;
  name: string;
};

export type Shop = {
  shopId: number;
  name: string;
  address: string;
  phone: string;
};

export type Invoice = {
  invoiceId: number;
  date: string;
  note: string;
  printed: boolean;
  shop: Shop;
};

export type CreateInvoiceDto = {
  shopId: number;
  note: string;
};

export type UpdateInvoiceDto = {
  shopId: number;
  note: string;
};

export type UserData = {
  firstName?: string;
  secondName?: string;
  email: string;
  password: string;
  role?: string;
  shopId?: string;
};
