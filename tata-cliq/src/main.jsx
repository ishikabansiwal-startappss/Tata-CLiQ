import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import App from "./App";
import { store } from "./redux/store";
import "./styles/global.scss";
import { initializeAnalytics } from "./services/analytics";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");

    await worker.start({
      onUnhandledRequest: "bypass",
    });
  }
}

enableMocking().then(() => {
  initializeAnalytics();
  ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
});