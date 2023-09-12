import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  positions: [],
  status: "idle",
  error: null,
};
export const getPositions = createAsyncThunk("position/get", async () => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${process.env.REACT_APP_API_URL}/position`, {
    headers: {
      authorization: `bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
});
export const createPosition = createAsyncThunk(
  "position/create",
  async (name) => {
    const token = sessionStorage.getItem("token");
    fetch(`${process.env.REACT_APP_API_URL}/position`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },
      body: JSON.stringify(name),
    });
  }
);
export const positionsSlice = createSlice({
  name: "positions",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createPosition.fulfilled, (state, action) => {
      state.status = "successful";
    });
    builder.addCase(createPosition.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
      console.log(state.error);
    });
    builder.addCase(getPositions.fulfilled, (state, action) => {
      state.positions = action.payload;
    });
  },
});

export default positionsSlice.reducer;
