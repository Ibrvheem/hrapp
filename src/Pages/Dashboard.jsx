import { Add, Mail, Phone } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SecondaryAppbar from "../components/SecondaryAppbar";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../store/employeesSlice";

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
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employeeData } = useSelector((state) => state.employees);
  const employees = employeeData.employees;
  console.log(employees);
  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  console.log(process.env.REACT_APP_API_URL);
  const rows = [
    {
      name: "Ibrahim Aliyu",
      title: "Admin",
      email: "Ibrahim@email.com",
      phone: "+23481 6308 9308",
      status: "Status",
      subtitle: "subtitle under status",
    },
    {
      name: "Ibrahim Aliyu",
      title: "Admin",
      email: "Ibrahim@email.com",
      phone: "+23481 6308 9308",
      status: "Status",
      subtitle: "subtitle under status",
    },
  ];
  return (
    <div className={classes.dashboard}>
      <Container>
        <SecondaryAppbar
          title="Employee"
          button="Add Employee"
          link="/addemployee"
        />
        <table className={classes.table} border={1}>
          <thead className={classes.tableHead}>
            <div></div>
          </thead>

          <tr>
            <th
              className={classes.td}
              style={{ border: "1px solid #2fd5c8", padding: "2rem 0rem" }}
            >
              Employee
            </th>
            <th
              className={classes.td}
              style={{ border: "1px solid #2fd5c8", padding: "2rem 0rem" }}
            >
              Contact
            </th>
            <th
              className={classes.td}
              style={{ border: "1px solid #2fd5c8", padding: "2rem 0rem" }}
            >
              Status
            </th>
          </tr>
          {employees?.map((employee) => {
            return (
              <tr>
                <td
                  className={classes.td}
                  style={{ display: "flex", alignItems: "center", gap: "2rem" }}
                >
                  <img src="" alt="" className={classes.employeeImage} />
                  <div>
                    <strong>
                      {employee.first_name} {employee.last_name}
                    </strong>{" "}
                    <br /> Title:{" "}
                    <strong>
                      {employee.jobs.map((job) => {
                        return job.position.name;
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
                    {employee.phone}
                  </div>
                </td>
                <td className={classes.td}>
                  <div>{employee.status}</div>
                  <div>{employee.subtitle}</div>
                </td>
              </tr>
            );
          })}
        </table>
      </Container>
    </div>
  );
}

export default Dashboard;
