import FieldLabel from "@/components/ui/FieldLabel";
import { forwardRef } from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  setFile?: React.Dispatch<React.SetStateAction<FileList | undefined | null>>;
  setOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, name, setValue, setFile, setOnChange, onFocus, onBlur, className, ...otherProps }, ref) => {
    return (
      <div className="flex flex-col gap-y-2 w-full">
        <FieldLabel htmlFor={name} title={label} />
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
          className={`h-13 px-3 py-2.5 bg-inherit border border-solid border-gray-200 rounded-md ${className}`}
          {...otherProps}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={ref}
        />
      </div>
    );
  }
);

export default InputField;
