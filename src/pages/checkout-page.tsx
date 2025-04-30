import { Suspense } from "react";
import { UnAuthorizedLoginComponent } from "../components/unauthorized-login-component";
import { UserContextType, useUserHook } from "../context/user-context";
import { isUserDataValid } from "../utils/isUserDataValid";
import { CheckOutForm } from "../forms/checkout-form";
import { useGetOrder, useUpdateOrder } from "../services/order-service";
import { ErrorComponent } from "../components/error-component";
import { ListComponent } from "../components/list-component";
import { Link, useNavigate, useParams } from "react-router";
import { OrderItemTemplate } from "../components/order-item-template";
import {
  ModifyOrderQuantity,
  OrderItem,
  OrderItemResponse,
  OrderResponse,
  OrderStatus,
} from "../services/interface";
import { ButtonComponent } from "../components/button-component";
import { ToastComponent } from "../components/toast-component";
import { toast } from "react-toastify";
import { DefaultError, useQueryClient } from "@tanstack/react-query";
import { isOrderValid } from "../utils/isOrderValid";
import { QUERY_KEYS, QUERY_KEYS_BASED_ON_ID } from "../utils/queryKeys";
import ProcessedOrderComponent from "../components/processed-order-component";
import { useUpdateProduct } from "../services/product-service";

export const CheckOutPage = () => {
  const { id: orderId } = useParams<{ id: string }>();

  if (!orderId) {
    return <ErrorComponent errorMessage="Some issue please check out later" />;
  }

  const { loggedInUser: userData } = useUserHook() as UserContextType;
  const { mutateAsync } = useUpdateOrder(orderId);
  const productMutation = useUpdateProduct();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (!isUserDataValid(userData)) {
    return <UnAuthorizedLoginComponent />;
  }

  const {
    data: orderDetails,
    isLoading,
    isError,
    error,
  } = useGetOrder<OrderResponse>(`${orderId}`);

  if (isLoading) {
    return <span aria-live="polite">Loading...</span>;
  }

  if (isError) {
    return <ErrorComponent errorMessage={`${error?.message}`} />;
  }

  if (orderDetails?.orderStatus !== OrderStatus.CREATED) {
    return <ProcessedOrderComponent />;
  }

  const handleCompleteOrder = async () => {
    try {
      //validate order data before completing
      await isOrderValid({
        address: orderDetails?.address,
        description: orderDetails?.description,
        orderStatus: orderDetails?.orderStatus,
        paymentMode: orderDetails?.paymentMode,
        totalCost: orderDetails?.totalCost,
      });
      await mutateAsync(
        { orderStatus: OrderStatus.SUCCESSFUL },
        {
          onError: (error) => {
            throw error;
          },
          onSuccess: async (responseData: OrderResponse) => {
            // reduce the product quantity here not during create order
            const productUpdatesMutation = orderDetails.orderItems.map(
              (orderItem: OrderItem) => {
                return productMutation.mutateAsync({
                  data: { quantity: orderItem.quantity, modifyQuantity: ModifyOrderQuantity.DECREASE },
                  productId: `${orderItem.productId}`,
                });
              }
            );
            await Promise.all(productUpdatesMutation);
            toast(
              <ToastComponent
                text="You order have been checked out successfully"
                title="Order Successful"
              />
            );
            queryClient.invalidateQueries({
              queryKey: [
                QUERY_KEYS_BASED_ON_ID(QUERY_KEYS.ORDER, `${orderId}`),
              ],
            });
            navigate(`/user`);
          },
        }
      );
    } catch (error) {
      const errorMessage = `${(error as DefaultError).message}`;
      toast(
        <ToastComponent
          text={errorMessage}
          title="Order processing failed, please update order details and try again"
        />
      );
    }
  };

  const handleCancelOrder = async () => {
    try {
      await mutateAsync(
        { orderStatus: OrderStatus.CANCELLED },
        {
          onError: (error) => {
            throw error;
          },
          onSuccess: async (responseData: OrderResponse) => {
            /* const productUpdatesMutation = orderDetails.orderItems.map(
              (orderItem: OrderItem) => {
                return productMutation.mutateAsync({
                  data: { quantity: orderItem.quantity, modifyQuantity: ModifyOrderQuantity.INCREASE },
                  productId: `${orderItem.productId}`,
                });
              }
            );

            await Promise.all(productUpdatesMutation);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] }); */
            toast(
              <ToastComponent
                text="You order have been cancelled"
                title="Order Cancellations Successful"
              />
            );
            navigate(`/user`);
          },
        }
      );
    } catch (error) {
      const errorMessage = `${(error as DefaultError).message}`;
      toast(
        <ToastComponent text={errorMessage} title="Order processing failed" />
      );
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        className="checkout"
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          flexBasis: "auto",
          flexGrow: 0,
        }}
      >
        <CheckOutForm disabled={false} {...orderDetails} />
        <div
          className="checkout-order"
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            flexBasis: "auto",
            flexGrow: 0,
          }}
        >
          <ListComponent
            data={orderDetails.orderItems ?? []}
            emptyMessage="No Items In Orders. Please proceed to shopping"
            footer={
              <Link to="/product-list">
                Missed Items!!..Go to shopping page click here to add more
                items.
              </Link>
            }
            header="Items In Your Order"
            itemTemplate={(item: OrderItemResponse) =>
              OrderItemTemplate({ orderItem: item })
            }
          />
          <div
            className="button-group"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ButtonComponent
              buttonLabel="Complete Order"
              disabled={false}
              type="submit"
              id="Complete Order"
              onClick={handleCompleteOrder}
            />
            <ButtonComponent
              buttonLabel="Cancel Order"
              disabled={false}
              type="submit"
              id="Cancel Order"
              onClick={handleCancelOrder}
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
};
