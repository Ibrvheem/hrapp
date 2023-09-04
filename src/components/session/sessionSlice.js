import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  sessions: {},
  status: "idle",
};

export const getSessions = createAsyncThunk("sessions/get", async () => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${process.env.REACT_APP_API_URL}/sessions`, {
    headers: {
      authorization: `bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
});
export const postSession = createAsyncThunk("session/post", async (body) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${process.env.REACT_APP_API_URL}/session`, {
    method: "POST",
    headers: {
      authorization: `bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
});

export const updateSession = createAsyncThunk(
  "session/update",
  async ({ body, session_id }) => {
    const token = sessionStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/session/${session_id}`,
      {
        method: "PUT",
        headers: {
          authorization: `bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();
    return data;
  }
);

export const deleteSession = createAsyncThunk("session/delete", async (id) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/session/${id}`,
    {
      method: "DELETE",
      headers: {
        authorization: `bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
});

export const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSessions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSessions.fulfilled, (state, action) => {
        state.sessions = action.payload;
        state.status = "successful";
      })
      .addCase(getSessions.rejected, (state, action) => {
        const error = action.error.message;
        state.status = "failed";
        console.log(error);
      });
    builder
      .addCase(postSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postSession.fulfilled, (state, action) => {
        state.status = "successful";
      })
      .addCase(postSession.rejected, (state, action) => {
        const error = action.error.message;
        state.status = "failed";
        console.log(error);
      });
    builder
      .addCase(updateSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSession.fulfilled, (state, action) => {
        state.status = "successful";
      })
      .addCase(updateSession.rejected, (state, action) => {
        const error = action.error.message;
        state.status = "failed";
        console.log(error);
      });
    builder
      .addCase(deleteSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSession.fulfilled, (state, action) => {
        state.status = "successful";
      })
      .addCase(deleteSession.rejected, (state, action) => {
        const error = action.error.message;
        state.status = "failed";
        console.log(error);
      });
  },
});
export default sessionsSlice.reducer;
