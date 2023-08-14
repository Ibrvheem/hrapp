import { Button, FormControl, FormGroup, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getPositions } from "../Pages/NewApplicant/positionsSlice";
import dayjs from "dayjs";

function JobInformation({ formik }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { positions: allPositions } = useSelector((state) => state.positions);

  useEffect(() => {
    dispatch(getPositions());
    console.log(allPositions);
  }, []);
  function formatDate(arg) {
    const formattedDate = new Date(arg);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const day = String(formattedDate.getDate()).padStart(2, "0");
    const formattedDateString = `${year}-${month}-${day}`;
    return formattedDateString;
  }

  return (
    <div>
      {" "}
      <FormGroup>
        <Typography variant="body2" sx={{ padding: "2rem 0rem" }}>
          Job Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <FormControl fullWidth>
              <InputLabel>Job Role</InputLabel>
              {location.pathname == "/recruitment/applicant" ? (
                <Select label="Job Role" value="" name="position_id" {...formik.getFieldProps("position_id")}>
                  {allPositions?.positions?.map((position) => {
                    return (
                      <MenuItem value={position.id} key={position.id}>
                        {position.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              ) : (
                <Select label="Job Role" value="" name="job.position" {...formik.getFieldProps("job.position")}>
                  {allPositions?.positions?.map((position) => {
                    return (
                      <MenuItem value={position.name} key={position.id}>
                        {position.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </FormControl>
          </Grid>
          {location.pathname === "/dashboard/addEmployee" || location.pathname === "/dashboard/updateEmployee" ? (
            <>
              <Grid item md={6}>
                <FormControl fullWidth>
                  <InputLabel>Work Schedule</InputLabel>
                  <Select value="" label="Work Schedule" name="job.type" {...formik.getFieldProps("job.type")}>
                    <MenuItem value="Part-time">Part-Time</MenuItem>
                    <MenuItem value="Full-Time">Full-Time</MenuItem>
                    <MenuItem value="Contract">Contract</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={4}>
                <TextField label="Salary" fullWidth name="job.salary" {...formik.getFieldProps("job.salary")} />
              </Grid>
              <Grid item md={4}>
                <TextField label="Bonus" fullWidth name="job.bonus" {...formik.getFieldProps("job.bonus")} />
              </Grid>
              <Grid item md={4}>
                <TextField label="Annual Leave Days Allowed" required fullWidth name="job.leave_days" {...formik.getFieldProps("job.leave_days")} />
              </Grid>
              <Grid item md={4}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileTimePicker
                      {...formik.getFieldProps("job.reporting_hour")}
                      label="Office Reporting Hour *"
                      onChange={(value) => {
                        formik.setFieldValue("job.reporting_hour", value);
                      }}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item md={4}>
                <FormControl fullWidth required>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileTimePicker
                      {...formik.getFieldProps("job.closing_hour")}
                      required
                      label="Office Closing Hour *"
                      onChange={(value) => {
                        formik.setFieldValue("job.closing_hour", value);
                      }}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item md={4}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...formik.getFieldProps("job.start_date")}
                      label="Employemnt Start Date *"
                      required
                      fullWidth
                      onChange={(value) => {
                        formik.setFieldValue("job.start_date", value);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>{" "}
                </FormControl>
              </Grid>
            </>
          ) : null}
        </Grid>
      </FormGroup>
    </div>
  );
}

export default JobInformation;
