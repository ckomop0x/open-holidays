import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { CountryProvider } from "@/contexts/CountryContext.tsx";
import App from "./App.tsx";
import "./global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CountryProvider>
      <App />
    </CountryProvider>
  </StrictMode>,
);
