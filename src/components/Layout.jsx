import { AppBar, Menu, MenuItem, Avatar, Box, Container, CssBaseline, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { AdsClick, EmojiEvents, Home, LibraryBooks, PersonAdd, Timer } from "@mui/icons-material";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { Outlet } from "react-router-dom";
import { logOut } from "../Pages/Auth/authSlice";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
  return {};
});

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
  const dispatch = useDispatch();

  const handleOpenOptions = (ev, employee) => {
    setAnchorEl(ev.currentTarget);
  };
  const handleCloseOptions = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logOut())
  };
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Box sx={{ display: "flex" }}>
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
          <Avatar onClick={handleOpenOptions} alt="User" src="/static/images/avatar/1.jpg" sx={{ border: "2px solid #2fd5c8" }} />
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
