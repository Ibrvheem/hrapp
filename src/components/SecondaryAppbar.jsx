import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function SecondaryAppbar({ title, link, button }) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItem: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="body1">{title}</Typography>
      <Button
        disableElevation
        startIcon={<Add />}
        variant="contained"
        size="large"
        sx={{
          color: "white",
          fontWeight: "700",
          fontSize: "1.5rem",
          textTransform: "capitalize",
        }}
        onClick={() => {
          navigate(link);
        }}
      >
        {button}
      </Button>
    </Box>
  );
}

export default SecondaryAppbar;
