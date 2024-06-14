import WrapperLayoutA from "@/components/layouts/WrapperLayoutA";
import Header from "@/components/features/Header";

interface LayoutBProps {
  children: React.ReactNode;
}

const LayoutB = ({ children }: LayoutBProps) => {
  return (
    <>
      <WrapperLayoutA className="border-b border-solid border-gray-200">
        <Header />
      </WrapperLayoutA>

      <WrapperLayoutA>{children}</WrapperLayoutA>
    </>
  );
};

export default LayoutB;
