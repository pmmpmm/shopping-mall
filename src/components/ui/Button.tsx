import { Link } from "react-router-dom";

interface ButtonProps {
  title: string;
  variant: "contain" | "outline";
  size: "small" | "medium" | "large" | "full";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  position?: "bottom";
  disabled?: boolean;
  href?: string;
}

const Button = ({ title, variant, size, onClick, position, disabled, href }: ButtonProps) => {
  let style = "leading-none ";

  switch (size) {
    case "small":
      style += "px-3 py-[12px] ";
      break;
    case "medium":
      style += "px-4 py-[16px] ";
      break;
    case "large":
      style += "px-6 py-[18px] ";
      break;
    case "full":
      style += "px-6 py-[18px] w-full ";
      break;
  }

  switch (variant) {
    case "contain":
      style +=
        "text-base text-white font-medium bg-neutral-800 border border-solid border-neutral-800 rounded-md disabled:bg-neutral-600 disabled:border-neutral-600 ";
      break;
    case "outline":
      style += "font-medium border border-solid border-main-700 box-border rounded-md ";
      break;
  }

  switch (position) {
    case "bottom":
      style += "mt-6";
      break;
  }

  if (href) {
    return (
      <Link to={href}>
        <button type="button" className={style} disabled={disabled} onClick={onClick}>
          {title}
        </button>
      </Link>
    );
  }
  return (
    <button type="button" className={style} disabled={disabled} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
