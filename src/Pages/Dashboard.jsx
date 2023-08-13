import { Add, Mail, MoreVert, Phone } from "@mui/icons-material";
import { Box, Button, Container, IconButton, Paper, Typography } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SecondaryAppbar from "../components/SecondaryAppbar";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "./AddEmployees/employeesSlice";
import LoadingScreen from "../components/loadingScreen";
import EmployeeDetails from "./Employee/employeeDetails";
import { getAppraisals } from "./Appraisals/appraisalsSlice";
const useStyles = makeStyles(() => {
  return {
    dashboard: {
      marginTop: "6rem",
      padding: "2rem 0rem",
      width: "100%",
      backgroundColor: "#f0f0f0",
    },
    employeeImage: {
      height: "5rem",
      width: "5rem",
      borderRadius: "50%",
      objectFit: "cover",
      objectPosition: "center",
      backgroundColor: "#2fd5c8",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      border: "1px solid #2fd5c8",
      marginTop: "5rem",
      borderRadius: "90rem",
    },
    tableHead: {
      height: "4rem",
    },
    td: {
      padding: "1rem",
      fontSize: "1.4rem",
      border: 0,
      background: "#fafafa",
    },
  };
});

function Dashboard() {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { employeeData: { employees }, status } = useSelector((state) => state.employees);
  // change sessions to employee slice
  const { sessions } = useSelector((state) => state.awards);
  const token = localStorage.getItem("token");
  const [activeEmployee, setActiveEmployee] = useState({});
  useEffect(() => {
    if (!token) return navigate("/");
    dispatch(getEmployees());
    dispatch(getAppraisals());
  }, []);

  return (
    <div className={classes.dashboard}>
      <Container>
        {status === "loading" ? <LoadingScreen /> : null}
        {activeEmployee.id ? (
          <EmployeeDetails activeEmployee={activeEmployee} setActiveEmployee={setActiveEmployee} sessions={sessions} />
        ) : (
          <>
              <SecondaryAppbar
                title="Employee"
                button="Add Employee"
                link="/dashboard/addemployee"
              />
              <table className={classes.table} border={1}>
                <thead className={classes.tableHead}>
                  <tr>
                    <th
                      className={classes.td}
                      style={{
                        border: "1px solid #2fd5c8",
                        padding: "2rem 0rem",
                      }}
                    >
                      Employee
                    </th>
                    <th
                      className={classes.td}
                      style={{
                        border: "1px solid #2fd5c8",
                        padding: "2rem 0rem",
                      }}
                    >
                      Contact
                    </th>
                    <th
                      className={classes.td}
                      style={{
                        border: "1px solid #2fd5c8",
                        padding: "2rem 0rem",
                      }}
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employees?.map((employee) => {
                    return (
                      <tr
                        key={employee.id}
                        onClick={() => setActiveEmployee(employee)}
                      >
                        <td
                          className={classes.td}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "2rem",
                          }}
                        >
                          {/* <img src="" alt="" className={classes.employeeImage} /> */}
                          <div>
                            <strong>
                              {employee?.first_name} {employee?.last_name}
                            </strong>
                            <br /> Title:{" "}
                            <strong>
                              {employee.jobs.map((job) => {
                                return job?.position?.name;
                              })}
                            </strong>
                          </div>
                        </td>
                        <td className={classes.td}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "1rem",
                            }}
                          >
                            <Mail color="primary" /> {employee.email}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "1rem",
                            }}
                          >
                            <Phone color="primary" />
                            {employee?.phone}
                          </div>
                        </td>
                        <td className={classes.td}>
                          <div>
                            {employee?.jobs.map((job) => {
                              return (
                                <strong key={job.id}>
                                  {job.type.toUpperCase()}
                                </strong>
                              );
                            })}
                          </div>
                          <div>
                            {employee?.jobs.map((job) => {
                              return job.position.name;
                            })}
                          </div>
                          <div>{employee?.subtitle}</div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
          </>
        )}
      </Container>
    </div>
  );
}

export default Dashboard;
