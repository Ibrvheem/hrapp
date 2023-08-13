import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  appraisalsData: [],
  status: "idle",
  error: null,
};

export const getAppraisals = createAsyncThunk("appraisals/get", async () => {
  const token = sessionStorage.getItem("token");
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
    const token = sessionStorage.getItem("token");
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
    if (data.ok) return { id };
    return result;
  }
);

export const deleteEvaluationItem = createAsyncThunk(
  "appraisal/item/delete",
  async ({ groupId, itemId }) => {
    const token = sessionStorage.getItem("token");
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
    if (data.ok) return { groupId, itemId };
    return result;
  }
);

export const updateAppraisal = createAsyncThunk(
  "appraisal/update",
  async ({ id, name }) => {
    const token = sessionStorage.getItem("token");
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
    if (data.ok) return { id, name };
    return result;
  }
);

export const updateEvaluationItem = createAsyncThunk(
  "appraisal/item/update",
  async ({ groupId, evaluationItemId, name }) => {
    const token = sessionStorage.getItem("token");
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
    if (data.ok) return { groupId, itemId: evaluationItemId, name };
    return result;
  }
);

export const postAppraisal = createAsyncThunk(
  "appraisal/post",
  async (body) => {
    const token = sessionStorage.getItem("token");
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
    const token = sessionStorage.getItem("token");
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

export const putAppraisal = createAsyncThunk("appraisal/put", async (body) => {
  const token = sessionStorage.getItem("token");
  const data = await fetch(
    `${process.env.REACT_APP_API_URL}/employee/${body.employeeId}/appraisal`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },
      body: JSON.stringify(body.appraisal),
    }
  );
  const result = await data.json();
  // if (data.ok) return { appraisal: body.apppraisal };
  return result;
});

export const appraisalsSlice = createSlice({
  name: "appraisal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAppraisals.fulfilled, (state, action) => {
      state.appraisalsData = action.payload;
      state.status = "successful";
    });
    builder.addCase(getAppraisals.pending, (state, action) => {
      state.status = "loading";
      state.appraisalsData = action.payload;
    });
    builder.addCase(getAppraisals.rejected, (state, action) => {
      state.status = "failed";
      state.appraisalsData = action.payload;
    });
    builder.addCase(postAppraisal.fulfilled, (state, action) => {
      state.status = "successful";
    });
    builder.addCase(postAppraisal.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(postAppraisal.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(postEvaluationItem.fulfilled, (state, action) => {
      state.status = "successful";
    });
    builder.addCase(postEvaluationItem.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(postEvaluationItem.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(deleteAppraisal.fulfilled, (state, action) => {
      state.appraisalsData = state.appraisalsData.filter(
        (appraisal) => appraisal.id !== action.payload.id
      );
      state.status = "successful";
    });
    builder.addCase(deleteAppraisal.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteAppraisal.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(deleteEvaluationItem.fulfilled, (state) => {
      state.status = "successful";
    });
    builder.addCase(deleteEvaluationItem.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteEvaluationItem.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(updateEvaluationItem.fulfilled, (state, { payload }) => {
      state.status = "successful";
      const appraisalToUpdate = state.appraisalsData.find(
        (appraisal) => appraisal.id === payload.groupId
      );
      appraisalToUpdate.evaluationitems.find(
        (item) => item.id === payload.itemId
      ).name = payload.name;
    });
    builder.addCase(updateEvaluationItem.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateEvaluationItem.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(updateAppraisal.fulfilled, (state, action) => {
      state.status = "successful";
      const appraisalToUpdate = state.appraisalsData.find(
        (appraisal) => appraisal.id === action.payload.id
      );
      appraisalToUpdate.name = action.payload.name;
    });
    builder.addCase(updateAppraisal.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateAppraisal.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(putAppraisal.fulfilled, (state, action) => {
      state.status = "successful";
    });
    builder.addCase(putAppraisal.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(putAppraisal.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
  },
});
export default appraisalsSlice.reducer;
