import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import "./index.scss";

import { FetchProvider } from "./context/fetch-context.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { FlightProvider } from "./context/flight-context.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root.tsx";
import Home from "./pages/Home.tsx";
import ErrorPage from "./pages/Error/ErrorPage.tsx";
import UnderConstruction from "./pages/UnderConstruction/UnderConstruction.tsx";
import Tickets from "./pages/Tickets/Tickets.tsx";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <FetchProvider>
            <FlightProvider>
              <Root />
            </FlightProvider>
          </FetchProvider>
        </QueryClientProvider>
      </HelmetProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "tickets",
        element: <Tickets />,
      },
    ],
  },
  {
    path: "under-construction",
    element: <UnderConstruction />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
