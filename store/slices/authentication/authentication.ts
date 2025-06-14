import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { loginByEmail } from "@/lib/apis";
import { setError } from "../error/error";
import Cookies from "js-cookie";


interface User {
  _id: string;
  name: string;
  email: string;
  buildingNo: string;
  streetName: string;
  area: string;
  city: string;
  state: string;
  pinCode: string;
  phone: string;
  refCode: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
}

const authInitialState: AuthState = {
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      // Remove the token cookie when logging out
      Cookies.remove("token");
    },
  },
});

export const login =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    const response: any = await loginByEmail(email, password);

    if (response && response.token && response.user) {
      dispatch(setAuth(response));
    } else {
      dispatch(
        setError({
          title: "Login Error",
          message: response.response.data.msg,
        })
      );
    }
  };

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
