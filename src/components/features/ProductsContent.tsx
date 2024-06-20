import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductService from "@/services/ProductService";
import { categoryToKrUtil } from "@/common/categoryToKrUtil";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import ContentTitle from "@/components/ui/ContentTitle";
import ProductCard from "@/components/ui/ProductCard";

const ProductsContent = () => {
  const { search } = useLocation();
  const category = categoryToKrUtil(new URLSearchParams(search).get("category") as string) as string;

  const { data: products } = useQuery({
    queryKey: ["all-products"],
    queryFn: ProductService.getAllProducts,
    select: (response) => {
      if (response) {
        return response.filter((item) => {
          if (category === "전체") return item;
          return item.category === category;
        });
      }
    }
  });

  return (
    <ContentLayoutA>
      <ContentTitle title={category} />
      <ul className="grid grid-cols-4 gap-x-2 gap-y-7">
        {products?.map((product, idx) => (
          <li key={`product-${idx}`}>
            <ProductCard id={product.id} image={product.image} title={product.title} price={product.price} />
          </li>
        ))}
      </ul>
    </ContentLayoutA>
  );
};

export default ProductsContent;
