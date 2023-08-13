import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const initialState = {
  user: {},
  status: "idle",
};

export const getUser = createAsyncThunk("auth/getUser", async (credentials) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (response.ok) {
    sessionStorage.setItem("token", data.token);
    return data;
  } else {
    throw new Error(data.error);
  }
});

export const logOut = createAsyncThunk("auth/logout", async () => {
  sessionStorage.removeItem("token");
  window.location.href = window.location.origin;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "successful";
      })
      .addCase(getUser.rejected, (state, action) => {
        const error = action.error.message;
        state.status = "failed";
        console.log(error);
      });
    builder.addCase(logOut.fulfilled, () => {
      console.log("Logged Out");
    });
  },
});
export default authSlice.reducer;
