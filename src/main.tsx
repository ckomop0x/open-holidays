import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./global.css";
import { CountryProvider } from "@/contexts/CountryProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CountryProvider>
      <App />
    </CountryProvider>
  </StrictMode>,
);
