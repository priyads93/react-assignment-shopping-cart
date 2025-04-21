import { createRoot } from "react-dom/client";
import { App } from "./app-component";
import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./context/user-context";
import { PrimeReactProvider } from "primereact/api";
import "primeicons/primeicons.css";

// Create a client
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </UserProvider>
    </PrimeReactProvider>
  </StrictMode>
);
