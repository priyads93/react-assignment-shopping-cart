/**
 * A functional component that displays a toast message with a title and optional text.
 *
 * @param {Object} props - The props for the ToastComponent.
 * @param {string} props.title - The title of the toast message. This is a required field.
 * @param {string} [props.text] - The optional text content of the toast message.
 * @returns {JSX.Element} A JSX element representing the toast message.
 */
export const ToastComponent = ({
  title,
  text,
}: {
  title: string;
  text?: string;
}) => {
  return (
    <div>
      <h6>{title}</h6>
      {text ? <p>{text}</p> : null}
    </div>
  );
};
