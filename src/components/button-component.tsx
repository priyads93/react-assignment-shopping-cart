import { Button } from "primereact/button";

/**
 * A reusable button component that renders a styled button element.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} props.disabled - Determines if the button is disabled.
 * @param {string} props.buttonLabel - The text to display inside the button.
 * @param {"submit" | "button"} props.type - The type of the button, either "submit" or "button".
 * @param {() => void} [props.onClick] - Optional click event handler for the button.
 *
 * @returns {JSX.Element} A styled button element.
 */
export const ButtonComponent = ({
  disabled,
  buttonLabel,
  type,
  onClick,
  icon,
  id,
}: {
  disabled: boolean;
  buttonLabel: string;
  id?: string;
  type: "submit" | "button";
  onClick?: (e?: any) => void;
  icon?: string;
  itemId?: string;
}) => {
  return (
    <Button
      disabled={disabled}
      icon={icon}
      id={id}
      onClick={onClick}
      style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
      type={type}
    >
      {buttonLabel}
    </Button>
  );
};
