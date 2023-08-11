import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  reports: {},
  employees: [],
  currentReport: {},
  status: "idle",
  error: null,
};

const token = localStorage.getItem("token");
export const getEmployeesFromLocalApi = createAsyncThunk(
  "employees/getAll",
  async () => {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/employee`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    const result = await data.json();
    return result;
  }
);

export const getReport = createAsyncThunk("report/get", async (employee_id) => {
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

export const unSetReport = createAsyncThunk("report/unset", async () => true);
export const unSetReports = createAsyncThunk("reports/unset", async () => true);

export const getAllReports = createAsyncThunk("reports/get", async () => {
  const data = await fetch(`${process.env.REACT_APP_API_URL}/report`, {
    headers: {
      authorization: `bearer ${token}`,
    },
  });
  const result = await data.json();
  return result;
});

export const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmployeesFromLocalApi.fulfilled, (state, action) => {
      state.employees = action.payload;
    });
    builder.addCase(getEmployeesFromLocalApi.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(getReport.fulfilled, (state, action) => {
      state.currentReport = action.payload;
    });
    builder.addCase(getReport.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(unSetReport.fulfilled, (state, action) => {
      state.currentReport.url = null;
    });
    builder.addCase(unSetReports.fulfilled, (state, action) => {
      state.reports.url = null;
    });
    builder.addCase(getAllReports.fulfilled, (state, action) => {
      state.reports = action.payload;
    });
    builder.addCase(getAllReports.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
  },
});

export default reportsSlice.reducer;
