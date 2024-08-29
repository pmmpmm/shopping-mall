import WrapperLayoutA from "@/components/layouts/WrapperLayoutA";
import Header from "@/components/features/Header";
import CategoryNav from "@/components/features/CategoryNav";

interface LayoutAProps {
  children: React.ReactNode;
}
//추후 삭제
//<WrapperLayoutA className="border-b border-solid border-gray-200">
const LayoutA = ({ children }: LayoutAProps) => {
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
