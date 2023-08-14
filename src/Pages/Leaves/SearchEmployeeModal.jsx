import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useDispatch } from "react-redux";
import { getEmployee } from "../Employee/employeesSlice";
import { useFormik } from "formik";
import { getLeaves } from "./LeaveSlice";

const useStyles = makeStyles(() => {
  return {
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
      justifyContent: "space-between",
      flexDirection: "column",
      gap: "1.5rem",
      padding: "2rem",
    },
  };
});
function SearchEmployeeModal({ modalOpen, handleModalClose, handleChildModalOpen }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(getEmployee(values.string)).then((action) => {
      const employee = action.payload;
      if (employee) handleChildModalOpen();
    });
    dispatch(getLeaves());
  };
  const formik = useFormik({
    initialValues: {
      string: "",
    },
    onSubmit,
  });

  const handleSubmit = () => {
    formik.handleSubmit()
    handleModalClose()
  }

  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Search Employee
          </Typography>
          <TextField
            label="Employee Phone or Email"
            variant="standard"
            fullWidth
            name="string"
            {...formik.getFieldProps("string")}
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
              onClick={handleSubmit}
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
  );
}

export default SearchEmployeeModal;
