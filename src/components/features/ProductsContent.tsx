import { useLocation } from "react-router-dom";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";

const ProductsContent = () => {
  const { search } = useLocation();
  const category = new URLSearchParams(search).get("category") as string;

  return (
    <ContentLayoutA>
      <p>ProductsContent</p>
    </ContentLayoutA>
  );
};

export default ProductsContent;
