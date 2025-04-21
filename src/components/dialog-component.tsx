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
  visible,
  handleSetVisible,
}: {
  children: React.ReactNode;
  header: string;
  visible: boolean;
  handleSetVisible: () => void;
}) => {
  return (
    <Dialog
      header={header}
      visible={visible}
      style={{ width: "50vw" }}
      onHide={handleSetVisible}
    >
      {children}
    </Dialog>
  );
};

export default DialogComponent;
