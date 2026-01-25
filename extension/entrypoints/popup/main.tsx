import React from "react";
import { SwitchProvider } from "@/context/SwitchProvider.tsx";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SwitchProvider>
      <App />
    </SwitchProvider>
  </React.StrictMode>
);
