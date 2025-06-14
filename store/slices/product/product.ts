import { Product } from "@/app/products/[id]/page";
import { fetchProductWithId } from "@/lib/apis";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  specific_product: Product;
}

const initialState: ProductState = {
  specific_product: {
    _id: "",
    name: "",
    parentCatId: "",
    rootCatId: "",
    description: "",
    imageArr: [],
    videoArr: [],
    inventory: {
      _id: "",
      variantExists: false,
      variantList: [
        {
          _id: "",
          price: 0,
          finalPrice: 0,
          gstPercent: 0,
          lowStockAlert: 0,
          inventoryStock: 0,
          minPurchaseQty: 0,
          attributes: [
            {
              name: "",
              values: [
                {
                  name: "",
                  hex: "",
                },
              ],
            },
          ],
        },
      ],
    },
    specification: "",
    isVisible: false,
    seoName: "",
    model: "",
    productBrand: "",
    hsn: "",
    srNo: "",
    countryOfOrigin: "",
    parentCatName: "",
    rootCatName: "",
    subCatId: "",
    subCatName: "",
    subCatSeoName: "",
    highlights: "",
    warrantyPeriod: "",
    warrantyType: "",
    manufacturer: "",
    packer: "",
    importer: "",
    shippingMode: {
      mode: "",
      charge: 0,
    },
    dimensions: {
      height: "",
      width: "",
      depth: "",
      weight: "",
    },
    paymentType: "COD",
    returnPolicy: {
      returnAvailable: false,
      daysAfterDelivered: 0,
    },
    rewardPercent: 0,
    __v: 0,
  },
};

export const specificProductSlice = createSlice({
  name: "specific_product",
  initialState,
  reducers: {
    setSpecificProduct: (state, action: PayloadAction<Product>) => {
      state.specific_product = { ...state.specific_product, ...action.payload };
    },
  },
});

export const fetchSpecificProduct =
  (id: string) => async (dispatch: Dispatch) => {
    const response = await fetchProductWithId(id);
    dispatch(setSpecificProduct(response));
  };

export const { setSpecificProduct } = specificProductSlice.actions;
export default specificProductSlice.reducer;
