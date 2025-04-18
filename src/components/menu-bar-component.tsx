import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";

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
