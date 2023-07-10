import {
  Box,
  Button,
  Container,
  Icon,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import SecondaryAppbar from "../components/SecondaryAppbar";
import { Add, Mail, Phone, Search } from "@mui/icons-material";

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
      width: "33%",
    },
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "40rem",
      height: "20rem",
      backgroundColor: "white",
      boxShadow: 24,
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
      borderRadius: "2rem",
      padding: "1rem 2rem",
    },
  };
});
function Recruitment() {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <div className={classes.recruitement}>
      <Container>
        <SecondaryAppbar
          title="Employee"
          button="New Applicant"
          link="/newapplicant"
        />
        <table className={classes.table} border={1}>
          <thead className={classes.tableHead}>
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
                <Modal
                  open={modalOpen}
                  onClose={handleModalClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box className={classes.modal}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Add Job Position
                    </Typography>
                    <TextField
                      label="Job Position"
                      variant="standard"
                      fullWidth
                    />
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
                        variant="contained"
                        sx={{
                          color: "white",
                          fontWeight: 700,
                          padding: "1rem 3rem",
                        }}
                      >
                        Submit
                      </Button>
                      <Button
                        size="large"
                        variant="outlined"
                        onClick={handleModalClose}
                        sx={{ fontWeight: 700, padding: "1rem 3rem" }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Box>
                </Modal>
              </div>
            </td>
            <td className={classes.td}></td>
            <td
              className={classes.td}
              style={{ display: "flex", justifyContent: "end", width: "100%" }}
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
              Applied For
            </th>
          </tr>
          {/* {rows.map((row) => {
            return (
              <tr>
                <td
                  className={classes.td}
                  style={{ display: "flex", alignItems: "center", gap: "2rem" }}
                >
                  <img src="" alt="" className={classes.employeeImage} />
                  <div>
                    <strong>{row.name}</strong> <br /> Title:{" "}
                    <strong>{row.title}</strong>
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
                  <div>{row.status}</div>
                  <div>{row.subtitle}</div>
                </td>
              </tr>
            );
          })} */}
        </table>
      </Container>
    </div>
  );
}

export default Recruitment;
