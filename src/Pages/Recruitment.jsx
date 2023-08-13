import { Box, Button, Container, Icon, InputAdornment, Modal, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import SecondaryAppbar from "../components/SecondaryAppbar";
import { Add, Mail, Phone, Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import PositionModal from "./NewApplicant/PositionModal";
import AddEmployee from "./AddEmployees/AddEmployee";
import { getApplicants } from "./NewApplicant/applicantsSlice";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/loadingScreen";
const useStyles = makeStyles((theme) => {
  return {
    recruitement: {
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
    },
  };
});
function Recruitment() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const dispatch = useDispatch();
  const { applicantsData, status } = useSelector((state) => state.applicants);
  const applicants = applicantsData.applicants;

  useEffect(() => {
    dispatch(getApplicants());
  }, []);

  return (
    <div className={classes.recruitement}>
      {status === "loading" ? <LoadingScreen /> : null}
      <Container>
        <SecondaryAppbar
          title="Employee"
          button="New Applicant"
          link="/recruitment/applicant"
        />
        <table className={classes.table} border={1}>
          <thead className={classes.tableHead}>
            <tr>
              <td className={classes.td}>
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
                    startIcon={<Add />}
                  >
                    Add Job Position
                  </Button>
                  <PositionModal
                    handleModalClose={handleModalClose}
                    handleModalOpen={modalOpen}
                  />
                </div>
              </td>
              <td className={classes.td}></td>
              <td
                className={classes.td}
                style={{
                  display: "flex",
                  justifyContent: "end",
                  width: "100%",
                }}
              >
                <TextField
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
              </td>
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
                Applied For
              </th>
            </tr>
            {applicants?.map((row) => {
              return (
                <tr key={"applicant" + row.id}>
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
                        {row.first_name} {row.last_name}
                      </strong>
                      <br /> Title: <strong>{row.title}</strong>
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
                  <td className={classes.td}>
                    <div>{row.position?.name}</div>
                    <div>{row.subtitle}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Container>
    </div>
  );
}

export default Recruitment;
