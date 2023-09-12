import { AppBar, Menu, MenuItem, Avatar, Box, Container, CssBaseline, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, FormControl, InputLabel, Select, IconButton, Button, Modal } from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Add, AdsClick, Delete, Edit, EmojiEvents, Home, LibraryBooks, PersonAdd, Timer } from "@mui/icons-material";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from "react-router-dom";
import { logOut } from "../Pages/Auth/authSlice";
import { deleteSession, getSessions, postSession, updateSession } from "./session/sessionSlice";
import AddSessionModal from "./session/addSessionModal";
import * as Yup from "yup";
import { useFormik } from "formik";
import dayjs from "dayjs";
import LoadingScreen from "./loadingScreen";

const drawerWidth = 240;

function Layout({ children, props }) {
  const drawerNav = [
    {
      name: "Dashboard",
      path: "/dashboard",
      childPath: "addemployee",
      icon: <Home />,
    },
    {
      name: "Recruitment",
      path: "/recruitment",
      childPath: "/recruitment",
      icon: <PersonAdd />,
    },
    {
      name: "Leaves",
      path: "/leaves",
      icon: <Timer />,
    },
    {
      name: "Appraisal",
      path: "/appraisal",
      icon: <LibraryBooks />,
    },
    {
      name: "Awards",
      path: "/awards",
      icon: <EmojiEvents />,
    },
    {
      name: "Reports",
      path: "/report",
      icon: <AdsClick />,
    },
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeSession, setActiveSession] = useState()
  const [sessionModal, setSessionModal] = useState({ add: false, edit: false })
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { sessions, status } = useSelector((state) => state.sessions);

  const handleOpenOptions = (ev) => {
    setAnchorEl(ev.currentTarget);
  };
  const handleCloseOptions = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logOut())
  };

  useEffect(() => {
    dispatch(getSessions())
    setActiveSession(sessions[sessions.length - 1])
  }, [])

  useEffect(() => {
    setActiveSession(sessions[sessions.length - 1])
  }, [sessions])

  const handleSessionChange = (ev) => {
    const selectededSession = sessions.find(session => session.name === ev.target.value)
    setActiveSession(selectededSession)
  }
  const handleModalClose = () => setSessionModal({ add: false, edit: false })
  const handleAddModal = () => {
    formik.setFieldValue("name", "");
    formik.setFieldValue("starts_at", "");
    formik.setFieldValue("ends_at", "");
    setSessionModal(prev => ({ ...prev, add: true }))
  }
  const handleEditModal = () => setSessionModal(prev => ({ ...prev, edit: true }))
  const handleDeleteSession = () => dispatch(deleteSession(activeSession.id)).then(() => dispatch(getSessions()))

  const initialValues = {
    name: "",
    starts_at: "",
    ends_at: ""
  }
  const onSubmit = (values) => {
    handleModalClose()
    let sessionPromises = []
    if (sessionModal.add) {
      sessionPromises.push(
        dispatch(postSession({
          ...values,
          starts_at: values.starts_at.format("YYYY-MM-DD"),
          ends_at: values.ends_at.format("YYYY-MM-DD"),
        })));
    }
    else if (sessionModal.edit) {
      sessionPromises.push(
        dispatch(updateSession({
          body: {
            ...values,
            starts_at: values.starts_at.format("YYYY-MM-DD"),
            ends_at: values.ends_at.format("YYYY-MM-DD"),
          },
          session_id: activeSession.id
        })));
    }
    Promise.all(sessionPromises).then(() => {
      dispatch(getSessions())
    })
  };
  const validationSchema = Yup.object({
    name: Yup.string(),
  });
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <Box sx={{ display: "flex" }}>
      {status === "loading" ? <LoadingScreen /> : null}
      <AddSessionModal
        formik={formik}
        modalOpen={sessionModal.add || sessionModal.edit}
        handleModalClose={handleModalClose}
        session={sessionModal.edit ? activeSession : {}}
      />
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "white",
        }}
      >
        <Toolbar
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignIten: "center",
          }}
        >
          <Typography variant="body1" color="textSecondary" noWrap>
            Employees
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              onClick={handleDeleteSession}
              variant="contained"
              sx={{ minWidth: "initial", padding: ".5rem", marginInlineEnd: 1, backgroundColor: '#E62800', "&:hover,&:focus": { backgroundColor: "#E62800" } }}
            >
              <Delete sx={{ color: "#fff", fontSize: '2rem' }} /></Button>
            <Button
              onClick={handleAddModal}
              variant="contained"
              sx={{ minWidth: "initial", padding: ".5rem", marginInlineEnd: 1 }}
            >
              <Add sx={{ color: "#fff", fontSize: '2rem' }} /></Button>
            <Button
              onClick={handleEditModal}
              variant="contained"
              sx={{ minWidth: "initial", padding: ".7rem", marginInlineEnd: 2 }}
            >
              <Edit sx={{ color: "#fff", fontSize: '1.65rem' }} /></Button>
            <FormControl variant="standard" sx={{ minWidth: "140px" }}>
              <Select
                value={activeSession?.name || ""}
                onChange={handleSessionChange}
                label="Age"
              >
                {sessions.length ? sessions?.map(session => <MenuItem key={session.name + "-" + session.id} value={session.name}>{session.name}</MenuItem>) : null}
              </Select>
            </FormControl>
          </Box>
          <Avatar onClick={handleOpenOptions} alt="User" src="/static/images/avatar/1.jpg" sx={{ border: "2px solid #2fd5c8", marginInlineStart: '106px' }} />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseOptions}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* <Toolbar /> */}
        <div>
          <Typography variant="body1">Darul-Huda HR System</Typography>
        </div>
        <Divider />
        <List>
          {drawerNav.map((nav) => (
            <ListItem
              key={nav.name}
              disablePadding
              style={{
                color: location.pathname && location.pathname.includes(nav.path) ? "#2fd5c8" : null,
              }}
              onClick={() => {
                navigate(nav.path);
              }}
            >
              <ListItemButton>
                <ListItemIcon
                  style={{
                    color: location.pathname && location.pathname.includes(nav.path) ? "#2fd5c8" : null,
                  }}
                >
                  {nav.icon}
                </ListItemIcon>
                <ListItemText primary={nav.name} />
                {location.pathname && location.pathname.includes(nav.path) ? (
                  <div
                    style={{
                      height: "1rem",
                      width: "1rem",
                      borderRadius: "50%",
                      backgroundColor: "#2fd5c8",
                    }}
                  ></div>
                ) : null}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Outlet />
    </Box>
  );
}
export default Layout;
