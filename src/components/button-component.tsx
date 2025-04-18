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
}: {
  disabled: boolean;
  buttonLabel: string;
  type: "submit" | "button";
  onClick?: () => void;
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
