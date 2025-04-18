import { Button } from "primereact/button";

export const ButtonComponent = ({
  disabled,
  buttonLabel,
  type,
  onClick,
}: {
  disabled: boolean;
  buttonLabel: string;
  type: "submit" | "button";
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      type={type}
      style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
    >
      {buttonLabel}
    </Button>
  );
};
