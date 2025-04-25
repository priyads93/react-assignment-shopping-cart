import { CartItem, ProductResponse } from "../services/interface";
import { ErrorComponent } from "./error-component";
import { UnAuthorizedLoginComponent } from "./unauthorized-login-component";
import ListItemComponent from "./list-item-component";

type CartItemTemplateProps = {
  cartItem: CartItem;
  products: ProductResponse[];
  userId: number;
  handleModifyQuantity: (productId: number, value: number) => void;
};

export const CartItemTemplate = ({
  cartItem,
  products,
  userId,
  handleModifyQuantity,
}: CartItemTemplateProps) => {
  const selectedProduct = products?.find(
    (product) => product.id === cartItem.productId
  );
  if (!userId) {
    return <UnAuthorizedLoginComponent />;
  }
  if (!selectedProduct) {
    return <ErrorComponent errorMessage="Some of the products are not valid" />;
  }
  return (
    <ListItemComponent
      imageUrl={selectedProduct.imageUrl}
      name={selectedProduct.name}
      description={selectedProduct.description}
      categoryType={selectedProduct.categoryType}
      rating={selectedProduct.rating}
      price={selectedProduct.price}
      quantity={cartItem.quantity}
      handleModifyQuantity={handleModifyQuantity}
      id={selectedProduct.id}
    />
  );
};
