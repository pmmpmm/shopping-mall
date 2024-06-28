interface ContentBlockAProps {
  className: string;
  children: React.ReactNode;
}

const ContentBlockA = ({ className, children }: ContentBlockAProps) => {
  return <div className={`m-auto bg-white p-14 shadow-form-block ${className}`}>{children}</div>;
};

export default ContentBlockA;
