import { Close } from "@mui/icons-material";
import { Box, Grid, IconButton, Modal, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useSelector } from "react-redux";
import LeaveInformation from "./LeaveInformation";

const useStyles = makeStyles(() => {
  return {
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "70%",
      height: "90vh",
      backgroundColor: "white",
      boxShadow: 24,
      display: "flex",
      flexDirection: "column",
      borderRadius: "2rem",
      padding: "4rem 4rem",
    },
    justifySpaceBetween: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "3rem",
    },
  };
});
function EmployeeLeave({ childModalOpen, handleChildModalClose }) {
  const classes = useStyles();
  const { getEmployee } = useSelector((state) => state.employees);

  return (
    <div>
      <Modal
        open={childModalOpen}
        onClose={handleChildModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h2" color="primary">
              Submit Employee Leave
            </Typography>
            <IconButton onClick={handleChildModalClose}>
              <Close sx={{ fontSize: "4rem" }} color="primary" />
            </IconButton>
          </Grid>
          <Grid container>
            <Grid item md={5}>
              <div className={classes.justifySpaceBetween}>
                <Typography variant="body2" sx={{ width: "33%" }}>
                  First Name
                </Typography>
                <Typography variant="body2" sx={{ width: "5%" }}>
                  :
                </Typography>
                <Typography variant="body2" sx={{ width: "62%" }}>
                  {getEmployee.first_name}
                </Typography>
              </div>
              <div className={classes.justifySpaceBetween}>
                <Typography variant="body2" sx={{ width: "33%" }}>
                  Middle Name
                </Typography>
                <Typography variant="body2" sx={{ width: "5%" }}>
                  :
                </Typography>
                <Typography variant="body2" sx={{ width: "62%" }}>
                  {getEmployee.middle_name}
                </Typography>
              </div>
              <div className={classes.justifySpaceBetween}>
                <Typography variant="body2" sx={{ width: "33%" }}>
                  Last Name
                </Typography>
                <Typography variant="body2" sx={{ width: "5%" }}>
                  :
                </Typography>
                <Typography variant="body2" sx={{ width: "62%" }}>
                  {getEmployee.last_name}
                </Typography>
              </div>
              <div className={classes.justifySpaceBetween}>
                <Typography variant="body2" sx={{ width: "33%" }}>
                  Email Address
                </Typography>
                <Typography variant="body2" sx={{ width: "5%" }}>
                  :
                </Typography>
                <Typography variant="body2" sx={{ width: "62%" }}>
                  {getEmployee.email}
                </Typography>
              </div>
            </Grid>
            <Grid item md={5}>
              <div className={classes.justifySpaceBetween}>
                <Typography variant="body2" sx={{ width: "33%" }}>
                  Phone No.
                </Typography>
                <Typography variant="body2" sx={{ width: "5%" }}>
                  :
                </Typography>
                <Typography variant="body2" sx={{ width: "62%" }}>
                  {getEmployee.phone}
                </Typography>
              </div>
              <div className={classes.justifySpaceBetween}>
                <Typography variant="body2" sx={{ width: "33%" }}>
                  Data Of Birth
                </Typography>
                <Typography variant="body2" sx={{ width: "5%" }}>
                  :
                </Typography>
                <Typography variant="body2" sx={{ width: "62%" }}>
                  {getEmployee.dob}
                </Typography>
              </div>
              <div className={classes.justifySpaceBetween}>
                <Typography variant="body2" sx={{ width: "33%" }}>
                  Gender
                </Typography>
                <Typography variant="body2" sx={{ width: "5%" }}>
                  :
                </Typography>
                <Typography variant="body2" sx={{ width: "62%" }}></Typography>
              </div>
              <div className={classes.justifySpaceBetween}>
                <Typography variant="body2" sx={{ width: "33%" }}>
                  Address
                </Typography>
                <Typography variant="body2" sx={{ width: "5%" }}>
                  :
                </Typography>
                <Typography variant="body2" sx={{ width: "62%" }}>
                  {getEmployee.home_address}
                </Typography>
              </div>
            </Grid>
            <Grid item md={2}>
              <img
                src={getEmployee.image}
                style={{ width: "100%", objectFit: "contain" }}
                alt=""
              />
            </Grid>
          </Grid>
          <LeaveInformation
            handleChildModalClose={handleChildModalClose}
            id={JSON.stringify(getEmployee?.currentjob?.employee_id)}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default EmployeeLeave;
