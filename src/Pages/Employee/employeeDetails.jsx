import {
  Add, ChevronLeft, Email, ExpandMore, MilitaryTech, Phone,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { getEmployees, putMinutesLost } from "./employeesSlice";
import { putAppraisal } from "../Appraisals/appraisalsSlice";

const useStyles = makeStyles(() => {
  return {
    wrapper: {
      border: "1px solid #2fd5c8",
      borderRadius: "1rem",
      padding: "2rem",
      backgroundColor: "#fff",
      minWidth: "100%",
      minHeight: "80vh",
    },
    icon: {
      marginInlineEnd: "1rem",
    },
    button: {
      color: "#000 !important",
      fontWeight: "600 !important",
      fontSize: "1.4rem !important",
      marginInlineEnd: "2rem !important",
    },
    detail: {
      display: "flex !important",
      gap: "2rem",
      justifyContent: "space-between",
      maxWidth: "60%",
      marginBlockEnd: "2rem !important",
    },
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "40rem",
      minHeight: "20rem",
      backgroundColor: "white",
      boxShadow: 24,
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
      padding: "2rem",
    },
    selectLabel: {
      marginLeft: "-14px",
    },
  };
});

export default function EmployeeDetails({ sessions, activeEmployee, setActiveEmployee, handleCloseDetails }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { employeeData: { employees } } = useSelector((state) => state.employees);
  const [activeTab, setActiveTab] = useState(1);
  const [filterBySession, setFilterBySession] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [minutesFormData, setMinutesFormData] = useState({ date: null });
  const { appraisalsData: appraisals } = useSelector((state) => state.appraisals)

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    setMinutesFormData({});
  };
  const handleFormDataChange = (ev) =>
    setMinutesFormData((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));

  const handleSubmitForm = () => {
    dispatch(putMinutesLost({ id: activeEmployee.id, formData: minutesFormData })).then(() =>
      updateActiveEmployee()
    )
    handleModalClose();
  };

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  const handleFilterChange = (ev) => setFilterBySession(ev.target.value);

  const updateActiveEmployee = () => {
    dispatch(getEmployees()).then((res) => setActiveEmployee(res.payload.employees.find(emp => emp.id === activeEmployee.id)))
  }
  const handleAppraisalChange = (ev, itemId) => {
    dispatch(putAppraisal({
      employeeId: activeEmployee.id,
      appraisal: {
        evaluation_point: (+ev.target.value),
        evaluation_item_id: itemId
      }
    })).then(() =>
      updateActiveEmployee()
    )
  };
  const handleChecked = (value, appraisalId, itemId) => {
    const itemPoints = activeEmployee.appraisals.find((ap) =>
      ap.appraisalgroup.id === appraisalId && ap.evaluationitem.id === itemId)?.evaluation_point
    if (itemPoints) return value === itemPoints
    return value === 0
  }
  const evaluationOptions = [
    { name: "N/A", value: 0 },
    { name: "Does Not Meet Expectations", value: 1 },
    { name: "Minamally Meet Expectations", value: 2 },
    { name: "Meets Expectations", value: 3 },
    { name: "Exceeds Expectations", value: 4 },
    { name: "Greatly Exceeds Expecttions", value: 5 },
  ];
  return (
    <Box sx={{ minHeight: "100%" }}>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Minutes Lost
          </Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={minutesFormData.date}
              label="Select Date"
              onChange={(newDate) =>
                setMinutesFormData((prev) => ({
                  ...prev,
                  date: dayjs(newDate).format("MM/DD/YYYY")
                }))}
              slotProps={{ textField: { variant: "standard" } }}
            />
          </LocalizationProvider>
          <TextField
            onChange={handleFormDataChange}
            name="minutes"
            label="Enter Minutes Lost"
            variant="standard"
            fullWidth
          />
          <TextField
            onChange={handleFormDataChange}
            name="description"
            label="Select Reason"
            variant="standard"
            fullWidth
          />
          <TextField
            onChange={handleFormDataChange}
            name="classes_missed"
            label="Enter Number of classes Missed"
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
      <Box>
        <Button
          onClick={handleCloseDetails}
          variant="text"
          className={classes.button}
          sx={{ paddingInlineStart: 0 }}
        >
          <ChevronLeft sx={{ fontSize: "2rem" }} />
          Back
        </Button>
      </Box>
      <Box className={classes.wrapper}>
        <Box>
          <Box
            sx={{
              display: "flex",
              gap: "2rem",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", gap: "5rem" }}>
              <Box>
                <Typography fontWeight={700}>{activeEmployee.first_name + " " + activeEmployee.last_name}</Typography>
                <Typography variant="body">title: {activeEmployee.currentjob.position.name}</Typography>
              </Box>
              <Box>
                <Typography>
                  <Email className={classes.icon} /> {activeEmployee.email}
                </Typography>
                <Typography>
                  <Phone className={classes.icon} /> {activeEmployee.phone}
                </Typography>
              </Box>
            </Box>
            {/* <Box>
              <Typography fontWeight={700}>Active</Typography>
            </Box> */}
          </Box>
          <Box sx={{ marginBlockStart: "4rem" }}>
            <Button
              className={classes.button}
              variant="outlined"
              onClick={() => handleTabChange(1)}
            >
              Details
            </Button>
            <Button
              className={classes.button}
              variant="outlined"
              onClick={() => handleTabChange(2)}
            >
              Minutes Lost
            </Button>
            <Button
              className={classes.button}
              variant="outlined"
              onClick={() => handleTabChange(3)}
            >
              Appraisal
            </Button>
            <Button
              className={classes.button}
              variant="outlined"
              onClick={() => handleTabChange(4)}
            >
              Awards
            </Button>
          </Box>
          <Box sx={{ marginBlockStart: "4rem" }}>
            {activeTab === 1 ? (
              <Box>
                <Typography fontWeight={700} className={classes.detail}>
                  <span>Name: </span>
                  <span>{activeEmployee.first_name + " " + activeEmployee.last_name}</span>
                </Typography>
                <Typography fontWeight={700} className={classes.detail}>
                  <span>Email: </span>
                  <span>{activeEmployee.email}</span>
                </Typography>
                <Typography fontWeight={700} className={classes.detail}>
                  <span>Address: </span>
                  <span>{activeEmployee.home_address}</span>
                </Typography>
                <Typography fontWeight={700} className={classes.detail}>
                  <span>Date of Birth: </span>
                  <span>{activeEmployee.dob}</span>
                </Typography>
                <Typography fontWeight={700} className={classes.detail}>
                  <span>Job: </span>
                  <span>{activeEmployee.currentjob.position.name}</span>
                </Typography>
                <Typography fontWeight={700} className={classes.detail}>
                  <span>Phone Number: </span>
                  <span>{activeEmployee.phone}</span>
                </Typography>
                {/* <Typography fontWeight={700} className={classes.detail}>
                  <span>classes: </span>
                  <span>Js1, JS2, JS3</span>
                </Typography> */}
              </Box>
            ) : null}
            {activeTab === 2 ? (
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <FormControl sx={{ width: "200px" }}>
                    <InputLabel id="filterBy-session">
                      Select Session
                    </InputLabel>
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
                  <Button
                    onClick={handleModalOpen}
                    variant="contained"
                    className={classes.button}
                    sx={{
                      marginInlineEnd: "0 !important",
                      color: "#fff !important",
                    }}
                  >
                    <Add sx={{ fontSize: "3rem" }} /> Add
                  </Button>
                </Box>
                <TableContainer
                  component={Paper}
                  sx={{ marginBlockStart: "3rem" }}
                >
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead
                      sx={{
                        backgroundColor: "#2fd5c8",
                      }}
                    >
                      <TableRow>
                        <TableCell
                          sx={{ color: "#fff !important" }}
                          align="center"
                        >
                          Week
                        </TableCell>
                        <TableCell
                          sx={{ color: "#fff !important" }}
                          align="center"
                        >
                          Minutes Lost Per Week
                        </TableCell>
                        <TableCell
                          sx={{ color: "#fff !important" }}
                          align="center"
                        >
                          Classes Missed
                        </TableCell>
                        <TableCell
                          sx={{ color: "#fff !important" }}
                          align="center"
                        >
                          Reason
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {activeEmployee.minutes_lost.map(row =>
                        <TableRow key={"week-" + row.week + "-" + row.minutes + "-" + row.classes_missed}
                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="center">Week {row.week}</TableCell>
                          <TableCell align="center">{row.minutes} Minutes</TableCell>
                          <TableCell align="center">{row.classes_missed} Classes</TableCell>
                          <TableCell align="center">{row.description || "N/A"}</TableCell>
                        </TableRow>)}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ) : null}
            {activeTab === 3 ? (
              <Box>
                {appraisals?.length
                  ? appraisals.map((appraisal) => {
                    return (
                      <Accordion key={"appraisal-" + appraisal.id}>
                        <AccordionSummary
                          expandIcon={<ExpandMore sx={{ fontSize: "3rem", color: "#fff" }} />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          sx={{ backgroundColor: "#2fd5c8", color: "#fff" }}
                        >
                          <Typography textTransform="uppercase">{appraisal.name}</Typography>
                        </AccordionSummary>
                        {appraisal.evaluationitems.length
                          ? appraisal.evaluationitems.map((item, itemIndex) => (
                            <AccordionDetails key={"item-" + item.name} sx={{ border: "1px solid #2fd5c8" }}>
                              <Typography>{itemIndex + 1}. {item.name}</Typography>
                              <TableContainer>
                                <Table
                                  sx={{
                                    minWidth: 650,
                                    td: {
                                      border: "2px solid #2fd5c8",
                                      width: "100px",
                                      padding: "1rem 0",
                                      verticalAlign: "top",
                                    },
                                  }}
                                  aria-label="simple table"
                                >
                                  <TableBody>
                                    <TableRow>
                                      {evaluationOptions.map((option, index) => (
                                        <TableCell key={'option-' + option.name} align="center">
                                          <FormControlLabel
                                            labelPlacement="bottom"
                                            control={<Checkbox value={option.value}
                                              onChange={(ev) => handleAppraisalChange(ev, item.id)}
                                              sx={{ "& .MuiSvgIcon-root": { fontSize: 28, } }}
                                              checked={handleChecked(option.value, appraisal.id, item.id)}
                                            />}
                                            label={<span style={{ fontSize: "1.5rem", }}>
                                              {option.name}
                                            </span>} />
                                        </TableCell>)
                                      )}
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </AccordionDetails>
                          ))
                          : null}
                      </Accordion>
                    );
                  })
                  : null}
              </Box>
            ) : null}
            {activeTab === 4 ? (
              <Box>
                <Accordion expanded={true}>
                  <AccordionSummary
                    expandIcon={
                      <ExpandMore sx={{ fontSize: "3rem", color: "#fff" }} />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ backgroundColor: "#2fd5c8", color: "#fff" }}
                  >
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "450px 1fr",
                        justifyItems: "space-between",
                        width: "100%",
                      }}
                    >
                      <Typography>Award</Typography>
                      <Typography>Session</Typography>
                    </Box>
                  </AccordionSummary>
                  {activeEmployee.awards.length ?
                    activeEmployee.awards.map(award =>
                      <AccordionDetails key={"award-" + award.id} sx={{ border: "1px solid #2fd5c8" }}>
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "450px 1fr",
                            justifyItems: "space-between",
                            width: "100%",
                          }}
                        >
                          <Typography>
                            <MilitaryTech /> {award.title}
                          </Typography>
                          <Typography>2022/2023</Typography>
                        </Box>
                      </AccordionDetails>
                    ) : <Typography>No Awards Yet</Typography>}
                </Accordion>
              </Box>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box >
  );
}
