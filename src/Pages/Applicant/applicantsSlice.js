import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  applicantsData: [],
  status: "idle",
};
export const postApplicant = createAsyncThunk(
  "applicant/post",
  async (body) => {
    body.dob = body.dob?.format("YYYY-MM-DD");
    body.position_id = body.job.position_id;
    delete body.job;
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_API_URL}/applicant`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  }
);
export const getApplicants = createAsyncThunk("applicants/get", async () => {
  const token = sessionStorage.getItem("token");
  const data = await fetch(`${process.env.REACT_APP_API_URL}/applicants`, {
    headers: {
      authorization: `bearer ${token}`,
    },
  });
  const result = await data.json();
  return result;
});

export const getApplicant = createAsyncThunk("applicant/get", async (id) => {
  const token = sessionStorage.getItem("token");
  const data = await fetch(`${process.env.REACT_APP_API_URL}/applicant/${id}`, {
    headers: {
      authorization: `bearer ${token}`,
    },
  });
  const result = await data.json();
  return result;
});

export const postFile = createAsyncThunk("resume/post", async (file) => {
  const token = sessionStorage.getItem("token");
  const resume = new FormData();
  resume.append("file", file);
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

export const postSchedule = createAsyncThunk(
  "applicant/schedule",
  async ({ id, date }) => {
    const token = sessionStorage.getItem("token");
    const data = await fetch(
      `${process.env.REACT_APP_API_URL}/applicant/${id}/schedule-interview`,
      {
        method: "POST",
        headers: {
          authorization: `bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ date }),
      }
    );
    const result = await data.json();
    return result;
  }
);

export const rejectApplicant = createAsyncThunk(
  "applicant/reject",
  async ({ id, message }) => {
    const token = sessionStorage.getItem("token");
    const data = await fetch(
      `${process.env.REACT_APP_API_URL}/applicant/${id}/reject`,
      {
        method: "POST",
        headers: {
          authorization: `bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(message),
      }
    );
    const result = await data.json();
    return result;
  }
);

export const hireApplicant = createAsyncThunk(
  "applicant/hire",
  async ({ job, applicant_id }) => {
    const token = sessionStorage.getItem("token");
    const data = await fetch(
      `${process.env.REACT_APP_API_URL}/applicant/${applicant_id}/hire`,
      {
        method: "POST",
        headers: {
          authorization: `bearer ${token}`,
          "content-type": "application/json",
        },
        // body: JSON.stringify({ job }),
        body: JSON.stringify({
          job: {
            position_id: 1,
            position: "Teacher",
            type: "fulltime",
            start_date: "2022-11-01",
            end_date: "",
            salary: 20000,
            bonus: 0,
            leave_days: 10,
            reporting_hour: "20:30",
            closing_hour: "14:40",
          },
        }),
      }
    );
    const result = await data.json();
    return result;
  }
);

export const applicantsSlice = createSlice({
  name: "applicants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getApplicants.fulfilled, (state, action) => {
      state.applicantsData = action.payload;
      state.status = "successful";
    });
    builder.addCase(getApplicants.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getApplicant.fulfilled, (state, action) => {
      state.status = "successful";
    });
    builder.addCase(getApplicant.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(postApplicant.fulfilled, (state, action) => {
      state.status = "successful";
    });
    builder.addCase(postApplicant.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(hireApplicant.fulfilled, (state, action) => {
      state.status = "successful";
    });
    builder.addCase(hireApplicant.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(postApplicant.rejected, (state, action) => {
      state.status = "failed";
      console.log(action.error);
    });
    builder.addCase(postFile.fulfilled, (state, action) => {
      state.status = "successful";
      state.resumeFile = action.payload;
    });
    builder.addCase(postFile.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(postFile.rejected, (state, action) => {
      state.status = "failed";
      console.log(action.error);
    });
    builder.addCase(postSchedule.fulfilled, (state, action) => {
      state.status = "successful";
    });
    builder.addCase(postSchedule.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(rejectApplicant.fulfilled, (state, action) => {
      state.status = "successful";
    });
    builder.addCase(rejectApplicant.pending, (state, action) => {
      state.status = "loading";
    });
  },
});

export default applicantsSlice.reducer;
