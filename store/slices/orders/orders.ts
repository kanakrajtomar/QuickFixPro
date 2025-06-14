import { OrderProduct } from "@/app/my-account/order-history/page";
import { fetchOrderHistory as fetchOrderHistoryAPI } from "@/lib/apis";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

interface OrderProductState {
  orders: OrderProduct[];
}

const initialState: OrderProductState = {
  orders: [],
};

export const orderProductSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<OrderProduct[]>) => {
      state.orders = action.payload;
    },
  },
});

export const fetchOrders = (token: string) => async (dispatch: Dispatch) => {
  const response = await fetchOrderHistoryAPI(token);
  dispatch(setOrders(response));
};

export const { setOrders } = orderProductSlice.actions;
export default orderProductSlice.reducer;
