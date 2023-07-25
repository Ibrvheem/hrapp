import { Button, FormControl, Grid, InputLabel, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postLeave } from "./LeaveSlice";

function LeaveInformation({ id }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
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
  console.log(formik.values);

  return (
    <Grid container spacing={3}>
      <Grid item md={12}>
        <InputLabel>Reason:</InputLabel>
        <TextField variant="outlined" fullWidth name="reason" {...formik.getFieldProps("reason")} />
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
          onClick={formik.handleSubmit}
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
          onClick={() => {
            navigate("/leaves");
          }}
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
}

export default LeaveInformation;
