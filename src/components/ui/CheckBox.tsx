interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox = ({ id, name, value, onChange, checked, ...otherProps }: CheckBoxProps) => {
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        value={value}
        name={name}
        onChange={onChange}
        checked={checked}
        {...otherProps}
        className="align-middle cursor-pointer"
      />
      <label htmlFor={id} className="pl-1 align-middle cursor-pointer">
        {value}
      </label>
    </div>
  );
};

export default CheckBox;
