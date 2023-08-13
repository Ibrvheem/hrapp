import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  reports: {},
  employees: [],
  currentReport: {},
  status: "idle",
  error: null,
};

export const getReport = createAsyncThunk("report/get", async (employee_id) => {
  const token = sessionStorage.getItem("token");
  const data = await fetch(
    `${process.env.REACT_APP_API_URL}/report/${employee_id}`,
    {
      headers: {
        authorization: `bearer ${token}`,
      },
    }
  );
  const result = await data.json();
  return result;
});

export const getAllReports = createAsyncThunk("reports/get", async () => {
  const token = sessionStorage.getItem("token");
  const data = await fetch(`${process.env.REACT_APP_API_URL}/report`, {
    headers: {
      authorization: `bearer ${token}`,
    },
  });
  const result = await data.json();
  return result;
});

export const unSetReport = createAsyncThunk("reports/unset", async () => {
  return true
})

export const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReport.fulfilled, (state, action) => {
      state.currentReport = action.payload;
      state.status = "successful";
    });
    builder.addCase(getReport.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getReport.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(getAllReports.fulfilled, (state, action) => {
      state.reports = action.payload;
      state.status = "successful";
    });
    builder.addCase(getAllReports.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getAllReports.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(unSetReport.fulfilled, (state, action) => {
      state.currentReport = null
      state.reports = null
      state.status = "successful";
    });
  },
});

export default reportsSlice.reducer;
