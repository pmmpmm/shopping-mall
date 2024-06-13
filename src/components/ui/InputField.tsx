import { SetStateAction } from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  setValue?: React.Dispatch<SetStateAction<string | object>>;
  setFile?: React.Dispatch<SetStateAction<FileList | undefined | null>>;
  setOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ label, name, setValue, setFile, setOnChange, className, ...otherProps }: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
      <input
        name={name}
        id={name}
        onChange={(e) => {
          if (setValue) {
            setValue(e.target.value);
          } else if (setFile && e.target.files) {
            setFile(e.target.files);
          } else if (setOnChange) {
            setOnChange(e);
          }
        }}
        className={`h-12 px-3 py-2.5 bg-inherit border border-solid border-gray-200 rounded-md ${className}`}
        {...otherProps}
      />
    </div>
  );
};

export default InputField;
