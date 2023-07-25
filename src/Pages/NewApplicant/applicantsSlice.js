import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  applicantsData: [],
};
const token = localStorage.getItem("token");
export const postApplicant = createAsyncThunk("applicant/post", async (body) => {
  const response = fetch(`${process.env.REACT_APP_API_URL}/applicant`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
});
export const getApplicants = createAsyncThunk("employees/get", async () => {
  const data = await fetch(`${process.env.REACT_APP_API_URL}/applicants`, {
    headers: {
      authorization: `bearer ${token}`,
    },
  });
  const result = await data.json();
  console.log(result);
  return result;
});

export const postFile = createAsyncThunk("resume/post", async (file) => {
  const resume = new FormData();
  resume.append("file", file);
  console.log("triggered");
  const response = await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
    method: "POST",
    headers: {
      // "Content-Type": "multipart/form-data",
      authorization: `bearer ${token}`,
    },
    body: resume,
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.error);
  }
});
export const applicantsSlice = createSlice({
  name: "applicants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getApplicants.fulfilled, (state, action) => {
      state.applicantsData = action.payload;
      console.log("fulfilled");
    });
    builder.addCase(postApplicant.fulfilled, (state, action) => {
      // state.employeeData.push(action.payload);
    });
    builder.addCase(postApplicant.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(postFile.fulfilled, (state, action) => {
      console.log("fulfilled");
      state.resumeFile = action.payload;
    });
    builder.addCase(postFile.rejected, (state, action) => {
      console.log("rejected");
      console.log(action.error);
    });
  },
});

export default applicantsSlice.reducer;
