import { configureStore } from "@reduxjs/toolkit";
import positionsSlice from "../Pages/Applicant/positionsSlice";
import applicantsSlice from "../Pages/Applicant/applicantsSlice";
import employeesSlice from "../Pages/Employee/employeesSlice";
import authSlice from "../Pages/Auth/authSlice";
import LeaveSlice from "../Pages/Leaves/LeaveSlice";
import appraisalsSlice from "../Pages/Appraisals/appraisalsSlice";
import awardsSlice from "../Pages/awards/awardsSlice";
import reportsSlice from "../Pages/reports/reportsSlice";
import sessionSlice from "../components/session/sessionSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    employees: employeesSlice,
    applicants: applicantsSlice,
    positions: positionsSlice,
    leaves: LeaveSlice,
    appraisals: appraisalsSlice,
    awards: awardsSlice,
    reports: reportsSlice,
    sessions: sessionSlice,
  },
});
