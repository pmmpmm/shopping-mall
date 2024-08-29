import { useEffect } from "react";
import WrapperLayoutA from "@/components/layouts/WrapperLayoutA";
import Header from "@/components/features/Header";
import CategoryNav from "@/components/features/CategoryNav";

interface LayoutAProps {
  children: React.ReactNode;
}
const LayoutA = ({ children }: LayoutAProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="pb-12">
      <WrapperLayoutA className="pb-5">
        <Header />
      </WrapperLayoutA>

      <WrapperLayoutA>
        <CategoryNav path="/products?category" />
      </WrapperLayoutA>

      <WrapperLayoutA>{children}</WrapperLayoutA>
    </div>
  );
};

export default LayoutA;
