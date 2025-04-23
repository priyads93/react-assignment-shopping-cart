import { Image } from "primereact/image";

/**
 * A React functional component for rendering an image with specified properties.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.src - The source URL of the image.
 * @param {string} props.width - The width of the image.
 * @param {string} props.height - The height of the image.
 * @param {"eager" | "lazy"} props.loading - The loading behavior of the image.
 *   - "eager": Load the image immediately.
 *   - "lazy": Defer loading the image until it is visible in the viewport.
 *
 * @returns {JSX.Element} A JSX element containing the image.
 */
export const ImageComponent = ({
  src,
  width,
  height,
  loading = "lazy"
}: {
  src: string;
  width: string;
  height: string;
  loading: "eager" | "lazy"
}) => {
  return (
    <div>
      <Image alt="Image" height={height} loading={loading} preview src={src} width={width} />
    </div>
  );
};
