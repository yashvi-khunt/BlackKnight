import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const tokenFields = {
  role: "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
  id: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
  email: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
};
var ex_data = localStorage.getItem("user");
var data: Global.InitialUser = ex_data ? JSON.parse(ex_data) : null;

const initialState: Global.InitialUser = {
  status: data === null ? false : true,
  userData: data !== null ? data.userData : null,
  token: data !== null ? data.token : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const decode = jwtDecode<Global.DecodedToken>(action.payload);
      const user: Global.UserData = {
        role: decode[tokenFields.role as keyof Global.DecodedToken],
        id: decode[tokenFields.id as keyof Global.DecodedToken],
        email: decode[tokenFields.email as keyof Global.DecodedToken],
      };

      state.status = true;
      state.token = action.payload;
      state.userData = user;

      // Save user data to local storage
      localStorage.setItem(
        "user",
        JSON.stringify({ userData: user, token: action.payload })
      );
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.token = null;
      // Clear user data from local storage
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
