interface FieldFormProps {
  children: React.ReactNode;
}

const FieldForm = ({ children }: FieldFormProps) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};

export default FieldForm;
