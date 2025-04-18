import { MenuItem } from "primereact/menuitem";
import { SplitButton } from "primereact/splitbutton";
import { CSSProperties } from "react";

/**
 * A React functional component that renders a split button with customizable menu items, label, and styles.
 *
 * @param {Object} props - The properties object.
 * @param {MenuItem[]} props.menuItems - An array of menu items to be displayed in the split button's dropdown menu.
 * @param {string} props.label - The label text displayed on the split button.
 * @param {CSSProperties} [props.menuStyle] - Optional custom styles for the dropdown menu.
 * @param {CSSProperties} [props.style] - Optional custom styles for the split button.
 *
 * @returns {JSX.Element} A JSX element representing the split button component.
 */
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
