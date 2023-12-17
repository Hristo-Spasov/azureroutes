import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { FetchProvider } from "./context/search-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FetchProvider>
      <App />
    </FetchProvider>
  </React.StrictMode>
);
