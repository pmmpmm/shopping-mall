import { useLocation } from "react-router-dom";
import useProducts from "@/hooks/useProducts";
import { categoryToKrUtil } from "@/common/categoryToKrUtil";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import ContentTitle from "@/components/ui/ContentTitle";
import ProductCard from "@/components/ui/ProductCard";
import NoContent from "@/components/ui/NoContent";

const ProductsContent = () => {
  const { search } = useLocation();
  const category = categoryToKrUtil(new URLSearchParams(search).get("category") as string) as string;

  const {
    getAllProducts: { data: products }
  } = useProducts();

  return (
    <ContentLayoutA>
      <ContentTitle title={category} />
      {products && products.length > 0 ? (
        <ul className="grid grid-cols-4 gap-x-2 gap-y-14">
          {products?.map((product, idx) => (
            <li key={`product-${idx}`}>
              <ProductCard id={product.id} image={product.image} title={product.title} price={product.price} />
            </li>
          ))}
        </ul>
      ) : (
        <NoContent message="아직 상품이 준비되지 않았습니다. 빠른 시일 내에 준비하겠습니다." />
      )}
    </ContentLayoutA>
  );
};

export default ProductsContent;
