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
    <>
      <WrapperLayoutA>
        <Header />
      </WrapperLayoutA>

      <WrapperLayoutA>
        <CategoryNav />
      </WrapperLayoutA>

      <WrapperLayoutA>{children}</WrapperLayoutA>
    </>
  );
};

export default LayoutA;
