import { ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import Layout from "./components/Layout";
import {
  Route,
  Router,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import AddEmployee from "./Pages/AddEmployee";
import Recruitment from "./Pages/Recruitment";
import NewApplicant from "./Pages/NewApplicant";
import Leaves from "./Pages/Leaves";
import Appraisal from "./Pages/Appraisal";
import Awards from "./Pages/Awards";
import Report from "./Pages/Report";
import Signin from "./Pages/Signin";
import { Provider } from "react-redux";
import { store } from "./store/store";
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
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/addemployee" element={<AddEmployee />}></Route>
          <Route path="/recruitment" element={<Recruitment />}></Route>
          <Route path="/newapplicant" element={<NewApplicant />}></Route>
          <Route path="/leaves" element={<Leaves />}></Route>
          <Route path="/appraisal" element={<Appraisal />}></Route>
          <Route path="/awards" element={<Awards />}></Route>
          <Route path="/report" element={<Report />}></Route>
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
