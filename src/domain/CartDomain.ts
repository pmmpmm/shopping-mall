import { ProductOption } from "@/domain/ProductDomain";

export type CartProductDomain = {
  id: string;
  image: string;
  title: string;
  price: string;
  option: ProductOption | null;
  quantity: number;
};
