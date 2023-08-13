import { Button, Card, Container, FormControl, FormGroup, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DatePicker, LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import PersonalInformation from "../../components/PersonalInformation";
import JobInformation from "../../components/JobInformation";
import { useDispatch, useSelector } from "react-redux";
import { postApplicant, postFile } from "./applicantsSlice";
import { getPositions } from "./positionsSlice";
import { useEffect } from "react";
const useStyles = makeStyles((theme) => {
  return {
    recruitement: {
      marginTop: "6rem",
      padding: "2rem 0rem",
      width: "100%",
      backgroundColor: "#f0f0f0",
    },
    employeeImage: {
      height: "5rem",
      width: "5rem",
      borderRadius: "50%",
      objectFit: "cover",
      objectPosition: "center",
      backgroundColor: "#2fd5c8",
    },

    table: {
      width: "100%",
      borderCollapse: "collapse",
      border: "1px solid #2fd5c8",
      marginTop: "5rem",
      borderRadius: "90rem",
    },
    tableHead: {
      height: "5rem",
      border: "none",
    },
    td: {
      padding: "1rem",
      fontSize: "1.4rem",
      border: 0,
      background: "#fafafa",
      width: "33%",
    },
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
function Recruitment() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const initialValues = {
    first_name: "",
    middle_name: "",
    last_name: "",
    home_address: "",
    dob: "",
    email: "",
    phone: "",
    image: null,
    resume: null,
    position_id: "",
  };

  const validationSchema = Yup.object({
    first_name: Yup.string(),
    last_name: Yup.string(),
  });
  const onSubmit = (values) => {
    const resumeLocalFile = values.resume;
    const passportLocalFile = values.image;
    let resumeUrl;
    let passportUrl;

    const postFilePromises = [];

    postFilePromises.push(
      dispatch(postFile(resumeLocalFile)).then((action) => {
        resumeUrl = action?.payload?.url;
        if (resumeUrl) {
          console.log("Resume URL: " + resumeUrl);
          values.resume = resumeUrl;
        } else {
          console.log("Resume URL not found");
        }
      })
    );

    postFilePromises.push(
      dispatch(postFile(passportLocalFile)).then((action) => {
        passportUrl = action?.payload?.url;
        if (passportUrl) {
          console.log("Passport URL: " + passportUrl);
          values.image = passportUrl;
        } else {
          console.log("Passport URL not found");
        }
      })
    );

    Promise.all(postFilePromises).then(() => {
      console.log(values);
      dispatch(postApplicant(values));
    });
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div className={classes.recruitement}>
      <Container>
        <Card
          elevation={10}
          style={{
            border: "1px solid #2fd5c8",
            height: "auto ",
            padding: "2rem",
          }}
        >
          <PersonalInformation formik={formik} name="" />
          <JobInformation formik={formik} />
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
                navigate("/recruitment");
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

export default Recruitment;
