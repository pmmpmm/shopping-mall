interface FieldFormProps {
  children: React.ReactNode;
}

const FieldForm = ({ children }: FieldFormProps) => {
  return <div className="flex flex-col gap-5 w-full">{children}</div>;
};

export default FieldForm;
