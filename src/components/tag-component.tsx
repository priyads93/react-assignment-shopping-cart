import { Tag } from "primereact/tag";

/**
 * A functional component that renders a `Tag` element with specific properties.
 *
 * @param {Object} props - The props object.
 * @param {Object} props.data - The data object containing tag information.
 * @param {string} props.data.inventoryStatus - The text value to display inside the tag.
 * @param {"success" | "warning" | "danger" | null} props.data.severity - The severity level of the tag, which determines its styling.
 *
 * @returns {JSX.Element} A `Tag` component with the provided value, severity, and rounded styling.
 */
export const TagComponent = ({
  data,
}: {
  data: {
    inventoryStatus: string;
    severity: "success" | "warning" | "danger" | null;
  };
}) => {
  return <Tag value={data.inventoryStatus} severity={data.severity} rounded></Tag>;
};
