import { Button, FormControl, FormGroup, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getPositions } from "../Pages/NewApplicant/positionsSlice";

function JobInformation({ formik }) {
  console.log(formik.values);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { positions: allPositions } = useSelector((state) => state.positions);
  console.log(allPositions);

  useEffect(() => {
    dispatch(getPositions());
  }, []);

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
          {location.pathname == "/dashboard/addemployee" ? (
            <>
              <Grid item md={6}>
                <FormControl fullWidth>
                  <InputLabel>Work Schedule</InputLabel>
                  <Select value="" label="Work Schedule" name="job.type" {...formik.getFieldProps("job.type")}>
                    <MenuItem value="Part-Time">Part-Time</MenuItem>
                    <MenuItem value="Full-Time">Full-Time</MenuItem>
                    <MenuItem value="Contract">Contract</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={4}>
                <TextField label="Salary" fullWidth />
              </Grid>
              <Grid item md={4}>
                <TextField label="Bonus" fullWidth />
              </Grid>
              <Grid item md={4}>
                <TextField label="Annual Leave Days Allowed" required fullWidth />
              </Grid>
              <Grid item md={4}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileTimePicker
                      label="Office Reporting Hour *"
                      // defaultValue={dayjs("2022-04-17T15:30")}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item md={4}>
                <FormControl fullWidth required>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileTimePicker
                      required
                      label="Office Closing Hour *"
                      // defaultValue={dayjs("2022-04-17T15:30")}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item md={4}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Employemnt Start Date *" required fullWidth />
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
