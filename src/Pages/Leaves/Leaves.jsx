import { Button, Container, InputAdornment, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { Mail, Phone, Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import SearchEmployeeModal from "./SearchEmployeeModal";
import { getLeaves } from "./LeaveSlice";
import LoadingScreen from "../../components/loadingScreen";
import EmployeeLeaveModal from "./EmployeeLeaveModal";
const useStyles = makeStyles((theme) => {
  return {
    leaves: {
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
      height: "5rem",
      border: "none",
    },
    td: {
      padding: "1rem",
      fontSize: "1.4rem",
      border: 0,
      background: "#fafafa",
      width: "33%",
    },
  };
});
function Leaves() {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const dispatch = useDispatch();
  const { leaveInformation, status } = useSelector((state) => state.leaves);

  const [staffOnLeave, setStaffOnLeave] = useState([]);

  const handleSearch = (ev) => {
    if (ev.target.value !== '')
    setStaffOnLeave(
      leaveInformation.employees.filter((staff) =>
        (staff.first_name + staff.last_name).toLowerCase().includes(ev.target.value.toLowerCase())
      )
    );
  };
  useEffect(() => {
    dispatch(getLeaves())
  }, []);
  useEffect(() => {
    setStaffOnLeave(leaveInformation.employees)
  }, [leaveInformation]);

  const [childModalOpen, setChildModalOpen] = useState(false);
  const handleChildModalClose = () => {
    setChildModalOpen(false);
    dispatch(getLeaves())
  }
  const handleChildModalOpen = () => setChildModalOpen(true);

  return (
    <div className={classes.leaves}>
      <Container>
        {status === "loading" ? <LoadingScreen /> : null}
        <table className={classes.table} border={1}>
          <thead className={classes.tableHead}>
            <tr>
              <th className={classes.td}>
                <div>
                  <Button
                    size="large"
                    variant="contained"
                    sx={{
                      height: "5rem",
                      width: "auto",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "1.4rem",
                    }}
                    onClick={handleModalOpen}
                  >
                    Submit Leave
                  </Button>
                  <SearchEmployeeModal
                    handleModalClose={handleModalClose}
                    handleChildModalOpen={handleChildModalOpen}
                    modalOpen={modalOpen}
                  />

                  <EmployeeLeaveModal
                    handleChildModalClose={handleChildModalClose}
                    childModalOpen={childModalOpen}
                  />
                </div>
              </th>
              <th className={classes.td}></th>
              <th
                className={classes.td}
                style={{
                  display: "flex",
                  justifyContent: "end",
                  width: "100%",
                }}
              >
                <TextField
                  onChange={handleSearch}
                  fullWidth
                  label="search"
                  inputProps={{
                    style: {
                      height: "5rem",
                      padding: "0 1rem",
                    },
                  }}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <Search color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </th>
            </tr>
          </thead>
          <tbody>
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
                Days Left
              </th>
            </tr>
            {staffOnLeave?.length ? staffOnLeave.map((row) => {
              const dayDifference =
                (new Date(row.leaves[0].end_date).getTime() -
                  new Date(row.leaves[0].start_date).getTime()) /
                (1000 * 3600 * 24);
              return (
                <tr key={"staff-" + row.id}>
                  <td
                    className={classes.td}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "2rem",
                      width: "100%",
                    }}
                  >
                    {/* <img
                    src={row.image}
                    alt=""
                    className={classes.employeeImage}
                  /> */}
                    <div>
                      <strong>
                        {row.first_name} {row.middle_name} {row.last_name}
                      </strong>{" "}
                      <br />
                      <strong>{row.currentjob.position.name}</strong>
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
                      <Mail color="primary" /> {row.email}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <Phone color="primary" />
                      {row.phone}
                    </div>
                  </td>
                  <td className={classes.td}>{dayDifference + " day(s)"}</td>
                </tr>
              );
            }) : <tr><td>
              <Typography>No Employees Found</Typography>
            </td></tr>
            }
          </tbody>
        </table>
      </Container>
    </div>
  );
}

export default Leaves;
