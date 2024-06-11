interface WrapperLayoutA {
  children: React.ReactNode;
  className?: string;
}

const WrapperLayoutA = ({ children, className }: WrapperLayoutA) => {
  return (
    <div className={`w-full min-w-[1024px] ${className ?? ""}`}>
      <div className="w-full min-w-[1024px] max-w-[1280px] m-auto px-layout-A">{children}</div>
    </div>
  );
};

export default WrapperLayoutA;
