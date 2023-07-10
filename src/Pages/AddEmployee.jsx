import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Container,
  FormControl,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  DatePicker,
  LocalizationProvider,
  MobileTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useState } from "react";
import PersonalInformation from "../components/PersonalInformation";
import JobInformation from "../components/JobInformation";
import { useLocation, useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => {
  return {
    addEmployee: {
      marginTop: "6rem",
      padding: "2rem 0rem",
      width: "100%",
      backgroundColor: "#f0f0f0",
    },
  };
});
function AddEmployee() {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  const [information, setInformation] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    home_address: "",
    dob: "",
    email: "",
    phone: "",
    job: {
      position: "",
      type: "",
      start_date: "",
      end_date: "",
      salary: "",
      bonus: "",
      leave_days: "",
      report_hour: "",
      closing_hour: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const keys = name.split(".");

    if (keys.length > 1) {
      setInformation((prevInformation) => ({
        ...prevInformation,
        [keys[0]]: {
          ...prevInformation[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setInformation((prevInformation) => ({
        ...prevInformation,
        [name]: value,
      }));
    }
  };
  const handleDateInputChange = (date) => {
    let formattedDate = date.toISOString().split("T")[0];
    console.log(formattedDate);
    setInformation((prevInformation) => ({
      ...prevInformation,
      dob: date,
    }));
  };

  return (
    <div className={classes.addEmployee}>
      <Container>
        <Card
          elevation={10}
          style={{
            border: "1px solid #2fd5c8",
            height: "auto ",
            padding: "2rem",
          }}
        >
          <Typography variant="body2" sx={{ padding: "3rem 0rem" }}>
            Personal Information
          </Typography>
          <FormGroup>
            <FormControl>
              <Grid container spacing={2}>
                <Grid item md={3}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Title
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-helper-label"
                    label="Title"
                  >
                    <MenuItem value={10}>Mr.</MenuItem>
                    <MenuItem value={20}>Mrs.</MenuItem>
                    <MenuItem value={30}>Ms.</MenuItem>
                  </Select>
                </Grid>
                <Grid item md={5}>
                  <TextField
                    onChange={handleInputChange}
                    name="first_name"
                    value={information.first_name}
                    label="First Name"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item md={4}>
                  <TextField
                    onChange={handleInputChange}
                    name="middle_name"
                    value={information.middle_name}
                    label="Middle Name"
                    fullWidth
                  />
                </Grid>
                <Grid item md={4}>
                  <TextField
                    onChange={handleInputChange}
                    name="last_name"
                    value={information.last_name}
                    label="Last Name"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item md={4}>
                  <TextField
                    onChange={handleInputChange}
                    name="home_address"
                    value={information.home_address}
                    label="Home Address"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item md={4}>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date of Birth"
                        fullWidth
                        name="dob"
                        onChange={handleDateInputChange}
                        value={information.dob}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>{" "}
                  </FormControl>
                </Grid>
                <Grid item md={4}>
                  <TextField
                    onChange={handleInputChange}
                    name="email"
                    value={information.email}
                    label="Email Address"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item md={4}>
                  <TextField
                    onChange={handleInputChange}
                    name="phone"
                    value={information.phone}
                    label="Phone Number"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item md={2}>
                  <TextField
                    label="Passport"
                    type="file"
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item md={2}>
                  <TextField
                    label="Resume"
                    type="file"
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </FormControl>
          </FormGroup>
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
                    <TextField
                      onChange={handleInputChange}
                      name="job.salary"
                      value={information.job.salary}
                      label="Salary"
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      onChange={handleInputChange}
                      name="job.bonus"
                      value={information.job.bonus}
                      label="Bonus"
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      onChange={handleInputChange}
                      label="Annual Leave Days Allowed"
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={4}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileTimePicker
                          onChange={handleInputChange}
                          label="Office Reporting Hour *"
                          defaultValue={dayjs("2022-04-17T15:30")}
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
              onClick={() => {
                console.log(information);
              }}
            >
              Save
            </Button>
            <Button
              disableElevation
              variant="outlined"
              size="large"
              sx={{
                padding: "1rem 4rem",
                fontWeight: 700,
                fontSize: "1.4rem",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              Cancel
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default AddEmployee;
