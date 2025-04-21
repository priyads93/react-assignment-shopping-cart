import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./layouts/home-layout";
import { HomePage } from "./pages/home-page";
import { LoginPage } from "./pages/login-page";
import { RegistrationPage } from "./pages/registration-page";
import { UserInfoPage } from "./pages/user-info-page";
import { ProductsPage } from "./pages/products-page";
import { ToastContainer } from "react-toastify";
import { NotFoundPage } from "./pages/not-found-page";

export const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
            path="/"
          />
          <Route
            element={
              <Layout>
                <LoginPage />
              </Layout>
            }
            path="/login"
          />
          <Route
            element={
              <Layout>
                <RegistrationPage />
              </Layout>
            }
            path="/register"
          />
          <Route
            element={
              <Layout>
                <UserInfoPage />
              </Layout>
            }
            path="/user"
          />
          <Route
            element={
              <Layout>
                <ProductsPage />
              </Layout>
            }
            path="/product-list"
          />
          <Route
            element={
              <Layout>
                <NotFoundPage />
              </Layout>
            }
            path="*"
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
