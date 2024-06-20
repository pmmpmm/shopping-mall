import { useQuery } from "@tanstack/react-query";
import ProductService from "@/services/ProductService";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import ContentTitle from "@/components/ui/ContentTitle";
import FieldFormBlock from "@/components/ui/FieldFormBlock";
import ProductManagementList from "@/components/ui/ProductManagementList";
import Button from "@/components/ui/Button";

const ProductManagementContent = () => {
  const { refetch, data: products } = useQuery({
    queryKey: ["all-products"],
    queryFn: ProductService.getAllProducts
  });

  const deleteProduct = async (id: string) => {
    ProductService.removeProduct(id) //
      .then(() => refetch());
  };
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
                  onClick={() => {
                    deleteProduct(item.id);
                  }}
                />
              ))}
            </ul>
          ) : (
            <div className="flex justify-center py-8">
              <span className="text-lg font-medium">
                <em className="not-italic text-[26px] align-top">😅</em> 등록된 상품이 없습니다.
              </span>
            </div>
          )}
        </div>
      </FieldFormBlock>
    </ContentLayoutA>
  );
};

export default ProductManagementContent;
