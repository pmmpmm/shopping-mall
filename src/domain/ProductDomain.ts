export type ProductOption = {
  no: number;
  opt: string;
};

export type ProductValueDomain = {
  [index: string]: string | ProductOption[];
  id: string;
  image: string;
  title: string;
  price: string;
  description: string;
  category: string;
  options: ProductOption[];
};

export type ProductThumbListDomain = {
  id: string;
  image: string;
  title: string;
  price: string;
  description: string;
  category?: string;
  options: ProductOption[];
};

export type ProductListDomain = {
  id: string;
  image: string;
  title: string;
  price: string;
};

export type CartProductDomain = {
  id: string;
  image: string;
  title: string;
  price: string;
  option: ProductOption | null;
  quantity: number;
};

// export type ProductDetailDomain = ProductListDomain & {
//   description: string;
//   category: string;
//   options: string[];
// };
