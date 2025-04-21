import { ButtonComponent } from "./button-component";
import { RatingComponent } from "./rating-component";
import { TagComponent } from "./tag-component";
import { Product } from "../services/interface";
import { ReactNode } from "react";
import { ImageComponent } from "./image-component";

const getInventoryAndSeverityData = (
  product: Product
): {
  inventoryStatus: string;
  severity: "success" | "warning" | "danger" | null;
} => {
  if (product.quantity === 0) {
    return {
      inventoryStatus: "Out Of Stock",
      severity: "danger",
    };
  } else if (product.quantity < 2) {
    return {
      inventoryStatus: "Low Stock",
      severity: "warning",
    };
  } else if (product.quantity > 2) {
    return {
      inventoryStatus: "In Stock",
      severity: "success",
    };
  } else {
    return {
      inventoryStatus: "",
      severity: null,
    };
  }
};

/**
 * Renders a product item template for displaying product details in a shopping cart application.
 *
 * @param {Product} product - The product object containing details to be displayed.
 * @returns {ReactNode} A ReactNode representing the product item template.
 *
 */
export const ProductItemTemplate = ({
  imageUrl,
  name,
  description,
  rating,
  price,
  quantity,
  categoryType,
  userId,
}: Product): ReactNode => {
  return (
    <div id="list-item" className="list-item">
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignContent: "center",
          padding: "0.5rem",
        }}
      >
        <ImageComponent height="60" width="60" loading="lazy" src={imageUrl} />
      </div>
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "0.5rem",
        }}
      >
        <h3 style={{ margin: "0" }}>{name}</h3>
        <p>{description}</p>
        <RatingComponent rating={rating} />
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            margin: "0.5rem 0.5rem 0.5rem 0",
          }}
        >
          <i className="pi pi-tag product-category-icon" />
          <span>{categoryType}</span>
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "0.5rem",
        }}
      >
        <span>${price}</span>
        <ButtonComponent
          icon="pi pi-shopping-cart"
          buttonLabel="Add to Cart"
          disabled={quantity === 0}
          type="submit"
        />
        <TagComponent
          data={getInventoryAndSeverityData({
            imageUrl,
            quantity,
            rating,
            name,
            categoryType,
            description,
            price,
            userId,
          })}
        />
      </div>
    </div>
  );
};
