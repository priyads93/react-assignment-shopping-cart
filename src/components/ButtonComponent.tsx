import { classNames } from "../utils/classNames";

const ButtonComponent = ({
  disabled,
  buttonLabel,
  type,
  onClick,
  className
}: {
  disabled: boolean;
  buttonLabel: string;
  type: "submit" | "button";
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={className ?? classNames.button}
      onClick={onClick}
    >
      {buttonLabel}
    </button>
  );
};

export default ButtonComponent;
