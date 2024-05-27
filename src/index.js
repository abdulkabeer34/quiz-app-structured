import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { ContextProvider } from "./UseCases";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "./UseCases/Store/Redux/store";

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
