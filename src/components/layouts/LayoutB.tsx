import { useEffect } from "react";
import WrapperLayoutA from "@/components/layouts/WrapperLayoutA";
import Header from "@/components/features/Header";

interface LayoutBProps {
  children: React.ReactNode;
}

const LayoutB = ({ children }: LayoutBProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
