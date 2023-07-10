import {
  FormControl,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";

function PersonalInformation() {
  return (
    <>
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
              <TextField label="First Name" required fullWidth />
            </Grid>
            <Grid item md={4}>
              <TextField label="Middle Name" fullWidth />
            </Grid>
            <Grid item md={4}>
              <TextField label="Last Name" required fullWidth />
            </Grid>
            <Grid item md={4}>
              <TextField label="Home Address" required fullWidth />
            </Grid>
            <Grid item md={4}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Date of Birth" fullWidth />
                </LocalizationProvider>{" "}
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <TextField label="Email Address" required fullWidth />
            </Grid>
            <Grid item md={4}>
              <TextField label="Phone Number" required fullWidth />
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
    </>
  );
}

export default PersonalInformation;
