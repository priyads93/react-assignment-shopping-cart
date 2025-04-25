/**
 * A React functional component that renders a styled label element.
 *
 * @param {Object} props - The props object.
 * @param {string} props.label - The text to display inside the label. It is also used as the `htmlFor` attribute value.
 *
 * @returns {JSX.Element} A label element with the provided text and styling.
 */
export const LabelComponent = ({ label }: { label: string }) => {
  const splitNames = label.split(".");
  const labelName =
    splitNames.length > 0
      ? label.split(".")[splitNames.length - 1]
      : splitNames[0];
  return (
    <label htmlFor={label}>
      {labelName.charAt(0).toUpperCase() + labelName.slice(1)}
    </label>
  );
};
