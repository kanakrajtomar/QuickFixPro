import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ErrorState {
  message: string | null;
  title: string | null;
}
const initialState: ErrorState = {
  message: null,
  title: null,
};

export const errorSlice = createSlice({
  name: "error",
  initialState: initialState,
  reducers: {
    setError: (state, action: PayloadAction<ErrorState>) => {
      state.message = action.payload.message;
      state.title = action.payload.title;
    },
    clearError: (state) => {
      state.message = "";
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
