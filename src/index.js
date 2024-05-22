import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./UseCases/Store/Redux/Store";
import { Provider } from "react-redux";
import { ContextProvider } from "./UseCases/Store/ContextApi/MediaRecorderStore";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./UseCases/Store/Redux/PersistorConfig";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
    <ContextProvider>
      <Provider store={store}>
          <App />
          <ReactQueryDevtools />
      </Provider>
    </ContextProvider>
  </QueryClientProvider>
);
