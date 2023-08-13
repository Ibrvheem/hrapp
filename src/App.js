import { ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import Layout from "./components/Layout";
import { Route, Router, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import AddEmployee from "./Pages/AddEmployees/AddEmployee";
import Recruitment from "./Pages/Recruitment";
import Leaves from "./Pages/Leaves/Leaves";
import Appraisal from "./Pages/Appraisal";
import Awards from "./Pages/Awards";
import Report from "./Pages/Report";
import Signin from "./Pages/Auth/Signin";
import NewApplicant from "./Pages/NewApplicant/NewApplicant";
import { Provider } from "react-redux";
import { store } from "./store/store";
import RequireAuth from "./Pages/Auth/requireAuth";
const theme = createTheme({
  palette: {
    primary: {
      main: "#2fd5c8",
      // light: "#D3FFE7",
    },
    // secondary: {
    //   main: "#5932EA",
    // },
    // danger: {
    //   main: "#DF0404",
    //   light: "#FFC5C5",
    // },
  },
  typography: {
    fontFamily: "Poppins",
    h1: {
      fontSize: "4rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2.6rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "2rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: "1.7rem",
      fontWeight: 700,
    },
  },
});
function App({ children }) {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<Signin />}></Route>
        <Route path="/" element={<Layout />}>
          <Route
            path="/dashboard"
            element={<RequireAuth><Dashboard /></RequireAuth>}
          ></Route>
          <Route
            path="/dashboard/addemployee"
            element={<RequireAuth><AddEmployee /></RequireAuth>}
          ></Route>
          <Route path="/recruitment" element={<RequireAuth><Recruitment /></RequireAuth>}></Route>
          <Route
            path="/recruitment/applicant"
            element={<RequireAuth><NewApplicant /></RequireAuth>}
          ></Route>
          <Route path="/leaves" element={<RequireAuth><Leaves /></RequireAuth>}></Route>
          <Route path="/appraisal" element={<RequireAuth><Appraisal /></RequireAuth>}></Route>
          <Route path="/awards" element={<RequireAuth><Awards /></RequireAuth>}></Route>
          <Route path="/report" element={<RequireAuth><Report /></RequireAuth>}></Route>
        </Route>
      </>
    )
  );
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
