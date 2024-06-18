import { useQuery } from "@tanstack/react-query";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import ContentTitle from "@/components/ui/ContentTitle";
import FieldFormBlock from "../ui/FieldFormBlock";
import Button from "../ui/Button";
import ProductService from "@/services/ProductService";
import ProductThumbList from "../ui/ProductThumbList";

const ProductManagementContent = () => {
  const { data: products } = useQuery({
    queryKey: ["all-products"],
    queryFn: ProductService.getAllProducts
  });

  return (
    <ContentLayoutA>
      <ContentTitle title="상품 관리" />
      <FieldFormBlock className="w-full p-8">
        <div className="flex justify-end">
          <Button title="상품 등록" variant="contain" size="small" href="/product-management/create" />
        </div>
        <div>
          {products ? (
            <ul className="flex flex-col">
              {products.map((item, idx) => (
                <ProductThumbList key={`item-${idx}`} item={item} />
              ))}
            </ul>
          ) : (
            <p>등록된 상품이 없습니다.</p>
          )}
        </div>
      </FieldFormBlock>
    </ContentLayoutA>
  );
};

export default ProductManagementContent;
