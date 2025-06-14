"use client";

import { persistor, store } from "./store";
import { Provider } from "react-redux";
import { ReactNode } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { RepairProvider } from "@/app/repair/RepairContext";

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <RepairProvider>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </RepairProvider>
    </Provider>
  );
};
