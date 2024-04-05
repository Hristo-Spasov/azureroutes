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

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <QueryClientProvider client={queryClient}>
        <FetchProvider>
          <FlightProvider>
            <Root />
          </FlightProvider>
        </FetchProvider>
      </QueryClientProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
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
