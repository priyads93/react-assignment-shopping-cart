import { OrderItemResponse } from "../services/interface";
import ListItemComponent from "./list-item-component";

type OrderItemTemplateProps = {
  orderItem: OrderItemResponse;
};

export const OrderItemTemplate = ({ orderItem }: OrderItemTemplateProps) => {
  return (
    <ListItemComponent
      imageUrl={orderItem?.product?.imageUrl}
      name={orderItem?.product?.name}
      description={orderItem?.product?.description}
      rating={orderItem?.product?.rating}
      categoryType={orderItem?.product?.categoryType}
      price={orderItem?.product?.price}
      id={orderItem?.product?.id}
    />
  );
};
