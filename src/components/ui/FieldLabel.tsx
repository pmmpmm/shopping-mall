interface FieldLabelProps {
  htmlFor?: string;
  title: string;
}

const FieldLabel = ({ htmlFor, title }: FieldLabelProps) => {
  return (
    <label htmlFor={htmlFor} className="text-[15px]">
      {title}
    </label>
  );
};

export default FieldLabel;
