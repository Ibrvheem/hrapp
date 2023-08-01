import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  appraisalsData: [],
  status: "idle",
  error: null,
};

const token = localStorage.getItem("token");
export const getAppraisals = createAsyncThunk("appraisals/get", async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/appraisals`, {
    headers: {
      authorization: `bearer ${token}`,
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.error);
  }
});

export const deleteAppraisal = createAsyncThunk(
  "appraisal/delete",
  async (id) => {
    const data = await fetch(
      `${process.env.REACT_APP_API_URL}/appraisal/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `bearer ${token}`,
        },
      }
    );
    const result = await data.json();
    return result;
  }
);

export const deleteEvaluationItem = createAsyncThunk(
  "appraisal/item/delete",
  async ({ groupId, itemId }) => {
    const data = await fetch(
      `${process.env.REACT_APP_API_URL}/appraisal/${groupId}/evaluation/${itemId}`,
      {
        method: "DELETE",
        headers: {
          authorization: `bearer ${token}`,
        },
      }
    );
    const result = await data.json();
    return result;
  }
);

export const updateAppraisal = createAsyncThunk(
  "appraisal/update",
  async ({ id, name }) => {
    const data = await fetch(
      `${process.env.REACT_APP_API_URL}/appraisal/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${token}`,
        },
        body: JSON.stringify({ name: name }),
      }
    );
    const result = await data.json();
    return result;
  }
);

export const updateEvaluationItem = createAsyncThunk(
  "appraisal/item/update",
  async ({ groupId, evaluationItemId, name }) => {
    const data = await fetch(
      `${process.env.REACT_APP_API_URL}/appraisal/${groupId}/evaluation/${evaluationItemId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${token}`,
        },
        body: JSON.stringify({ name: name }),
      }
    );
    const result = await data.json();
    return result;
  }
);

export const postAppraisal = createAsyncThunk(
  "appraisal/post",
  async (body) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/appraisal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error);
    }
  }
);

export const postEvaluationItem = createAsyncThunk(
  "appraisal/item/post",
  async (body) => {
    if (body.name !== "" && body.groupId) {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/appraisal/${body.groupId}/evaluation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${token}`,
          },
          body: JSON.stringify([body.name]),
        }
      );
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.error);
      }
    }
  }
);

export const appraisalsSlice = createSlice({
  name: "appraisal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAppraisals.fulfilled, (state, action) => {
      state.appraisalsData = action.payload;
      console.log("fulfilled");
    });
    builder.addCase(postAppraisal.fulfilled, (state) => {
      state.status = "successful";
      console.log("fulfilled");
    });
    builder.addCase(postAppraisal.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(postEvaluationItem.fulfilled, (state) => {
      state.status = "successful";
      console.log("fulfilled");
    });
    builder.addCase(postEvaluationItem.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(deleteAppraisal.fulfilled, (state) => {
      state.status = "successful";
      console.log("fulfilled");
    });
    builder.addCase(deleteAppraisal.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(deleteEvaluationItem.fulfilled, (state) => {
      state.status = "successful";
      console.log("fulfilled");
    });
    builder.addCase(deleteEvaluationItem.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(updateEvaluationItem.fulfilled, (state) => {
      state.status = "successful";
      console.log("fulfilled");
    });
    builder.addCase(updateEvaluationItem.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(updateAppraisal.fulfilled, (state) => {
      state.status = "successful";
      console.log("fulfilled");
    });
    builder.addCase(updateAppraisal.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
  },
});
export default appraisalsSlice.reducer;
