import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import EmployeeLeave from "./EmployeeLeave";
import { useDispatch } from "react-redux";
import { getEmployee } from "../Employee/employeesSlice";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { getLeaves } from "./LeaveSlice";

const useStyles = makeStyles(() => {
  return {
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
function SearchEmployeeModal({ modalOpen, handleModalClose }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [childModalOpen, setChildModalOpen] = React.useState(false);
  const handleChildModalClose = () => setChildModalOpen(false);
  const handleChildModalOpen = () => setChildModalOpen(true);
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
            {/* Add Job Position */}
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
              onClick={formik.handleSubmit}
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
      <EmployeeLeave
        handleChildModalClose={handleChildModalClose}
        childModalOpen={childModalOpen}
      />
    </div>
  );
}

export default SearchEmployeeModal;
