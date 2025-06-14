import { CartItem } from "@/app/cart/page";
import { fetchCart as fetchCartFromAPI } from "@/lib/apis";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cart = action.payload;
    },
  },
});

export const fetchCart = (token: string) => async (dispatch: Dispatch) => {
  const response = await fetchCartFromAPI(token);
  dispatch(setCart(response));
};

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
