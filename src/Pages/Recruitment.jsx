import { Box, Button, Container, InputAdornment, Menu, MenuItem, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import SecondaryAppbar from "../components/SecondaryAppbar";
import { Add, Mail, MoreVert, Phone, Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import PositionModal from "./Applicant/PositionModal";
import { getApplicants } from "./Applicant/applicantsSlice";
import LoadingScreen from "../components/loadingScreen";
import HireEmployeeModal from "./Applicant/hireEmployeeModal";
import ApplicantleModal from "./Applicant/applicantModal";

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
      minWidth: "100%",
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
    },
  };
});
function Recruitment() {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [modals, setModals] = useState({ schedule: false, hire: false })
  const [activeRecruit, setActiveRecruit] = useState({});

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const dispatch = useDispatch();
  const { applicantsData, status } = useSelector((state) => state.applicants);
  const [applicants, setApplicants] = useState(applicantsData.applicants);


  const handleOpenOptions = (ev, employee) => {
    setAnchorEl(ev.currentTarget);
    setActiveRecruit(employee)
  };
  const handleCloseOptions = () => {
    setAnchorEl(null);
  };

  const handleRejectModal = () => {
    setModals(prev => ({ ...prev, reject: true }));
    handleCloseOptions()
  }
  const handleHireEmployee = () => {
    setModals(prev => ({ ...prev, hire: true }));
    handleCloseOptions()
  }
  const handleScheduleModal = () => {
    setModals(prev => ({ ...prev, schedule: true }));
    setAnchorEl(null)
  }
  const handleViewModal = () => {
    setModals(prev => ({ ...prev, viewSchedule: true }));
    setAnchorEl(null)
  }
  const handleModalsClose = () => setModals({ reject: false, schedule: false, hire: false })

  useEffect(() => {
    dispatch(getApplicants());
  }, []);
  useEffect(() => {
    setApplicants(applicantsData.applicants)
  }, [applicantsData]);

  return (
    <div className={classes.recruitement}>
      {status === "loading" ? <LoadingScreen /> : null}
      <ApplicantleModal modalOpen={modals} handleModalClose={(handleModalsClose)} setModals={setModals} activeRecruit={activeRecruit} />
      <HireEmployeeModal activeRecruit={activeRecruit} open={modals.hire} handleModalsClose={handleModalsClose} />
      <Container>
        <SecondaryAppbar
          title="Employee"
          button="New Applicant"
          link="/recruitment/applicant"
        />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseOptions}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {activeRecruit.interview_date ?
            <MenuItem onClick={handleViewModal}>View Schedule</MenuItem> :
            <MenuItem onClick={handleScheduleModal}>Schedule Interview</MenuItem>
          }
          <MenuItem onClick={handleHireEmployee}>Hire</MenuItem>
          <MenuItem onClick={handleRejectModal}>Reject Application</MenuItem>
        </Menu>
        <table className={classes.table} border={1}>
          <thead className={classes.tableHead}>
            <tr>
              <td className={classes.td}>
                <div>
                  <Button
                    size="large"
                    variant="contained"
                    sx={{
                      height: "5rem",
                      width: "auto",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "1.4rem",
                    }}
                    onClick={handleModalOpen}
                    startIcon={<Add />}
                  >
                    Add Job Position
                  </Button>
                  <PositionModal
                    handleModalClose={handleModalClose}
                    handleModalOpen={modalOpen}
                  />
                </div>
              </td>
              <td className={classes.td}></td>
              <td
                className={classes.td}
                style={{
                  display: "flex",
                  justifyContent: "end",
                  width: "100%",
                }}
              >
                <TextField
                  fullWidth
                  label="search"
                  inputProps={{
                    style: {
                      height: "5rem",
                      padding: "0 1rem",
                    },
                  }}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <Search color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th
                className={classes.td}
                style={{ border: "1px solid #2fd5c8", padding: "2rem 0rem" }}
              >
                Employee
              </th>
              <th
                className={classes.td}
                style={{ border: "1px solid #2fd5c8", padding: "2rem 0rem" }}
              >
                Contact
              </th>
              <th
                className={classes.td}
                style={{ border: "1px solid #2fd5c8", padding: "2rem 0rem" }}
              >
                Applied For
              </th>
            </tr>
            {applicants?.map((row) => {
              return (
                <tr key={"applicant" + row.id}>
                  <td
                    className={classes.td}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: "2rem", '&>*': { flexShrink: 0 } }}>
                      <img src="" alt="" className={classes.employeeImage} />
                      <strong>{row.first_name} {row.last_name}</strong>
                    </Box>
                  </td>
                  <td className={classes.td} >
                    <Box style={{ display: 'flex', justifyContent: 'center' }}>
                      <Box>
                        <div style={{ whiteSpace: 'nowrap' }}><Mail color="primary" sx={{ marginInlineEnd: '1rem' }} /> {row.email}</div>
                        <div><Phone color="primary" sx={{ marginInlineEnd: '1rem' }} /> {row.phone}</div>
                      </Box>
                    </Box>
                  </td>
                  <td className={classes.td}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                      <Box>
                        <div>{row.position?.name}</div>
                        <div>{row.subtitle}</div>
                      </Box>
                      <Button onClick={(ev) => handleOpenOptions(ev, row)}><MoreVert sx={{ fontSize: '2rem' }} /></Button>
                    </Box>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Container>
    </div>
  );
}

export default Recruitment;
