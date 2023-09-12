import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  leaveInformation: [],
  status: "idle",
};

export const postLeave = createAsyncThunk(
  "leave/post",
  async ({ id, body }) => {
    const token = sessionStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/employee/${id}/set-on-leave`,
      {
        method: "POST",
        headers: {
          authorization: `bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    return await response.json()
  }
);

export const getLeaves = createAsyncThunk("get/leave", async () => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/employee/leave`,
    {
      headers: {
        authorization: `bearer ${token}`,
      },
    }
  );
  const result = await response.json();
  return result;
});

export const LeaveSlice = createSlice({
  name: "leaves",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(postLeave.fulfilled, (state, action) => {
      state.status = "successfull";
    });
    builder.addCase(postLeave.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(postLeave.rejected, (state, action) => {
      state.status = "failed";
      console.log(action.error);
    });
    builder.addCase(getLeaves.fulfilled, (state, action) => {
      state.leaveInformation = action.payload;
      state.status = "successful";
    });
    builder.addCase(getLeaves.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getLeaves.rejected, (state, action) => {
      console.log(action.error)
    });
  },
});

export default LeaveSlice.reducer;
