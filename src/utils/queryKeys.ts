export const QUERY_KEYS = {
  PRODUCTS: "getProducts",
  USER: "getUser",
  ORDERS: "getOrders",
  ORDER: "getOrder",
  CARTITEMS: "getCartItems"
};

export const QUERY_KEYS_BASED_ON_ID = (queryKeyPrefix: string, id: string) => {
  return `${queryKeyPrefix}-${id}`;
};
