import { DataScroller } from "primereact/datascroller";
import { Card } from "primereact/card";
import { UseQueryResult } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ErrorComponent } from "./error-component";

/**
 * A generic React component that renders a list of items using a provided template.
 * It supports loading, error handling, and customizable headers, footers, and empty messages.
 *
 * @template T - The type of the items in the list.
 *
 * @param {Object} props - The properties for the ListComponent.
 * @param {(item: T) => React.ReactNode | undefined} props.itemTemplate - A function that defines how each item in the list should be rendered.
 * @param {UseQueryResult<any, Error>} props.listQuery - A React Query object that provides the data, loading, and error states for the list.
 * @param {string} props.header - The header text to display above the list.
 * @param {string} props.emptyMessage - The message to display when the list is empty.
 * @param {ReactNode} props.footer - The footer content to display below the list.
 *
 * @returns {JSX.Element} A React element that renders the list or appropriate loading/error messages.
 */
export const ListComponent = <T,>({
  itemTemplate,
  listQuery,
  header,
  footer,
  emptyMessage,
}: {
  itemTemplate: (item: T) => React.ReactNode | undefined;
  listQuery: UseQueryResult<any, Error>;
  header: string;
  emptyMessage: string;
  footer: ReactNode;
}) => {
  const { data, isLoading, isError, error } = listQuery;
  if (isLoading) {
    return <span aria-live="polite">Loading...</span>;
  }

  if (isError) {
    return <ErrorComponent errorMessage={error.message}/>;
  }

  return (
    <Card>
      <DataScroller
        value={data}
        itemTemplate={itemTemplate}
        lazy
        emptyMessage={emptyMessage}
        footer={footer}
        header={header}
      />
    </Card>
  );
};
