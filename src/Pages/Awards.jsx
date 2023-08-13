import { EmojiEvents, MoreVert } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Fade,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  assignAward,
  deleteAward,
  editAward,
  getAwards,
  getSessions,
  postAward,
} from "./awards/awardsSlice";
import { getEmployees } from "./AddEmployees/employeesSlice";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/loadingScreen";

const useStyles = makeStyles((theme) => {
  return {
    awards: {
      marginTop: "6rem",
      padding: "2rem 0rem",
      width: "100%",
      height: "100vh",
    },
    awards_list: {
      alignContent: "start",
      backgroundColor: "#f0f0f0",
      borderRadius: "1rem",
      display: "grid",
      gap: "1rem",
      height: "100%",
      padding: "2rem",
    },
    award: {
      backgroundColor: "#fff",
      borderRadius: "1rem",
      display: "flex",
      justifyContent: "space-between",
      padding: "2rem",
    },
    card: {
      width: "100%",
      height: "85vh",
      padding: "2rem",
    },
    title: { fontWeight: "700 !important" },
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "40rem",
      backgroundColor: "white",
      boxShadow: 24,
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
      borderRadius: "2rem",
      padding: "1rem 2rem",
    },
    list_divider: {
      marginInline: "auto !important",
      display: "block",
      width: "80%",
    },
    options_menu_item: {
      justifyContent: "center !important",
      paddingInline: "3rem !important",
      paddingBlock: "0 !important",
    },
  };
});

