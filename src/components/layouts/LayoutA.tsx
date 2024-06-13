import WrapperLayoutA from "@/components/layouts/WrapperLayoutA";
import Header from "@/components/features/Header";
import CategoryNav from "@/components/features/CategoryNav";

interface LayoutAProps {
  children: React.ReactNode;
}

const LayoutA = ({ children }: LayoutAProps) => {
  return (
    <>
      <WrapperLayoutA>
        <Header />
      </WrapperLayoutA>

      <WrapperLayoutA className="border-b border-solid border-gray-100">
        <CategoryNav />
      </WrapperLayoutA>

      <WrapperLayoutA>{children}</WrapperLayoutA>
    </>
  );
};

export default LayoutA;
