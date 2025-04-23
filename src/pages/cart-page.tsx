import { Suspense } from "react";
import { CartItem } from "../services/interface";
import { UserContextType, useUserHook } from "../context/user-context";
import { isUserDataValid } from "../utils/isUserDataValid";
import { UnAuthorizedLoginComponent } from "../components/unauthorized-login-component";
import { useGetProducts } from "../services/product-service";
import { ErrorComponent } from "../components/error-component";
import { ListComponent } from "../components/list-component";
import { CartItemTemplate } from "../components/cart-item-template";
import { Link } from "react-router";

export const CartPage = () => {
  const {
    loggedInUser: userData,
    setCartItems,
    cartItems,
  } = useUserHook() as UserContextType;

  if (!isUserDataValid(userData)) {
    return <UnAuthorizedLoginComponent />;
  }

  const getProducts = useGetProducts();
  if (getProducts.isLoading) {
    return <span aria-live="polite">Loading...</span>;
  }

  if (getProducts.isError) {
    return <ErrorComponent errorMessage={`${getProducts.error?.message}`} />;
  }

  const handleModifyQuantity = (productId: number, value: number) => {
    console.log("clicked", productId, value);
    try {
      setCartItems(
        cartItems.map((cartItem) => {
          if (cartItem.productId === productId) {
            cartItem.quantity = value;
          }

          return cartItem;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="product-list" id="product-list">
        <ListComponent
          data={cartItems}
          emptyMessage="No Items, Please goto shopping page and add items to the cart"
          footer={
            <Link to="/product-list">Go to shopping page click here</Link>
          }
          header="List Of Items In The Cart"
          itemTemplate={(cartItem: CartItem) =>
            CartItemTemplate({
              cartItem,
              products: getProducts.data ?? [],
              handleModifyQuantity,
              userId: userData.userId,
            })
          }
        />
      </div>
    </Suspense>
  );
};
