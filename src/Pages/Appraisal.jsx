import {
  ArrowDownward,
  ArrowDropDown,
  DeleteForever,
  KeyboardArrowDown,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Card,
  Container,
  Fade,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    appraisal: {
      marginTop: "6rem",
      padding: "2rem 0rem",
      width: "100%",
      backgroundColor: "#f0f0f0",
    },
    card: {
      width: "100%",
      height: "100vh",
      padding: "2rem",
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
function Appraisal() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <div className={classes.appraisal}>
      <Container>
        <Grid container>
          <Card className={classes.card}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <div>
                <Button
                  onClick={handleModalOpen}
                  size="large"
                  variant="contained"
                  sx={{ color: "white", fontWeight: 700 }}
                >
                  Add Form
                </Button>
                <Modal
                  open={modalOpen}
                  onClose={handleModalClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box className={classes.modal}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Add Evaluation Item
                    </Typography>
                    <TextField
                      label="Evaluation Item"
                      variant="standard"
                      fullWidth
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "2rem",
                        margin: "2rem 0rem",
                      }}
                    >
                      <Button
                        size="large"
                        variant="contained"
                        sx={{
                          color: "white",
                          fontWeight: 700,
                          padding: "1rem 3rem",
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        size="large"
                        variant="outlined"
                        onClick={handleModalClose}
                        sx={{ fontWeight: 700, padding: "1rem 3rem" }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Box>
                </Modal>
              </div>
            </div>
            <Card
              elevation={0}
              sx={{
                margin: "2rem 0",
                backgroundColor: "#2fd5c8",
                padding: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                sx={{ color: "white", fontWeight: 700 }}
              >
                Staff Evaluation/Appraisal Form
              </Typography>
              <div>
                <Button
                  sx={{
                    backgroundColor: "white",
                    padding: "1rem 2rem",
                    fontWeight: 700,
                  }}
                  size="large"
                >
                  Add Item
                </Button>
                <IconButton>
                  <DeleteForever sx={{ fontSize: "3rem", color: "white" }} />
                </IconButton>

                <IconButton
                  variant="contained"
                  id="fade-button"
                  aria-controls={open ? "fade-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <KeyboardArrowDown
                    sx={{ fontSize: "3rem", color: "white" }}
                  />
                </IconButton>
                <Menu
                  id="fade-menu"
                  MenuListProps={{
                    "aria-labelledby": "fade-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  <MenuItem sx={{ width: "100%" }}>Profile</MenuItem>
                  <MenuItem sx={{ width: "100%" }}>My account</MenuItem>
                  <MenuItem sx={{ width: "100%" }}>Logout</MenuItem>
                </Menu>
              </div>
            </Card>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}

export default Appraisal;
