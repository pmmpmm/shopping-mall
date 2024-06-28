import useProducts from "@/hooks/useProducts";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import ContentTitle from "@/components/ui/ContentTitle";
import FieldFormBlock from "@/components/ui/FieldFormBlock";
import ProductManagementList from "@/components/ui/ProductManagementList";
import Button from "@/components/ui/Button";
import NoContent from "@/components/ui/NoContent";

const ProductManagementContent = () => {
  const { deleteProduct } = useProducts();

  const {
    getAllProducts: { data: products }
  } = useProducts();

  const handleDeleteProduct = (id: string) => {
    const confirmDelete = confirm("상품을 삭제하시겠습니까?");
    if (confirmDelete) deleteProduct.mutate({ id });
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
                <ProductManagementList key={`item-${idx}`} item={item} onClick={() => handleDeleteProduct(item.id)} />
              ))}
            </ul>
          ) : (
            <NoContent message="등록된 상품이 없습니다." />
          )}
        </div>
      </FieldFormBlock>
    </ContentLayoutA>
  );
};

export default ProductManagementContent;
