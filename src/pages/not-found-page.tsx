import { Message } from "primereact/message";

export const NotFoundPage = () => {
  return (
    <Message
      aria-live="polite"
      severity="error"
      style={{ color: "red", fontSize: "small", fontStyle: "italic" }}
      text={"Page Not Found"}
    />
  );
};
