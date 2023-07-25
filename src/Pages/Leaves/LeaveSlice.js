import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  leaveInformation: [],
};

const token = localStorage.getItem("token");
export const postLeave = createAsyncThunk("leave/post", async ({ id, body }) => {
  const employeeId = JSON.stringify(id);
  console.log(body);
  console.log(employeeId);
  console.log(`${process.env.REACT_APP_API_URL}/employee/${id}/set-on-leave`);
  await fetch(`${process.env.REACT_APP_API_URL}/employee/${id}/set-on-leave`, {
    method: "POST",
    headers: {
      authorization: `bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
});

export const getLeaves = createAsyncThunk("get/leave", async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/employee/leave`, {
    headers: {
      authorization: `bearer ${token}`,
    },
  });
  const result = await response.json();
  return result;
});

export const LeaveSlice = createSlice({
  name: "leaves",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(postLeave.fulfilled, (state, action) => {
      console.log("fulfilled");
    });
    builder.addCase(getLeaves.fulfilled, (state, action) => {
      state.leaveInformation = action.payload;
    });
  },
});

export default LeaveSlice.reducer;
