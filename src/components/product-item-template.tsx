import { ButtonComponent } from "./button-component";
import { RatingComponent } from "./rating-component";
import { TagComponent } from "./tag-component";
import {
  AccountType,
  ProductResponse,
  UserResponse,
} from "../services/interface";
import { ReactNode } from "react";
import { ImageComponent } from "./image-component";
import { UnAuthorizedLoginComponent } from "./unauthorized-login-component";

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
    userUserId,
    productId,
  }: ProductResponse,
  { accountType }: UserResponse,
  handleUpdateClick: (productId: number) => void,
  handleAddToCartClick: (productId: number) => void
): ReactNode => {
  if (!userUserId) {
    return <UnAuthorizedLoginComponent />;
  }
  function handleUpdateButtonClick() {
    handleUpdateClick(productId);
  }

  function handleAddToCartButtonClick() {
    handleAddToCartClick(productId);
  }
  return (
    <div className="list-item" id={`${productId}`}>
      <div className="list-item-image" id="list-item-image">
        <ImageComponent height="60" loading="lazy" src={imageUrl} width="60" />
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
        {accountType === AccountType.seller ? (
          <ButtonComponent
            buttonLabel="Update Item"
            disabled={false}
            id={`${productId}`}
            onClick={handleUpdateButtonClick}
            type="submit"
          />
        ) : null}
        {accountType === AccountType.buyer ? (
          <ButtonComponent
            buttonLabel="Add to Cart"
            disabled={quantity === 0}
            icon="pi pi-shopping-cart"
            id={`${productId}`}
            onClick={handleAddToCartButtonClick}
            type="submit"
          />
        ) : null}
        <TagComponent data={getInventoryAndSeverityData(quantity)} />
      </div>
    </div>
  );
};
