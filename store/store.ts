import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import authReducer from "./slices/authentication/authentication";
import cartReducer from "./slices/cart/cart";
import categoriesReducer from "./slices/category/categories";
import errorReducer from "./slices/error/error";
import productsReducer from "./slices/products/products";
import specificProductReducer from "./slices/product/product";
import wishlistReducer from "./slices/wishlist/wishlist";
import ordersReducer from "./slices/orders/orders";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  auth: authReducer,
  error: errorReducer,
  cart: cartReducer,
  product: productsReducer,
  specific_product: specificProductReducer,
  wishlist: wishlistReducer,
  orders: ordersReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  blacklist: ["register"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
