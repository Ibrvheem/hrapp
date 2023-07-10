import { configureStore } from "@reduxjs/toolkit";
import employeesSlice from "./employeesSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    employees: employeesSlice,
  },
});
