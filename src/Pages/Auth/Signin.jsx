import { Button, Card, Container, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "./authSlice";
import { BeatLoader, ClipLoader } from "react-spinners";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const useStyles = makeStyles((theme) => {
  return {
    signin: {
      backgroundColor: '#F0F0F0',
      minHeight: '100vh',
      paddingBlockStart: "3rem",
      width: "100%",
    },
    signInCard: {
      padding: "5rem",
      width: "clamp(290px, 50%, 450px)",
      backgroundColor: "#F0F0F0 !important",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "end",
      gap: "3rem",
      border: "1px solid #2fd5c8",
      borderRadius: '1rem !important',
    },
    showPasswordBtn: {
      backgroundColor: 'transparent',
      border: 'none',
      position: 'absolute',
      opacity: .5,
      right: '5px',
      top: '70%',
      transform: 'translateY(-50%)'
    }
  };
});
function Signin() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch();

  const handleSignIn = () => {
    setLoader(true);
    dispatch(getUser({ email, password })).then((action) => {
      const userToken = action?.payload?.token;
      if (userToken) {
        setLoader(false);
        navigate("/dashboard");
      } else {
        setLoader(false);
      }
    });
  };

  const signInInputFieldStyles = {style: {fontSize: '1.5rem'}}
  if (localStorage.getItem("token")) navigate("/dashboard");

  return (
    <div className={classes.signin}>
      <Container
        sx={{
          backgroundColor: "#E4E4E4",
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          flexDirection: "column",
          gap: "4.5rem",
          borderRadius: "1rem",
          maxWidth: "90% !important",
          textAlign: "center",
        }}
      >
        <div>
          <img src="logo512.png" alt="" height={90} />
        </div>
        <div>
          <Typography variant="h4" component="h1" sx={{fontWeight: 700, marginBlockEnd: '3rem'}} >Welcome</Typography>
          <Typography variant="h5" component="p">Fill in your credentials to log in</Typography>
        </div>
        <Card className={classes.signInCard} elevation={0}>
          <Typography variant="h4">Sign in</Typography>
          <TextField
            variant="standard"
            label="Email"
            fullWidth
            inputProps={signInInputFieldStyles}
            InputLabelProps={signInInputFieldStyles}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div style={{position:'relative', width: '100%'}}>
            <TextField
            className={classes.signInInputField}
              variant="standard"
              label="Password"
              type={showPassword? "text": "password"}
              fullWidth
              inputProps={signInInputFieldStyles}
              InputLabelProps={signInInputFieldStyles}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className={classes.showPasswordBtn} onClick={()=> setShowPassword(prev=> !prev)}> {showPassword? <VisibilityOff sx={{fontSize: '2.5rem'}} /> : <Visibility sx={{fontSize: '2.5rem'}} />} </button>
          </div>
          <Button
            variant="contained"
            color="primary"
            sx={{
              color: "white",
              fontWWeight: 700,
              padding: "0.5rem 2rem",
              fontSize: "1.4rem",
              textTransform: "capitalize"
            }}
            onClick={handleSignIn}
          >
            {loader ? <ClipLoader size={15} color="white" /> : "Proceed"}
          </Button>
        </Card>
      </Container>
    </div>
  );
}

export default Signin;
