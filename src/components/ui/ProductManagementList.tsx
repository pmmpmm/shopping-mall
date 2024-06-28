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
      <ProductThumbList url={`/productpage?id=${item.id}`} product={item} />

      <div className="flex flex-nowrap gap-2">
        <Button title="수정" variant="outline" size="small" href={`/product-management/update?id=${item.id}`} />
        <Button title="삭제" variant="outline" size="small" onClick={onClick} />
      </div>
    </li>
  );
};

export default ProductManagementList;
