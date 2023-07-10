import { Button, Card, Container, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../store/authSlice";
const useStyles = makeStyles((theme) => {
  return {
    signin: {
      margin: "3rem 0rem",
      //   padding: "2rem 0rem",
      width: "100%",
    },
    signInCard: {
      padding: "5rem",
      width: "50%",
      backgroundColor: "red",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "3rem",
      border: "1px solid #2fd5c8",
    },
  };
});
function Signin() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSignIn = () => {
    dispatch(getUser({ email, password })).then((action) => {
      const userToken = action?.payload?.token;
      if (userToken) {
        navigate("/dashboard");
      }
    });
  };

  return (
    <div className={classes.signin}>
      <Container
        sx={{
          backgroundColor: "#f0f0f0",
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "4rem",
          borderRadius: "2rem",
          maxWidth: "90% !important",
          textAlign: "center",
        }}
      >
        <div>
          <Typography variant="h3">Welcome</Typography>
          <Typography variant="h4">
            Fill in your credentials to log in
          </Typography>
        </div>
        <Card className={classes.signInCard} elevation={0}>
          <Typography variant="h4">Sign in</Typography>
          <TextField
            variant="standard"
            label="Email"
            fullWidth
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            variant="standard"
            label="Password"
            fullWidth
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{
              color: "white",
              fontWWeight: 700,
              padding: "0.5rem 2rem",
              fontSize: "1.4rem",
            }}
            onClick={handleSignIn}
          >
            Proceed
          </Button>
        </Card>
      </Container>
    </div>
  );
}

export default Signin;
