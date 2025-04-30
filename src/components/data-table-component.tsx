import { Column } from "primereact/column";
import { DataTable, DataTableValueArray } from "primereact/datatable";

export type DataTableProps<T extends DataTableValueArray> = {
  data: T;
  columns: { key: string; field: string; header: string }[];
};

/**
 * A generic DataTable component that renders a table with dynamic data and columns.
 * 
 * @template T - A type that extends `DataTableValueArray`, representing the structure of the data.
 * 
 * @param {DataTableProps<T>} props - The properties for the DataTableComponent.
 * @param {T} props.data - The array of data to be displayed in the table.
 * @param {Array<{ key: string; field: string; header: string }>} props.columns - The column definitions for the table,
 * including a unique key, the field name in the data, and the header text.
 * 
 * @returns {JSX.Element} A rendered DataTable component with the specified data and columns.
 */
export const DataTableComponent = <T extends DataTableValueArray,>({
  data,
  columns,
}: DataTableProps<T>) => {
  return (
    <DataTable value={data}>
      {columns.map((col) => (
        <Column key={col.key} field={col.field} header={col.header} />
      ))}
    </DataTable>
  );
};
