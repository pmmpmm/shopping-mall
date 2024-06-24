import { useNavigate } from "react-router-dom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  variant: "contain" | "outline";
  size?: "small" | "medium" | "large" | "full";
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
  className?: string;
  // 추후 삭제
  // onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ title, variant, size, onClick, disabled, href, className, ...otherProps }: ButtonProps) => {
  const navigate = useNavigate();
  let style = "text-base leading-none border border-solid box-border rounded-md whitespace-nowrap ";

  switch (size) {
    case "small":
      style += "px-3 py-[12px] text-sm ";
      break;
    case "medium":
      style += "px-4 py-[16px] text-sm ";
      break;
    case "large":
      style += "px-6 py-[18px] font-medium ";
      break;
    case "full":
      style += "px-6 py-[18px] w-full font-medium ";
      break;
  }

  switch (variant) {
    case "contain":
      style += "text-white bg-neutral-800 border-neutral-800 disabled:bg-neutral-600 disabled:border-neutral-600 ";
      break;
    case "outline":
      style += "border-neutral-700 ";
      break;
  }

  if (href) {
    return (
      <button
        className={`${style} ${className}`}
        disabled={disabled}
        onClick={() => {
          onClick && onClick();
          navigate(href);
        }}
        {...otherProps}
      >
        {title}
      </button>
    );
  }
  return (
    <button className={`${style} ${className}`} disabled={disabled} onClick={onClick} {...otherProps}>
      {title}
    </button>
  );
};

export default Button;
