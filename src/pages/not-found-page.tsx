import { Message } from "primereact/message";

export const NotFoundPage = () => {
  return (
    <Message
      aria-live="polite"
      severity="error"
      text="Page Not Found"
    />
  );
};
