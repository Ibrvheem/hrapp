import {
  Button,
  FormControl,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  MobileTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function JobInformation() {
  const location = useLocation();
  const navigate = useNavigate();
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
              <InputLabel id="demo-simple-select-helper-label">
                Job Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                label="Job Role"
              >
                <MenuItem value={10}>Mr.</MenuItem>
                <MenuItem value={20}>Mrs.</MenuItem>
                <MenuItem value={30}>Ms.</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Work Schedule
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                label="Work Schedule"
              >
                <MenuItem value={10}>Part-Time</MenuItem>
                <MenuItem value={20}>Full-Time</MenuItem>
                <MenuItem value={30}>Contract</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {location.pathname == "/addemployee" ? (
            <>
              <Grid item md={4}>
                <TextField label="Salary" fullWidth />
              </Grid>
              <Grid item md={4}>
                <TextField label="Bonus" fullWidth />
              </Grid>
              <Grid item md={4}>
                <TextField
                  label="Annual Leave Days Allowed"
                  required
                  fullWidth
                />
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
                    <DatePicker
                      label="Employemnt Start Date *"
                      required
                      fullWidth
                    />
                  </LocalizationProvider>{" "}
                </FormControl>
              </Grid>
            </>
          ) : null}
        </Grid>
      </FormGroup>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "2rem",
          marginTop: "4rem",
        }}
      >
        <Button
          disableElevation
          variant="contained"
          size="large"
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
            navigate("/");
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default JobInformation;
