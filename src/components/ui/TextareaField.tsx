import FieldLabel from "@/components/ui/FieldLabel";

interface TextareaFieldProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  setOnChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  cols: number;
  rows: number;
}

const TextareaField = ({
  label,
  name,
  setValue,
  setOnChange,
  className,
  cols,
  rows,
  ...otherProps
}: TextareaFieldProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <FieldLabel htmlFor={name} title={label} />
      <textarea
        name={name}
        id={name}
        onChange={(e) => {
          if (setValue) {
            setValue(e.target.value);
          } else if (setOnChange) {
            setOnChange(e);
          }
        }}
        className={`px-3 py-2.5 bg-inherit border border-solid border-gray-200 rounded-md ${className}`}
        cols={cols}
        rows={rows}
        {...otherProps}
      />
    </div>
  );
};

export default TextareaField;
