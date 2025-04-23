import { Dialog } from "primereact/dialog";

/**
 * A reusable dialog component that wraps the PrimeReact `Dialog` component.
 * It displays a modal dialog with a customizable header and content.
 *
 * @param children - The content to be displayed inside the dialog.
 * @param header - The title or header text of the dialog.
 * @param visible - A boolean indicating whether the dialog is visible or not.
 */
const DialogComponent = ({
  children,
  header,
  isVisible,
  handleSetVisible,
}: {
  children: React.ReactNode;
  header: string;
  isVisible: boolean;
  handleSetVisible: () => void;
}) => {
  return (
    <Dialog
      header={header}
      onHide={handleSetVisible}
      style={{ width: "50vw" }}
      visible={isVisible}
    >
      {children}
    </Dialog>
  );
};

export default DialogComponent;
