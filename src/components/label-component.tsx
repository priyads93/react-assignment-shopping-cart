import { classNames } from "../utils/class-names";

/**
 * A React functional component that renders a styled label element.
 *
 * @param {Object} props - The props object.
 * @param {string} props.label - The text to display inside the label. It is also used as the `htmlFor` attribute value.
 *
 * @returns {JSX.Element} A label element with the provided text and styling.
 */
export const LabelComponent = ({ label }: { label: string }) => {
  return (
    <label className={classNames.label} htmlFor={label}>
      {label.charAt(0).toUpperCase() + label.slice(1)}
    </label>
  );
};
