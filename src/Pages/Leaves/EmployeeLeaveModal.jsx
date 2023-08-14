import { Close } from "@mui/icons-material";
import { Box, Button, FormControl, Grid, IconButton, InputLabel, Modal, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeaves, postLeave } from "./LeaveSlice";
import { useFormik } from "formik";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const useStyles = makeStyles(() => {
  return {
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "70%",
      minHeight: "90vh",
      backgroundColor: "white",
      boxShadow: 24,
      display: "flex",
      flexDirection: "column",
      padding: "4rem 4rem",
    },
    justifySpaceBetween: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "3rem",
    },
  };
});
export default function EmployeeLeaveModal({ childModalOpen, handleChildModalClose }) {
  const classes = useStyles();
  const { getEmployee } = useSelector((state) => state.employees);
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    const id = JSON.stringify(getEmployee?.currentjob?.employee_id)
    dispatch(postLeave({ id: id, body: values }));
  };

  const formik = useFormik({
    initialValues: {
      reason: "",
      start_date: "",
      end_date: "",
    },
    onSubmit,
  });
  function formatDate(arg) {
    const formattedDate = new Date(arg);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const day = String(formattedDate.getDate()).padStart(2, "0");
    const formattedDateString = `${year}-${month}-${day}`;
    return formattedDateString;
  }

  const handleSave = () => {
    handleChildModalClose()
    formik.handleSubmit()
    dispatch(getLeaves())
  }

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

          <Grid container spacing={3}>
            <Grid item md={12}>
              <InputLabel>Reason:</InputLabel>
              <TextField
                variant="outlined"
                fullWidth
                name="reason"
                {...formik.getFieldProps("reason")}
              />
            </Grid>
            <Grid item md={6}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Leave Start Date"
                    fullWidth
                    onChange={(value) => {
                      formik.setFieldValue("start_date", formatDate(value));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>{" "}
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Leave End Date"
                    fullWidth
                    onChange={(value) => {
                      formik.setFieldValue("end_date", formatDate(value));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>{" "}
              </FormControl>
            </Grid>
            <Grid item md={6} sx={{ display: "flex", gap: "2rem" }}>
              <Button
                disableElevation
                variant="contained"
                size="large"
                onClick={handleSave}
                sx={{
                  padding: "1rem 4rem",
                  fontWeight: 700,
                  color: "white",
                  fontSize: "1.4rem",
                }}
              >
                Save
              </Button>
              <Button
                disableElevation
                variant="outlined"
                size="large"
                sx={{ padding: "1rem 4rem", fontWeight: 700, fontSize: "1.4rem" }}
                onClick={handleChildModalClose}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
