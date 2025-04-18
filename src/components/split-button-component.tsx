import { MenuItem } from "primereact/menuitem";
import { SplitButton } from "primereact/splitbutton";
import { CSSProperties } from "react";

export const SplitButtonComponent = ({
  menuItems,
  label,
  menuStyle,
  style,
}: {
  menuItems: MenuItem[];
  label: string;
  menuStyle?: CSSProperties;
  style?: CSSProperties;
}) => {
  return (
    <>
      <SplitButton
        menuStyle={menuStyle}
        style={style}
        label={label}
        model={menuItems}
      />
    </>
  );
};
