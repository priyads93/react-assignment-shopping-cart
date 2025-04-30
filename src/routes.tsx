// routes.tsx

import { ErrorBoundary } from "./components/error-boundary-component";
import { CartPage } from "./pages/cart-page";
import { CheckOutPage } from "./pages/checkout-page";
import { HomePage } from "./pages/home-page";
import { LoginPage } from "./pages/login-page";
import { NotFoundPage } from "./pages/not-found-page";
import { OrdersPage } from "./pages/orders-page";
import { ProductInfoPage } from "./pages/product-info-page";
import { ProductsPage } from "./pages/products-page";
import { RegistrationPage } from "./pages/registration-page";
import { UserInfoPage } from "./pages/user-info-page";

export const routes = [
  {
    path: "/",
    element: (
      <ErrorBoundary fallback={<h1>Error occurred!</h1>}>
        <HomePage />
      </ErrorBoundary>
    ),
  },
  {
    path: "/login",
    element: (
      <ErrorBoundary fallback={<h1>Error occurred!</h1>}>
        <LoginPage />
      </ErrorBoundary>
    ),
  },
  {
    path: "/register",
    element: (
      <ErrorBoundary fallback={<h1>Error occurred!</h1>}>
        <RegistrationPage />
      </ErrorBoundary>
    ),
  },
  {
    path: "/register/:id",
    element: (
      <ErrorBoundary fallback={<h1>Error occurred!</h1>}>
        {" "}
        <RegistrationPage />
      </ErrorBoundary>
    ),
  },
  {
    path: "/user",
    element: (
      <ErrorBoundary fallback={<h1>Error occurred!</h1>}>
        {" "}
        <UserInfoPage />
      </ErrorBoundary>
    ),
  },
  {
    path: "/product-list",
    element: (
      <ErrorBoundary fallback={<h1>Error occurred!</h1>}>
        {" "}
        <ProductsPage />
      </ErrorBoundary>
    ),
  },
  {
    path: "/order-list",
    element: (
      <ErrorBoundary fallback={<h1>Error occurred!</h1>}>
        <OrdersPage />
      </ErrorBoundary>
    ),
  },
  {
    path: "/cart",
    element: (
      <ErrorBoundary fallback={<h1>Error occurred!</h1>}>
        <CartPage />
      </ErrorBoundary>
    ),
  },
  {
    path: "/product-info/:id",
    element: (
      <ErrorBoundary fallback={<h1>Error occurred!</h1>}>
        <ProductInfoPage />
      </ErrorBoundary>
    ),
  },
  {
    path: "/check-out-page/:id",
    element: (
      <ErrorBoundary fallback={<h1>Error occurred!</h1>}>
        <CheckOutPage />
      </ErrorBoundary>
    ),
  },
  {
    path: "*",
    element: (
      <ErrorBoundary fallback={<h1>Error occurred!</h1>}>
        <NotFoundPage />
      </ErrorBoundary>
    ),
  },
];
