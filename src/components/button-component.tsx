import { classNames } from "../utils/class-names";

export const ButtonComponent = ({
  disabled,
  buttonLabel,
  type,
  onClick,
  className,
}: {
  disabled: boolean;
  buttonLabel: string;
  type: "submit" | "button";
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <button
      className={className ?? classNames.button}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {buttonLabel}
    </button>
  );
};
