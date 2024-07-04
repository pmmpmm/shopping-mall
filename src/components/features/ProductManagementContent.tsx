import useProducts from "@/hooks/useProducts";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import CategoryNav from "@/components/features/CategoryNav";
import ContentTitle from "@/components/ui/ContentTitle";
import ContentBlockA from "@/components/ui/ContentBlockA";
import ProductManagementList from "@/components/ui/ProductManagementList";
import Button from "@/components/ui/Button";
import NoContent from "@/components/ui/NoContent";
import MessageContent from "./MessageContent";

const ProductManagementContent = () => {
  const { deleteProduct } = useProducts();

  const {
    getAllProducts: { isLoading, isError, data: products }
  } = useProducts();

  const handleDeleteProduct = (id: string) => {
    const confirmDelete = confirm("상품을 삭제하시겠습니까?");
    if (confirmDelete) deleteProduct.mutate({ id });
  };

  return (
    <ContentLayoutA>
      <ContentTitle title="상품 관리" />
      <ContentBlockA className="w-full p-8">
        <div className="flex justify-end">
          <Button title="상품 등록" variant="contain" size="small" href="/product-management/create" />
        </div>

        <CategoryNav path="/product-management?category" />

        {isLoading && <MessageContent type="loading" />}
        {isError && <MessageContent type="error" />}

        {products && (
          <>
            <div className="mt-8">
              {products && products.length > 0 && (
                <ul className="flex flex-col">
                  {products.map((item, idx) => (
                    <ProductManagementList
                      key={`item-${idx}`}
                      item={item}
                      onClick={() => handleDeleteProduct(item.id)}
                    />
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
        {products && products.length <= 0 && <NoContent message="등록된 상품이 없습니다." />}
      </ContentBlockA>
    </ContentLayoutA>
  );
};

export default ProductManagementContent;
