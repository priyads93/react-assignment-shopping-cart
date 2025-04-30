import { Suspense } from "react";
import {
  CartItem,
  CartItemResponse,
  CreateOrder,
  OrderResponse,
  OrderStatus,
  PaymentMode,
  ProductResponse,
} from "../services/interface";
import { UserContextType, useUserHook } from "../context/user-context";
import { isUserDataValid } from "../utils/isUserDataValid";
import { UnAuthorizedLoginComponent } from "../components/unauthorized-login-component";
import { useGetProducts } from "../services/product-service";
import { ErrorComponent } from "../components/error-component";
import { ListComponent } from "../components/list-component";
import { CartItemTemplate } from "../components/cart-item-template";
import { Link, useNavigate } from "react-router";
import { ButtonComponent } from "../components/button-component";
import { useCreateOrder } from "../services/order-service";
import { toast } from "react-toastify";
import { ToastComponent } from "../components/toast-component";
import { DefaultError, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../utils/queryKeys";
import {
  useDeleteCartItem,
  useUpdateCartItem,
} from "../services/cart-item-service";

export const CartPage = () => {
  const {
    loggedInUser: userData,
    setCartItems,
    cartItems,
  } = useUserHook() as UserContextType;

  const { mutateAsync: mutateAsyncCreateOrder } = useCreateOrder();
  const { mutateAsync: mutateAsyncUpdateCartItem } = useUpdateCartItem();
  const { mutateAsync: mutateAsyncDeleteCartItem } = useDeleteCartItem();
  const navigate = useNavigate();
  const getProducts = useGetProducts();
  const queryClient = useQueryClient();

  if (!isUserDataValid(userData)) {
    return <UnAuthorizedLoginComponent />;
  }

  if (getProducts.isLoading) {
    return <span aria-live="polite">Loading...</span>;
  }

  if (getProducts.isError) {
    return <ErrorComponent errorMessage={`${getProducts.error?.message}`} />;
  }

  const productsData: ProductResponse[] = getProducts?.data ?? [];

  //create order and order items
  const handlePlaceOrder = async () => {
    try {
      await getProducts.refetch();
      //validate cart items
      const productsValid = cartItems.every((cartItem) => {
        const product = productsData.find(
          (item) => item.id === cartItem.productId
        );
        if (!product || product.quantity < cartItem.quantity) {
          return false;
        }
        return true;
      });
      if (!productsValid) {
        throw new Error(
          "All products aren't available to checkout, please check the cart items against the available quantity."
        );
      }
      const totalCost = cartItems.reduce((acc: number, currValue: CartItem) => {
        const productPrice =
          productsData.find(
            (item: ProductResponse) => item.id === currValue.productId
          )?.price ?? 0;

        return (acc = acc + productPrice * currValue.quantity);
      }, 0);
      //create order items
      const orderData: CreateOrder = {
        description: "",
        orderStatus: OrderStatus.CREATED,
        paymentMode: PaymentMode.OFFLINE,
        userId: userData.id,
        totalCost,
        orderItems: cartItems.map((item) => {
          return { productId: item.productId, quantity: item.quantity };
        }),
        address: {
          fullName: "",
          phoneNumber: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          stateOrProvince: "",
          postalCode: "",
          country: "",
        },
      };

      await mutateAsyncCreateOrder(orderData, {
        onError: (error) => {
          throw error;
        },
        onSuccess: async (responseData: OrderResponse) => {
          console.log("Response", responseData);
          setCartItems([]);
          const deleteCartItemsMutation = cartItems.map(
            (cartItem: CartItemResponse) => {
              return mutateAsyncDeleteCartItem(`${cartItem.id}`);
            }
          );

          await Promise.all(deleteCartItemsMutation);
          toast(
            <ToastComponent
              text="You order have been placed successfully. Please proceed to checkout"
              title="Order Successful"
            />
          );
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDERS] });
          navigate(`/check-out-page/${responseData.id}`);
        },
      });
    } catch (error: unknown) {
      console.log("error", error);
      const errorMessage = `${(error as DefaultError).message}`;
      toast(
        <ToastComponent text={errorMessage} title="Order processing failed" />
      );
    }
  };

  const handleModifyQuantity = async (productId: number, value: number) => {
    try {
      await getProducts.refetch();
      //validate cart items
      const productValid = productsData.find((item) => item.id === productId);
      console.log(productValid, productValid?.quantity);
      if (!productValid || productValid.quantity < value) {
        toast(
          <ToastComponent
            text="Product isn't available, please adjust the cart items quantity to the available quantity."
            title="Adding items to cart failed"
          />
        );
        throw new Error(
          "Product isn't available, please adjust the cart items quantity to the available quantity."
        );
      } else {
        const cartItemId = cartItems.find(
          (item) => item.productId === productId
        )?.id;
        if (!cartItemId) {
          throw new Error("Not a valid cart item");
        }
        if (value <= 0) {
          setCartItems(
            cartItems.filter((cartItem) => {
              return cartItem.productId !== productId;
            })
          );
          if (value === 0) {
            mutateAsyncDeleteCartItem(`${cartItemId}`);
          }
        } else {
          setCartItems(
            cartItems.map((cartItem) => {
              if (cartItem.productId === productId) {
                return { ...cartItem, quantity: value };
              }
              return cartItem;
            })
          );
          mutateAsyncUpdateCartItem({
            id: `${cartItemId}`,
            quantity: value,
          });
        }
      }
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
              products: productsData,
              handleModifyQuantity,
              userId: userData.id,
            })
          }
        />
        <ButtonComponent
          buttonLabel="Place Order"
          disabled={cartItems.length === 0}
          type="submit"
          icon="pi-shopping-bag"
          onClick={handlePlaceOrder}
        />
      </div>
    </Suspense>
  );
};
