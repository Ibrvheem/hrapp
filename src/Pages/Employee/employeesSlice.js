import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeeData: [],
  getEmployee: [],
  status: "idle",
  error: null,
};

function formatTime(body) {
  const time_format = "HH:mm";
  body.job.reporting_hour = body.job.reporting_hour.format(time_format);
  body.job.closing_hour = body.job.closing_hour.format(time_format);
}
function formatDate(body) {
  const date_format = "YYYY-MM-DD";
  body.dob = body.dob.format(date_format);
  body.job.start_date = body.job.start_date?.format(date_format);
}

export const getEmployees = createAsyncThunk("employees/get", async () => {
  const token = sessionStorage.getItem("token");
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
    formatTime(body);
    formatDate(body);
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_API_URL}/employee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  }
);

export const updateEmployee = createAsyncThunk(
  "employee/update",
  async ({ employeeId, body }) => {
    formatTime(body);
    formatDate(body);
    body.currentjob = body.job;
    body.job = null;
    const token = sessionStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/employee/${employeeId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    return await response.json();
  }
);

export const getEmployee = createAsyncThunk("employee/get", async (id) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/employee/search?query=${id}`,
    {
      headers: {
        authorization: `bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
});
export const deleteEmployee = createAsyncThunk(
  "employee/delete",
  async (id) => {
    const token = sessionStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/employee/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  }
);
export const putMinutesLost = createAsyncThunk(
  "minutes/put",
  async ({ id, formData }) => {
    const token = sessionStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/employee/${id}/minutes-lost`,
      {
        method: "PUT",
        headers: {
          authorization: `bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    return data;
  }
);

export const postFile = createAsyncThunk("resume/post", async (file) => {
  const token = sessionStorage.getItem("token");
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
export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmployees.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getEmployees.fulfilled, (state, action) => {
      state.employeeData = action.payload;
      console.log(action.payload);
      state.status = "successful";
    });
    builder.addCase(getEmployee.fulfilled, (state, action) => {
      console.log("fulfiled");
      state.getEmployee = action.payload;
    });
    builder.addCase(getEmployee.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
    });
    builder.addCase(getEmployee.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(postEmployees.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(postEmployees.fulfilled, (state, action) => {
      state.status = "successful";
    });
    builder.addCase(postEmployees.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(updateEmployee.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(updateEmployee.fulfilled, (state, action) => {
      console.log(action.payload);
      state.status = "successful";
    });
    builder.addCase(updateEmployee.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(deleteEmployee.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      state.status = "successful";
    });
    builder.addCase(deleteEmployee.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(postFile.fulfilled, (state, action) => {
      state.status = "successful";
    });
    builder.addCase(postFile.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(postFile.rejected, (state, action) => {
      console.log("rejected");
      console.log(action.error);
    });
    builder.addCase(putMinutesLost.fulfilled, (state, action) => {
      console.log(action.payload);
      state.status = "successful";
    });
    builder.addCase(putMinutesLost.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(putMinutesLost.rejected, (state, action) => {
      console.log("rejected");
      console.log(action.error);
    });
  },
});
export default employeesSlice.reducer;
