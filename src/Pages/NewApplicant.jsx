import React from "react";
import PersonalInformation from "../components/PersonalInformation";
import JobInformation from "../components/JobInformation";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/material";

const useStyles = makeStyles((theme) => {
  return {
    newApplicant: {
      marginTop: "6rem",
      padding: "2rem 0rem",
      width: "100%",
      backgroundColor: "#f0f0f0",
    },
  };
});
function NewApplicant() {
  const classes = useStyles();
  return (
    <div className={classes.newApplicant}>
      <Container>
        <PersonalInformation />
        <JobInformation />
      </Container>
    </div>
  );
}

export default NewApplicant;
