import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "@/app/components/HeroNavCategory";
import { fetchCategories as fetchCategoriesFromAPI } from "@/lib/apis";

interface CategoriesState {
  categories: Category[];
}

const initialState: CategoriesState = {
  categories: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
  },
});

export const fetchCategories = () => async (dispatch: Dispatch) => {
  const response = await fetchCategoriesFromAPI();
  dispatch(setCategories(response));
};

export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
