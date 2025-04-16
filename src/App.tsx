import React, { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserInfoPage } from "./pages/UserInfoPage";
//import { UserInfoPage } from "./pages/UserInfoPage";

const App = () => {
  // Create a client
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout children={HomePage()} />} />
            <Route path="/login" element={<Layout children={LoginPage()} />} />
            <Route
              path="/register"
              element={<Layout children={RegistrationPage()} />}
            />
            <Route path="/user" element={<Layout children={UserInfoPage()} />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>
  );
};

export default App;
