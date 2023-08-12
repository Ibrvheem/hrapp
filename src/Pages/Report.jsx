import { EmojiEvents, Print } from "@mui/icons-material";
import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllReports,
  getEmployeesFromLocalApi,
  getReport,
  unSetReport,
  unSetReports,
} from "./reports/reportsSlice";
import { useNavigate } from "react-router-dom";
import { getEmployees } from "./AddEmployees/employeesSlice";
import LoadingScreen from "../components/loadingScreen";

const useStyles = makeStyles((theme) => {
  return {
    report: {
      marginTop: "6rem",
      padding: "4rem 0rem 2rem",
      width: "100%",
      minHeight: "80vh",
    },
    card: { width: "100%", minHeight: "85vh", padding: "1rem 2rem" },
    employee_list: {
      backgroundColor: "#f0f0f0",
      borderRadius: "1rem",
      marginBlockStart: "2rem",
      padding: "1rem",
    },
    employee: {
      backgroundColor: "#fff",
      borderRadius: "1rem",
      display: "flex",
      justifyContent: "space-between",
      padding: "2rem",
      marginBlockEnd: ".5rem",
    },
  };
});

function Report() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const classes = useStyles();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const {
    employeeData: { employees },
    status: employeeStatus,
  } = useSelector((state) => state.employees);
  const {
    currentReport,
    reports,
    status: reportStatus,
  } = useSelector((state) => state.reports);

  const [activeEmployee, setActiveEmployee] = useState({});
  const handleShowDetails = (employee) => {
    setActiveEmployee(employee);
  };

  const handlePrintReport = (employee_id) => {
    dispatch(getReport(employee_id));
  };

  const handlePrintAllReport = () => {
    dispatch(getAllReports());
  };

  useEffect(() => {
    if (currentReport.url) window.location.href = currentReport.url;
  }, [currentReport]);
  useEffect(() => {
    if (reports.url) window.location.href = reports.url;
  }, [reports]);
  useEffect(() => {
    if (!token) return navigate("/");
    dispatch(getEmployees());
  }, []);

  return (
    <div className={classes.report}>
      <Container>
        {reportStatus === "loading" || employeeStatus === "loading" ? (
          <LoadingScreen />
        ) : null}
        <Grid container spacing={2}>
          <Grid item md={7}>
            <Card className={classes.card}>
              <div style={{ width: "100%" }}>
                <Button
                  onClick={() => handlePrintAllReport()}
                  variant="contained"
                  sx={{ color: "white", fontWeight: 700, fontSize: "1.4rem" }}
                  startIcon={<Print />}
                >
                  Print Cumulative Report
                </Button>
              </div>
              <Box className={classes.employee_list}>
                {employees?.length ? (
                  employees?.map((employee) => (
                    <Box
                      onClick={() => handleShowDetails(employee)}
                      key={"employee-" + employee.id}
                      className={classes.employee}
                    >
                      <Typography>
                        {employee.first_name + " " + employee.last_name}
                      </Typography>
                      <Typography>
                        {employee.currentjob?.position.name}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography>No Employees Yet</Typography>
                )}
              </Box>
            </Card>
          </Grid>
          <Grid item md={5}>
            <Card
              className={classes.card}
              sx={{ display: "grid", alignItems: "center" }}
            >
              {activeEmployee.id ? (
                <Box>
                  <Typography fontWeight={700}>
                    {activeEmployee.first_name + " " + activeEmployee.last_name}
                  </Typography>
                  <Typography>
                    {activeEmployee.currentjob?.position.name}
                  </Typography>
                  {activeEmployee.leaves.length ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBlockStart: "1rem",
                      }}
                    >
                      <Typography fontWeight={700}>Leaves:</Typography>
                      {activeEmployee.leaves.map((leave) => {
                        const startDate = new Date(leave.start_date);
                        const endDate = new Date(leave.end_date);
                        return (
                          <Box key={"leave-" + leave.id}>
                            <Typography>{`${startDate.getDate()} ${
                              months[startDate.getMonth()]
                            }, ${startDate.getFullYear()}`}</Typography>
                            <Typography>{`${endDate.getDate()} ${
                              months[endDate.getMonth()]
                            }, ${endDate.getFullYear()}`}</Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  ) : null}
                  <Button
                    onClick={() => handlePrintReport(activeEmployee.id)}
                    variant="contained"
                    sx={{
                      color: "white",
                      fontWeight: 700,
                      fontSize: "1.4rem",
                      marginBlockStart: "4rem",
                    }}
                    startIcon={<Print />}
                  >
                    Print Report
                  </Button>
                </Box>
              ) : (
                <Typography>Select An Employee to See Details</Typography>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Report;
