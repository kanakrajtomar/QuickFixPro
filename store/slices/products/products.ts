import { addProductToCart as addProductToCartAPI } from "@/lib/apis";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  productId: string;
  variantIndex: number;
  productCount: number;
}

const initialState: ProductState = {
  productId: "",
  variantIndex: 0,
  productCount: 1,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<ProductState>) => {
      state.productId = action.payload.productId;
      state.variantIndex = action.payload.variantIndex;
      state.productCount = action.payload.productCount;
    },
  },
});

export const addProductToCart =
  (
    token: string,
    productId: string,
    variantIndex: number,
    productCount: number
  ) =>
  async (dispatch: Dispatch) => {
    try {
      const response = await addProductToCartAPI(
        token,
        productId,
        variantIndex,
        productCount
      );
      
      // Log the response to debug
      console.log("API response:", response);

      // Ensure response has expected structure before dispatching
      if (response && response.productId) {
        dispatch(setProduct(response));
      } else {
        console.error("Unexpected API response structure:", response);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;
