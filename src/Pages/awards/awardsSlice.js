import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  awards: [],
  sessions: [],
  status: "idle",
  error: null,
};

const token = localStorage.getItem("token");
export const getSessions = createAsyncThunk("sessions/get", async () => {
  const data = await fetch(`${process.env.REACT_APP_API_URL}/sessions`, {
    headers: {
      authorization: `bearer ${token}`,
    },
  });
  const result = await data.json();
  return result;
});
export const getAwards = createAsyncThunk("awards/get", async () => {
  const data = await fetch(`${process.env.REACT_APP_API_URL}/awards`, {
    headers: {
      authorization: `bearer ${token}`,
    },
  });
  const result = await data.json();
  return result;
});

export const postAward = createAsyncThunk("award/post", async (body) => {
  const data = await fetch(`${process.env.REACT_APP_API_URL}/award`, {
    method: "POST",
    headers: {
      authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const response = await data.json();
  return response;
});

export const deleteAward = createAsyncThunk("award/delete", async (id) => {
  const data = await fetch(`${process.env.REACT_APP_API_URL}/award/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `bearer ${token}`,
    },
  });
  return { id };
});

export const assignAward = createAsyncThunk(
  "award/assign",
  async ({ award, session, term, employee_id }) => {
    const body = {
      employee_id: employee_id,
      description: award.description,
      title: award.title,
      session: session,
      term: term,
    };
    const data = await fetch(
      `${process.env.REACT_APP_API_URL}/award/${award.id}`,
      {
        method: "PUT",
        headers: {
          authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const response = await data.json();
    return response;
  }
);

export const editAward = createAsyncThunk(
  "award/edit",
  async ({ award, session, term }) => {
    const body = {
      employee_id: award.employee?.id || null,
      description: award.description,
      title: award.title,
      session: session,
      term: term,
    };
    const data = await fetch(
      `${process.env.REACT_APP_API_URL}/award/${award.id}`,
      {
        method: "PUT",
        headers: {
          authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const response = await data.json();
    return response;
  }
);

export const awardsSlice = createSlice({
  name: "awards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSessions.fulfilled, (state, action) => {
      state.sessions = action.payload;
      state.status = "successful";
    });
    builder.addCase(getSessions.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getSessions.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(getAwards.fulfilled, (state, action) => {
      state.awards = action.payload;
      state.status = "successful";
    });
    builder.addCase(getAwards.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getAwards.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(postAward.fulfilled, (state, action) => {
      state.awards.awards.push(action.payload);
      state.status = "successful";
    });
    builder.addCase(postAward.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(postAward.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(deleteAward.fulfilled, (state, action) => {
      state.awards.awards = state.awards.awards.filter(
        (award) => award.id !== action.payload.id
      );
      state.status = "successful";
    });
    builder.addCase(deleteAward.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deleteAward.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(assignAward.fulfilled, (state, action) => {
      let editedAward = state.awards.awards.find(
        (award) => award.id === action.payload.id
      );
      editedAward.employee = action.payload.employee;
      state.status = "successful";
    });
    builder.addCase(assignAward.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(assignAward.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(editAward.fulfilled, (state, action) => {
      let editedAward = state.awards.awards.find(
        (award) => award.id === action.payload.id
      );
      editedAward.title = action.payload.title;
      editedAward.description = action.payload.description;
      editedAward.employee = action.payload.employee;
      state.status = "successful";
    });
    builder.addCase(editAward.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(editAward.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
  },
});

export default awardsSlice.reducer;
