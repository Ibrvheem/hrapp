import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: {},
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
    localStorage.setItem("token", data.token);
    return data;
  } else {
    throw new Error(data.error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        console.log("loading");
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        console.log("success");
      })
      .addCase(getUser.rejected, (state, action) => {
        const error = action.error.message;
        console.log(error);
      });
  },
});
export default authSlice.reducer;
