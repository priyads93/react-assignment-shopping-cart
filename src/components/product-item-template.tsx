import { ButtonComponent } from "./button-component";
import { RatingComponent } from "./rating-component";
import { TagComponent } from "./tag-component";
import { AccountType, Product, UserResponse } from "../services/interface";
import { ReactNode } from "react";
import { ImageComponent } from "./image-component";
import { UnAuthorizedLoginComponent } from "./unauthorized-login-component";
import { useQueryClient } from "@tanstack/react-query";

const getInventoryAndSeverityData = (
  quantity: number
): {
  inventoryStatus: string;
  severity: "success" | "warning" | "danger" | null;
} => {
  if (quantity === 0) {
    return { inventoryStatus: "Out Of Stock", severity: "danger" };
  }
  if (quantity < 2) {
    return { inventoryStatus: "Low Stock", severity: "warning" };
  }
  return { inventoryStatus: "In Stock", severity: "success" };
};

/**
 * Renders a product item template for displaying product details in a shopping cart application.
 *
 * @param {Product} product - The product object containing details to be displayed.
 * @returns {ReactNode} A ReactNode representing the product item template.
 *
 */
export const ProductItemTemplate = (
  {
    imageUrl,
    name,
    description,
    rating,
    price,
    quantity,
    categoryType,
    userId,
  }: Product,
  { accountType }: UserResponse
): ReactNode => {
  if (!userId) {
    return <UnAuthorizedLoginComponent />;
  }
  return (
    <div id="list-item" className="list-item">
      <div id="list-item-image" className="list-item-image">
        <ImageComponent height="60" width="60" loading="lazy" src={imageUrl} />
      </div>
      <div className="list-item-details">
        <h3 style={{ margin: "0" }}>{name}</h3>
        <p>{description}</p>
        <RatingComponent rating={rating} />
        <span className="list-item-category">
          <i className="pi pi-tag product-category-icon" />
          <span>{categoryType}</span>
        </span>
      </div>
      <div className="list-item-button">
        <span>${price}</span>
        {accountType === AccountType.seller && (
          <ButtonComponent
            buttonLabel="Update Item"
            disabled={false}
            type="submit"
          />
        )}
        {accountType === AccountType.buyer && (
          <ButtonComponent
            icon="pi pi-shopping-cart"
            buttonLabel="Add to Cart"
            disabled={quantity === 0}
            type="submit"
          />
        )}
        <TagComponent data={getInventoryAndSeverityData(quantity)} />
      </div>
    </div>
  );
};
