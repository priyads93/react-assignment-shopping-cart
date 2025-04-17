import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./layouts/home-layout";
import { HomePage } from "./pages/home-page";
import { LoginPage } from "./pages/login-page";
import { RegistrationPage } from "./pages/registration-page";
import { UserInfoPage } from "./pages/user-info-page";
import { ToastContainer } from "react-toastify";

export const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
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
      </Routes>
    </BrowserRouter>
  );
};