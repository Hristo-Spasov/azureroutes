import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { FetchProvider } from "./context/fetch-context.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { FlightProvider } from "./context/flight-context.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <FetchProvider>
        <FlightProvider>
          <App />
        </FlightProvider>
      </FetchProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