function Award({
  award,
  setActiveAward,
  handleDeleteAward,
  handleShowDetails,
  handleAssignAwardModal,
  setOpenModal,
}) {
  const classes = useStyles();
  const [optionsAnchorEl, setOptionsAnchorEl] = useState(null);

  const handleOpenOptions = (event) => setOptionsAnchorEl(event.currentTarget);
  const handleCloseOptions = () => setOptionsAnchorEl(null);

  const handleEditAwardModal = (award) => {
    setActiveAward((prev) => ({ ...prev, award }));
    handleCloseOptions();
    setOpenModal((prev) => ({ ...prev, edit: true }));
  };
  return (
    <Box
      sx={{ cursor: 'pointer' }}
      onClick={() => handleShowDetails(award)}
      key={award.title}
      className={classes.award}
    >
      <Box>
        <Typography className={classes.title} variant="h4" component="h3">
          {award.title}
        </Typography>
        <Typography>{award.description}</Typography>
      </Box>
      <Box sx={{ display: "flex", gap: "2rem" }}>
        {award.employee ? (
          <Box>
            <Typography>Current Holder</Typography>
            <Typography className={classes.title} variant="h4" component="h3">
              {award.employee.first_name + " " + award.employee.last_name}
            </Typography>
          </Box>
        ) : null}
        <Box>
          <IconButton onClick={handleOpenOptions}>
            <MoreVert sx={{ color: "#30D5C8", fontSize: "25px" }} />
          </IconButton>
          <Menu
            MenuListProps={{
              "aria-labelledby": "fade-button",
              style: {
                border: "2px solid #30d5c8",
              },
              className: classes.options_menu,
            }}
            anchorEl={optionsAnchorEl}
            open={Boolean(optionsAnchorEl)}
            onClose={handleCloseOptions}
            TransitionComponent={Fade}
          >
            <MenuItem
              onClick={() => handleAssignAwardModal(award)}
              className={classes.options_menu_item}
            >
              Assign
            </MenuItem>
            <Divider className={classes.list_divider} />
            <MenuItem
              onClick={() => handleDeleteAward(award.id)}
              className={classes.options_menu_item}
            >
              Delete
            </MenuItem>
            <Divider className={classes.list_divider} />
            <MenuItem
              onClick={() => handleEditAwardModal(award)}
              className={classes.options_menu_item}
            >
              Edit
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
}

function Awards() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const {
    awards: { awards },
    sessions,
    status,
  } = useSelector((state) => state.awards);
  const {
    employeeData: { employees },
  } = useSelector((state) => state.employees);
  const [formData, setFormData] = useState({
    term: "First Term",
    employee_id: null,
  });
  const [filterBySession, setFilterBySession] = useState("");
  const [activeAward, setActiveAward] = useState({
    award: null,
    session: "2022/2023",
    term: "First Term",
  });

  const [openModal, setOpenModal] = useState({
    edit: false,
    create: false,
    assign: false,
  });

  const handleFilterChange = (ev) => setFilterBySession(ev.target.value);
  const handleModalClose = () =>
    setOpenModal((prev) => ({ ...prev, create: false }));
  const handleModalOpen = () =>
    setOpenModal((prev) => ({ ...prev, create: true }));
  const handleSubmitForm = () => {
    dispatch(postAward(formData));
    handleModalClose();
  };
  const handleFormDataChange = (ev) => {
    setFormData((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
  };

  const handleAssignAwardModal = (award) => {
    setActiveAward((prev) => ({ ...prev, award }));
    setOpenModal((prev) => ({ ...prev, assign: true }));
  };
  const handleCloseAssignModal = () => {
    setOpenModal((prev) => ({ ...prev, assign: false }));
  };
  const handleSubmitAssignForm = () => {
    dispatch(assignAward(activeAward));
    handleCloseAssignModal();
  };

  const handleEmployeeSelect = (ev) => {
    setActiveAward((prev) => ({
      ...prev,
      employee_id: ev.target.value,
    }));
  };

  const handleDeleteAward = (awardId) => {
    dispatch(deleteAward(awardId));
  };

  const handleCloseEditModal = () => {
    setOpenModal((prev) => ({ ...prev, edit: false }));
  };

  const handleEditDataChange = (ev) => {
    setActiveAward((prev) => ({
      ...prev,
      award: { ...prev.award, [ev.target.name]: ev.target.value },
    }));
  };

  const handleSubmitEditForm = () => {
    dispatch(editAward(activeAward));
    handleCloseEditModal();
  };

  const handleShowDetails = (award) => {
    let employee = award.employee
      ? employees.find((emp) => emp.id === award.employee.id)
      : null;
    setActiveAward((prev) => ({ ...prev, award, employee }));
  };

  useEffect(() => {
    dispatch(getAwards());
    dispatch(getSessions());
    dispatch(getEmployees());
    setFormData((prev) => ({
      ...prev,
      session: sessions.length ? sessions[0].name : "2022/2023",
    }));
    setFilterBySession(sessions.length ? sessions[0].name : "");
  }, []);
  return (
    <div className={classes.awards}>
      <Container>
        {status === "loading" ? <LoadingScreen /> : null}
        <Grid container spacing={2} sx={{ paddingBlockStart: "2rem" }}>
          <Grid item md={9}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h1">Awards</Typography>
              <Button
                onClick={handleModalOpen}
                variant="contained"
                sx={{ color: "white", fontWeight: 700, fontSize: "1.4rem" }}
                startIcon={<EmojiEvents />}
              >
                Create Award
              </Button>
              <Modal
                open={openModal.create}
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
                    Create Award
                  </Typography>
                  <TextField
                    onChange={handleFormDataChange}
                    name="title"
                    sx={{ marginBlockStart: "2rem" }}
                    label="Award Name"
                    variant="standard"
                    fullWidth
                  />
                  <TextField
                    onChange={handleFormDataChange}
                    name="description"
                    sx={{ marginBlockStart: "2rem" }}
                    label="Award Description"
                    variant="standard"
                    fullWidth
                  />
                  <FormControl fullWidth sx={{ marginBlockStart: "4rem" }}>
                    <InputLabel id="session-select-label">Session</InputLabel>
                    <Select
                      name="session"
                      value={formData.session}
                      label="Session"
                      labelId="session-select-label"
                      onChange={handleFormDataChange}
                    >
                      {sessions.length
                        ? sessions?.map((session) => (
                            <MenuItem key={session.name} value={session.name}>
                              {session.name}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </FormControl>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "2rem",
                      margin: "2rem 0rem",
                    }}
                  >
                    <Button
                      onClick={handleSubmitForm}
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
              <Modal
                open={openModal.edit}
                onClose={handleCloseEditModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className={classes.modal}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Edit Award
                  </Typography>
                  <TextField
                    onChange={handleEditDataChange}
                    name="title"
                    sx={{ marginBlockStart: "2rem" }}
                    value={activeAward.award?.title || ""}
                    label="Award Name"
                    variant="standard"
                    fullWidth
                  />
                  <TextField
                    onChange={handleEditDataChange}
                    name="description"
                    sx={{ marginBlockStart: "2rem" }}
                    value={activeAward.award?.description || ""}
                    label="Award Description"
                    variant="standard"
                    fullWidth
                  />
                  <FormControl fullWidth sx={{ marginBlockStart: "4rem" }}>
                    <InputLabel id="session-select-label">Session</InputLabel>
                    <Select
                      name="session"
                      value={activeAward.session}
                      label="Session"
                      labelId="session-select-label"
                      onChange={handleEditDataChange}
                    >
                      {sessions.length
                        ? sessions?.map((session) => (
                            <MenuItem key={session.name} value={session.name}>
                              {session.name}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </FormControl>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "2rem",
                      margin: "2rem 0rem",
                    }}
                  >
                    <Button
                      onClick={handleSubmitEditForm}
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
                      onClick={handleCloseEditModal}
                      sx={{ fontWeight: 700, padding: "1rem 3rem" }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Box>
              </Modal>
              <Modal
                open={openModal.assign}
                onClose={handleCloseAssignModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className={classes.modal}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ color: "#30D5C8" }}
                  >
                    Assign Award
                  </Typography>
                  <Typography sx={{ marginBlock: "2rem", fontWeight: 700 }}>
                    {activeAward.award?.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      gap: "2rem",
                    }}
                  >
                    <Typography sx={{ whiteSpace: "nowrap" }}>
                      Assign to:
                    </Typography>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel id="teacher-select-label">
                        Select teacher
                      </InputLabel>
                      <Select
                        name="teacher"
                        value={activeAward.employee_id || ""}
                        label="Select teacher"
                        labelId="teacher-select-label"
                        onChange={handleEmployeeSelect}
                      >
                        {employees?.map((employee) => (
                          <MenuItem
                            key={"employee-" + employee.id}
                            value={employee.id}
                          >
                            {employee.first_name + " " + employee.last_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "2rem",
                      margin: "2rem 0rem",
                    }}
                  >
                    <Button
                      onClick={handleSubmitAssignForm}
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
                      onClick={handleCloseAssignModal}
                      sx={{ fontWeight: 700, padding: "1rem 3rem" }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Box>
              </Modal>
            </div>
          </Grid>
          <Grid item md={9}>
            <Card className={classes.card}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  marginBlockEnd: "1rem",
                }}
              >
                <FormControl sx={{ width: "200px" }}>
                  <InputLabel id="filterBy-session">Select Session</InputLabel>
                  <Select
                    name="filterBy_session"
                    value={filterBySession}
                    label="select session"
                    labelId="filterBy-session"
                    onChange={handleFilterChange}
                  >
                    {sessions.length
                      ? sessions.map((session) => (
                          <MenuItem key={session.name} value={session.name}>
                            {session.name}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </FormControl>
              </Box>
              {awards?.length ? (
                <Box className={classes.awards_list}>
                  {awards.map((award) => (
                    <Award
                      handleShowDetails={handleShowDetails}
                      key={award.id}
                      award={award}
                      setActiveAward={setActiveAward}
                      handleDeleteAward={handleDeleteAward}
                      setOpenModal={setOpenModal}
                      handleAssignAwardModal={handleAssignAwardModal}
                    />
                  ))}
                </Box>
              ) : (
                <Typography>No Awards yet</Typography>
              )}
            </Card>
          </Grid>
          <Grid item md={3}>
            <Card
              className={classes.card}
              sx={{
                display: "grid",
                alignItems: "center",
              }}
            >
              {activeAward.award ? (
                <Box>
                  {activeAward.employee ? (
                    <Box>
                      <Typography
                        sx={{
                          marginBlockEnd: "2rem",
                          textAlign: "center",
                          fontWeight: 700,
                        }}
                      >
                        {activeAward.employee.first_name +
                          " " +
                          activeAward.employee.last_name}
                      </Typography>
                      {activeAward.employee.awards.length
                        ? activeAward.employee.awards?.map((award) => (
                            <Box
                              sx={{ marginBlockEnd: "1rem" }}
                              key={"detail" + award.id}
                            >
                              <Typography fontWeight={600}>
                                {award.title}
                              </Typography>
                              <Typography>{award.description}</Typography>
                            </Box>
                          ))
                        : null}
                    </Box>
                  ) : (
                    <Box sx={{ textAlign: "center" }}>
                      <Typography fontWeight={700}>
                        {activeAward.award?.title}
                      </Typography>
                      <Typography>NOT ASSIGNED YET</Typography>
                      <Button
                        onClick={() =>
                          handleAssignAwardModal(activeAward.award)
                        }
                        variant="contained"
                        sx={{
                          color: "white",
                          fontWeight: 700,
                          fontSize: "1.4rem",
                        }}
                      >
                        ASSIGN
                      </Button>
                    </Box>
                  )}
                </Box>
              ) : (
                <Typography>Select an Award to Show Details</Typography>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Awards;
