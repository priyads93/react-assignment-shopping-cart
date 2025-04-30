import { OverlayPanel } from "primereact/overlaypanel";
import { OrderResponse } from "../services/interface";
import { ButtonComponent } from "./button-component";
import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";
import { RefObject } from "react";
import { MenuBarComponent } from "./menu-bar-component";
import { MenuItem } from "primereact/menuitem";

type OrderItemTemplateProps = {
  order: OrderResponse;
  handleViewOrder: (orderId: number) => void;
  overlayPanelRef: RefObject<OverlayPanel | null>;
};

export const OrderListItemTemplate = ({
  order,
  handleViewOrder,
  overlayPanelRef,
}: OrderItemTemplateProps) => {
  console.log(order);
  const menuItems: MenuItem[] = [
    {
      id: "Order Details",
      label: "Order Placed",
      template: (
        <div>
          <span>Order Placed</span>
          <br />
          <span>{new Date(order?.updatedDate).toDateString()}</span>
          <br />
        </div>
      ),
    },
    {
      id: "Deliver To",
      label: "Deliver To",
      template: (
        <div>
          <span onClick={(e) => overlayPanelRef.current?.toggle(e)}>
            Deliver To
          </span>
          <br />
          <span onClick={(e) => overlayPanelRef.current?.toggle(e)}>
            {order?.address?.fullName}
          </span>
          <OverlayPanel ref={overlayPanelRef}>
            <span>{order?.address?.addressLine1}</span>
            <br />
            {order?.address?.addressLine2 && (
              <>
                <span>{order?.address?.addressLine2}</span>
                <br />
              </>
            )}
            <span>
              {order?.address?.city},{order?.address?.stateOrProvince}
            </span>
            <br />
            <span>
              {order?.address?.country},{order.address?.postalCode}
            </span>
            <br />
          </OverlayPanel>
        </div>
      ),
      url: "/",
    },
    {
      id: "Order Cost",
      label: "Order Cost",
      template: (
        <div>
          <span>Total Cost</span>
          <br />
          <span>₹{order?.totalCost}</span>
          <br />
        </div>
      ),
    },
  ];
  return (
    <div className="list-item" id={`${order.id}`}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "space-evenly",
        }}
      >
        <div className="list-item-header" id="header">
          {order?.address?.fullName ? (
            <MenuBarComponent
              id="menubar"
              menuItems={menuItems}
              end={
                <>
                  <span>Order # {order?.id}</span> <br />
                  <span>{order?.orderStatus}</span>
                </>
              }
            />
          ) : null}
        </div>
        <div className="body">
          <div className="list-item-avatar" id="list-item-avatar">
            {order?.orderItems?.map((orderItem) => {
              return (
                <Avatar
                  className="p-overlay-badge"
                  image={orderItem?.product?.imageUrl}
                  size="xlarge"
                  key={orderItem.productId}
                >
                  <Badge value={orderItem?.quantity} />
                </Avatar>
              );
            })}
          </div>

          <div className="list-item-button">
            <ButtonComponent
              buttonLabel="View Order Details"
              disabled={false}
              id={`${order.id}`}
              onClick={(e) => handleViewOrder(order.id)}
              type="submit"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
