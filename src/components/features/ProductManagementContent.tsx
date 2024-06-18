import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import ContentTitle from "@/components/ui/ContentTitle";
import Button from "../ui/Button";

const ProductManagementContent = () => {
  return (
    <ContentLayoutA>
      <ContentTitle title="상품 관리" />
      <div>
        <div className="flex justify-end">
          <Button title="상품 등록" variant="contain" size="small" href="/product-management/create" />
        </div>
        <ul className="flex flex-col">
          <li>list</li>
          <li>list</li>
        </ul>
      </div>
    </ContentLayoutA>
  );
};

export default ProductManagementContent;
