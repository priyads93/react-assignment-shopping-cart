import { InputNumber } from "primereact/inputnumber";
import { CartItem, ProductResponse } from "../services/interface";
import { ErrorComponent } from "./error-component";
import { ImageComponent } from "./image-component";
import { RatingComponent } from "./rating-component";
import { UnAuthorizedLoginComponent } from "./unauthorized-login-component";

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
    (product) => product.productId === cartItem.productId
  );
  if (!userId) {
    return <UnAuthorizedLoginComponent />;
  }
  if (!selectedProduct) {
    return <ErrorComponent errorMessage="Some of the products are not valid" />;
  }
  return (
    <div className="list-item">
      <div className="list-item-image" id="list-item-image">
        <ImageComponent
          height="60"
          loading="lazy"
          src={selectedProduct.imageUrl}
          width="60"
        />
      </div>
      <div className="list-item-details">
        <h3 style={{ margin: "0" }}>{selectedProduct.name}</h3>
        <p>{selectedProduct.description}</p>
        <RatingComponent rating={selectedProduct.rating} />
        <span className="list-item-category">
          <i className="pi pi-tag product-category-icon" />
          <span>{selectedProduct.categoryType}</span>
        </span>
      </div>
      <div className="list-item-button">
        <span>${selectedProduct.price}</span>

        <InputNumber
          buttonLayout="vertical"
          decrementButtonIcon="pi pi-minus"
          incrementButtonIcon="pi pi-plus"
          onValueChange={(e) =>
            handleModifyQuantity(
              selectedProduct.productId,
              e.value ?? cartItem.quantity
            )
          }
          showButtons
          style={{ width: "2rem", alignContent:"center" }}
          value={cartItem.quantity}
        />
      </div>
    </div>
  );
};
