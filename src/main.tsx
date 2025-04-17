import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./app-component";
import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./context/user-context";
import { PrimeReactProvider } from "primereact/api";
import { ThemeProvider } from "./context/theme-context";

// Create a client
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <PrimeReactProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </PrimeReactProvider>
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>
);
