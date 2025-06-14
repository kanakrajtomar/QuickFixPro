import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { fetchSubCategories as fetchSubCategoriesFromAPI } from "@/lib/apis";

export interface SubCategory {
  _id: string;
  name: string;
  imageURL: string;
  isVisible: boolean;
  isSubCategory: boolean;
  parentCatId: string;
  rootCatId: string;
  description: string;
  seoTags: {
    seoTitle: string;
    metaDescTag: string;
  };
  __v: 0;
}

interface SubCategoriesState {
  sub_categories: SubCategory[];
}

const initialState: SubCategoriesState = {
  sub_categories: [],
};

export const subCategoriesSlice = createSlice({
  name: "sub_categories",
  initialState,
  reducers: {
    setSubCategories: (state, action: PayloadAction<SubCategory[]>) => {
      state.sub_categories = action.payload;
    },
  },
});

export const fetchSubCategories =
  (id: string) => async (dispatch: Dispatch) => {
    const response = await fetchSubCategoriesFromAPI(id);
    dispatch(setSubCategories(response));
  };

export const { setSubCategories: setSubCategories } =
  subCategoriesSlice.actions;
export default subCategoriesSlice.reducer;
