import { useQuery } from "@tanstack/react-query";
import ProductService from "@/services/ProductService";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import ContentTitle from "@/components/ui/ContentTitle";
import FieldFormBlock from "@/components/ui/FieldFormBlock";
import ProductManagementList from "@/components/ui/ProductManagementList";
import Button from "@/components/ui/Button";

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
                <ProductManagementList
                  key={`item-${idx}`}
                  item={item}
                  onClick={() => ProductService.removeProduct(item.id)}
                />
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
