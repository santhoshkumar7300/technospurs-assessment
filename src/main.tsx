import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider as StoreProvider } from "react-redux";
import { store } from "./store/index.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider store={store}>
      <Toaster
        position="bottom-center"
        containerStyle={{
          top: 20,
          left: 20,
          bottom: 60,
          right: 20,
        }}
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <App />
    </StoreProvider>
  </StrictMode>
);
