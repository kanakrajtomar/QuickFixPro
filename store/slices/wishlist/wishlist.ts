import { fetchWishlist as fetchWishlistFromAPI } from "@/lib/apis";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

export interface WishListProduct {
  productId: string;
  productName: string;
  discountPrice: number;
  variantIndex: number;
  productImageUrl: string;
  actualPrice: number;
  variantName: string;
}
interface WishListState {
  products: WishListProduct[];
}

const initialState: WishListState = {
  products: [],
};

export const categoriesSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<WishListProduct[]>) => {
      state.products = action.payload;
    },
  },
});

export const fetchWishlist = (token: string) => async (dispatch: Dispatch) => {
  const response = await fetchWishlistFromAPI(token);
  dispatch(setWishlist(response));
};

export const { setWishlist } = categoriesSlice.actions;
export default categoriesSlice.reducer;
