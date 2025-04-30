import { orderSchema } from "../forms/checkout-form";
import { OrderResponse } from "../services/interface";

export const isOrderValid = async (
  order: Omit<OrderResponse, "id" | "orderItems" | "user" | "userId"|"createdDate"|"updatedDate">
) => {
  try {
    await orderSchema.validate(order);
    return true;
  } catch (err: unknown) {
    throw err;
  }
};
