// routes.tsx

import { HomePage } from "./pages/home-page";
import { LoginPage } from "./pages/login-page";
import { NotFoundPage } from "./pages/not-found-page";
import { ProductsPage } from "./pages/products-page";
import { RegistrationPage } from "./pages/registration-page";
import { UserInfoPage } from "./pages/user-info-page";


export const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegistrationPage /> },
  { path: "/user", element: <UserInfoPage /> },
  { path: "/product-list", element: <ProductsPage /> },
  { path: "*", element: <NotFoundPage /> },
];