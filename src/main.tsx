import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./global.css";
import { CountryProvider } from "@/contexts/CountryProvider";
import { YearProvider } from "@/contexts/YearContext";
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});

void updateSW();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CountryProvider>
      <YearProvider>
        <App />
      </YearProvider>
    </CountryProvider>
  </StrictMode>,
);
