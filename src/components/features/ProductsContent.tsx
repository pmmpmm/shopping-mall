import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductService from "@/services/ProductService";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import ContentTitle from "@/components/ui/ContentTitle";
import ProductCard from "@/components/ui/ProductCard";

const ProductsContent = () => {
  const { search } = useLocation();
  let category = new URLSearchParams(search).get("category") as string;
  switch (category) {
    case "all":
      category = "전체";
      break;
    case "top":
      category = "상의";
      break;
    case "bottom":
      category = "하의";
      break;
    case "dress":
      category = "원피스";
      break;
    case "shoes":
      category = "신발";
      break;
    case "bag":
      category = "가방";
      break;
  }

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
        <li></li>
      </ul>
    </ContentLayoutA>
  );
};

export default ProductsContent;
