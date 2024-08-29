import FieldLabel from "@/components/ui/FieldLabel";

interface FormGroupProps {
  children: React.ReactNode;
  direction: string;
  label?: string;
}

const FormGroup = ({ children, direction, label }: FormGroupProps) => {
  return (
    <fieldset className="flex flex-col gap-y-1">
      {label && <FieldLabel title={label} />}
      <div className={`flex flex-wrap flex-${direction} gap-x-4 gap-y-2 py-1`}>{children}</div>
    </fieldset>
  );
};

export default FormGroup;
