import { ProductOption } from "@/domain/ProductDomain";

export type CartProductDomain = {
  id: string;
  image: string;
  title: string;
  price: string;
  category: string;
  options?: ProductOption[];
  quantity: number;
};
