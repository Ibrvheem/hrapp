import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeeData: [],
};
const token = localStorage.getItem("token");
export const getEmployees = createAsyncThunk("employees/get", async () => {
  const data = await fetch(`${process.env.REACT_APP_API_URL}/employee`, {
    headers: {
      authorization: `bearer ${token}`,
    },
  });
  const result = await data.json();
  return result;
});
export const postEmployees = createAsyncThunk(
  "employees/post",
  async (body) => {
    fetch(`${process.env.REACT_APP_API_URL}/employee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  }
);
export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmployees.fulfilled, (state, action) => {
      state.employeeData = action.payload;
      console.log("fulfilled");
    });
    builder.addCase(postEmployees.fulfilled, (state, action) => {
      state.employeeData.push(action.payload);
    });
  },
});
export default employeesSlice.reducer;
