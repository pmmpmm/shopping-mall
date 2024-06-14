interface FieldFormBlockProps {
  className: string;
  children: React.ReactNode;
}

const FieldFormBlock = ({ className, children }: FieldFormBlockProps) => {
  return <div className={`m-auto bg-white p-14 shadow-form-block ${className}`}>{children}</div>;
};

export default FieldFormBlock;
