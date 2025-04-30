import { Suspense, useRef, useState } from "react";
import { ErrorComponent } from "../components/error-component";
import { UnAuthorizedLoginComponent } from "../components/unauthorized-login-component";
import { UserContextType, useUserHook } from "../context/user-context";
import { useGetOrders } from "../services/order-service";
import { isUserDataValid } from "../utils/isUserDataValid";
import {
  AccountType,
  OrderItemResponse,
  OrderResponse,
  OrderStatus,
} from "../services/interface";
import DialogComponent from "../components/dialog-component";
import { CheckOutForm } from "../forms/checkout-form";
import { ListComponent } from "../components/list-component";
import { Link } from "react-router";
import { OrderListItemTemplate } from "../components/order-list-item-template";
import { OverlayPanel } from "primereact/overlaypanel";
import { OrderItemTemplate } from "../components/order-item-template";

export const OrdersPage = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [orderSelected, setOrderSelected] = useState<OrderResponse | undefined>(
    undefined
  );
  const { loggedInUser: userData } = useUserHook() as UserContextType;
  if (!isUserDataValid(userData)) {
    return <UnAuthorizedLoginComponent />;
  }

  const overlayPanelRef = useRef<OverlayPanel>(null);

  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useGetOrders<OrderResponse>(`${userData.id}`, [
    OrderStatus.CANCELLED,
    OrderStatus.SUCCESSFUL,
  ]);
  if (isLoading) {
    return <span aria-live="polite">Loading...</span>;
  }
  if (isError) {
    return <ErrorComponent errorMessage={`${error?.message}`} />;
  }

  const handleSetVisible = () => {
    setIsDialogVisible(false);
  };

  const handleViewOrder = (orderId: number) => {
    setIsDialogVisible(true);
    setOrderSelected(
      orders?.find((item: OrderResponse) => item.id === orderId)
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        {userData.accountType === AccountType.BUYER && orderSelected ? (
          <>
            <DialogComponent
              handleSetVisible={handleSetVisible}
              header={"View Order"}
              isVisible={isDialogVisible}
            >
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
                <CheckOutForm disabled={true} {...orderSelected} />
                <ListComponent
                  data={orderSelected.orderItems ?? []}
                  emptyMessage="No Items In Orders. Please proceed to shopping"
                  footer={<></>}
                  header="Items In Your Order"
                  itemTemplate={(item: OrderItemResponse) =>
                    OrderItemTemplate({ orderItem: item })
                  }
                />
              </div>
            </DialogComponent>
          </>
        ) : null}

        <ListComponent
          data={orders}
          emptyMessage="No Orders, Go to shopping page to continue shopping"
          footer={
            <Link to="/product-list">Go to shopping page click here</Link>
          }
          header="List Of Orders"
          itemTemplate={(item: OrderResponse) =>
            OrderListItemTemplate({
              order: item,
              handleViewOrder,
              overlayPanelRef,
            })
          }
        />
      </div>
    </Suspense>
  );
};
