import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";

/**
 * A functional component that renders a menu bar using the provided menu items and optional start and end elements.
 *
 * @param {Object} props - The props object for the component.
 * @param {MenuItem[]} props.menuItems - An array of menu items to be displayed in the menu bar.
 * @param {string} props.id - A unique identifier for the menu bar.
 * @param {React.ReactNode} [props.start] - Optional content to be displayed at the start of the menu bar.
 * @param {React.ReactNode} [props.end] - Optional content to be displayed at the end of the menu bar.
 *
 * @returns {JSX.Element} The rendered menu bar component.
 */
export const MenuBarComponent = ({
  menuItems,
  id,
  start,
  end,
}: {
  menuItems: MenuItem[];
  id: string;
  start?: React.ReactNode;
  end?: React.ReactNode;
}) => {
  return (
    <>
      <Menubar id={id} start={start} end={end} model={menuItems}></Menubar>
    </>
  );
};
