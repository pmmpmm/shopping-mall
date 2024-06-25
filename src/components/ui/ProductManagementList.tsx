import { ProductValueDomain } from "@/domain/ProductDomain";
import ProductThumbList from "@/components/ui/ProductThumbList";
import Button from "@/components/ui/Button";

interface ProductManagementListProps {
  item: ProductValueDomain;
  onClick: () => void;
}

const ProductManagementList = ({ item, onClick }: ProductManagementListProps) => {
  return (
    <li className="flex flex-row justify-end items-center py-4 gap-4 border-b border-gray-200 border-solid last:border-0 last:pb-0">
      <ProductThumbList url={`/product-management/update?id=${item.id}`} product={item} />
      <Button title="상품 삭제" variant="outline" size="small" onClick={onClick} />
    </li>
  );
};

export default ProductManagementList;
