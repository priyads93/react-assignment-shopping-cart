import { classNames } from "../utils/class-names";

/**
 * A functional React component that displays an error message.
 *
 * @param {Object} props - The props object.
 * @param {string} [props.errorMessage] - The error message to display.
 * If undefined or empty, the component renders nothing.
 *
 * @returns {JSX.Element | null} A paragraph element containing the error message
 */
export const ErrorComponent = ({ errorMessage }: { errorMessage?: string }) => {
  // Check if the error message is empty or undefined
  // If it is, return null to avoid rendering anything
  // Otherwise, render the error message
  // with the specified styles
  // and return it
  if (!errorMessage) return null;
  return (
    <p aria-live="polite" className={classNames.errorMessage}>
      {errorMessage}
    </p>
  );
};
