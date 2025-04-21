import { Rating } from "primereact/rating";

/**
 * A React functional component that displays a rating using the `Rating` component.
 *
 * @param {Object} props - The props object.
 * @param {number} [props.rating] - The rating value to display. Defaults to `undefined`.
 *
 * @returns {JSX.Element} A JSX element containing the `Rating` component with the specified value.
 *
 */
export const RatingComponent = ({ rating }: { rating?: number }) => {
  return (
    <div>
      <Rating value={rating} readOnly cancel={false}></Rating>
    </div>
  );
};
