import { Add, ErrorOutline, Mail, MoreVert, Phone } from "@mui/icons-material";
import { Box, Button, Container, IconButton, Menu, MenuItem, Modal, Paper, Typography } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SecondaryAppbar from "../components/SecondaryAppbar";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, getEmployees } from "./AddEmployees/employeesSlice";
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
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "40rem",
      minHeight: "20rem",
      backgroundColor: "white",
      boxShadow: 24,
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
      padding: "2rem",
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false)

  const handleOpenOptions = (ev, employee) => {
    setAnchorEl(ev.currentTarget);
    setActiveEmployee(employee)
  };
  const handleCloseOptions = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    dispatch(deleteEmployee(activeEmployee.id))
    handleModalClose()
  }

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    handleCloseOptions()
  };

  const handleCloseDetails = () => {
    setShowDetails(false)
    setAnchorEl(null)
  }

  useEffect(() => {
    if (!token) return navigate("/");
    dispatch(getEmployees());
    dispatch(getAppraisals());
  }, []);

  return (
    <div className={classes.dashboard}>

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal} sx={{ display: 'grid', justifyItems: 'center' }}>
          <ErrorOutline sx={{ fontSize: '4rem', color: 'red' }} />
          <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ color: 'red', fontWeight: 700 }}>
            Delete Employee
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h3" sx={{ textAlign: 'center' }}>
            Are you sure you want to delete this employee <br />
            You can't undo this action
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "2rem",
              margin: "2rem 0rem",
            }}
          >
            <Button
              size="large"
              variant="outlined"
              onClick={handleModalClose}
              sx={{ fontWeight: 700, padding: "1rem 3rem" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              size="large"
              variant="contained"
              sx={{
                color: "white",
                fontWeight: 700,
                padding: "1rem 3rem",
              }}
            >
              Yes
            </Button>
          </div>
        </Box>
      </Modal>
      <Container>
        {status === "loading" ? <LoadingScreen /> : null}
        {showDetails ? (
          <EmployeeDetails activeEmployee={activeEmployee} setActiveEmployee={setActiveEmployee} handleCloseDetails={handleCloseDetails} sessions={sessions} />
        ) : (
          <>
              <SecondaryAppbar
                title="Employee"
                button="Add Employee"
                link="/dashboard/addemployee"
              />

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseOptions}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={() => setShowDetails(true)}>View Details</MenuItem>
                <MenuItem onClick={handleModalOpen}>Delete</MenuItem>
                {/* <MenuItem onClick={handleEdit}>Edit</MenuItem> */}
              </Menu>
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
                    <th
                      className={classes.td}
                      style={{
                        border: "1px solid #2fd5c8"
                      }}
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {employees?.map((employee) => {
                    return (
                      <tr
                        key={employee.id}
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
                        <td className={classes.td}>
                          <Button onClick={(ev) => handleOpenOptions(ev, employee)}><MoreVert sx={{ fontSize: '2rem' }} /></Button>
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
