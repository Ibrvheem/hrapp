import { configureStore } from "@reduxjs/toolkit";
import positionsSlice from "../Pages/NewApplicant/positionsSlice";
import applicantsSlice from "../Pages/NewApplicant/applicantsSlice";
import employeesSlice from "../Pages/AddEmployees/employeesSlice";
import authSlice from "../Pages/Auth/authSlice";
import LeaveSlice from "../Pages/Leaves/LeaveSlice";
import appraisalsSlice from "../Pages/Appraisals/appraisalsSlice";
import awardsSlice from "../Pages/awards/awardsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    employees: employeesSlice,
    applicants: applicantsSlice,
    positions: positionsSlice,
    leaves: LeaveSlice,
    appraisals: appraisalsSlice,
    awards: awardsSlice,
  },
});
