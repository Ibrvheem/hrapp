import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useDispatch } from "react-redux";
import { createPosition } from "./positionsSlice";
import { useFormik } from "formik";

const useStyles = makeStyles((theme) => {
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
function PositionModal({ handleModalClose, handleModalOpen }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const onSubmit = () => {
    dispatch(createPosition(formik.values));
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit,
  });

  return (
    <Modal open={handleModalOpen} onClose={handleModalClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box className={classes.modal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Job Position
        </Typography>
        <TextField label="Job Position" variant="standard" fullWidth name="name" {...formik.getFieldProps("name")} />
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
          <Button size="large" variant="outlined" onClick={handleModalClose} sx={{ fontWeight: 700, padding: "1rem 3rem" }}>
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default PositionModal;
