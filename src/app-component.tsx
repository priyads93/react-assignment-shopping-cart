import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./layouts/home-layout";
import { ToastContainer } from "react-toastify";
import { routes } from "./routes";

export const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => (
            <Route
              element={<Layout>{route.element}</Layout>}
              key={index}
              path={route.path}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
};
