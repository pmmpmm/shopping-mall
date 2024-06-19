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

export type ProductDomain = {
  id: string;
  image: string;
  title: string;
  price: string;
  description: string;
  category: string;
  options: string[];
};
