import { ProductResponse, UserResponse } from "../services/interface";
import { ReactNode } from "react";
import { UnAuthorizedLoginComponent } from "./unauthorized-login-component";
import ListItemComponent from "./list-item-component";

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
    id,
  }: ProductResponse,
  { accountType }: UserResponse,
  handleUpdateClick: (productId: number) => void,
  handleAddToCartClick: (productId: number) => void
): ReactNode => {
  if (!userId) {
    return <UnAuthorizedLoginComponent />;
  }
  function handleUpdateButtonClick() {
    handleUpdateClick(id);
  }

  function handleAddToCartButtonClick() {
    handleAddToCartClick(id);
  }
  return (
    <ListItemComponent
      imageUrl={imageUrl}
      name={name}
      description={description}
      categoryType={categoryType}
      price={price}
      id={id}
      rating={rating}
      accountType={accountType}
      handleAddToCartButtonClick={handleAddToCartButtonClick}
      handleUpdateButtonClick={handleUpdateButtonClick}
      quantity={quantity}
      severityData={getInventoryAndSeverityData(quantity)}
    />
  );
};
