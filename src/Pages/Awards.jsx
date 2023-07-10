import { EmojiEvents } from "@mui/icons-material";
import { Button, Card, Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    awards: {
      marginTop: "6rem",
      padding: "2rem 0rem",
      width: "100%",
      backgroundColor: "#f0f0f0",
      height: "100vh",
    },
    card: { width: "100%", height: "85vh", padding: "1rem 2rem" },
  };
});
function Awards() {
  const classes = useStyles();
  return (
    <div className={classes.awards}>
      <Container>
        <Grid container spacing={2}>
          <Grid item md={9}>
            <Card className={classes.card}>
              <div style={{ width: "100%" }}>
                <Button
                  variant="contained"
                  sx={{ color: "white", fontWeight: 700, fontSize: "1.4rem" }}
                  startIcon={<EmojiEvents />}
                >
                  Create Award
                </Button>
              </div>
            </Card>
          </Grid>
          <Grid item md={3}>
            <Card className={classes.card}></Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Awards;
