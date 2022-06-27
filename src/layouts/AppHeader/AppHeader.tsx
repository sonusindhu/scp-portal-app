import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const AppHeader = (props) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const logOut = (event) => {
    props.onLogout(event);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* MAIN MENU START DESKTOP START */}
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/app/company/list"
            sx={{
              mr: 3,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Supply Chain Portal
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              component={NavLink}
              to="/app/company/list"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Companies
            </Button>
            <Button
              component={NavLink}
              to="/app/contact/list"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Contacts
            </Button>
            <Button
              component={NavLink}
              to="/app/inventory/list"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Inventories
            </Button>
            <Button
              component={NavLink}
              to="/app/quote/list"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Quotes
            </Button>
          </Box>

          {/* MAIN MENU START DESKTOP END */}

          {/* MAIN MENU START MOBILE START */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                onClick={handleCloseNavMenu}
                component={NavLink}
                to="/app/company/list"
              >
                <Typography textAlign="center">Companies</Typography>
              </MenuItem>
              <MenuItem
                onClick={handleCloseNavMenu}
                component={NavLink}
                to="/app/contact/list"
              >
                <Typography textAlign="center">Contacts</Typography>
              </MenuItem>
              <MenuItem
                onClick={handleCloseNavMenu}
                component={NavLink}
                to="/app/inventory/list"
              >
                <Typography textAlign="center">Inventories</Typography>
              </MenuItem>
              <MenuItem
                onClick={handleCloseNavMenu}
                component={NavLink}
                to="/app/quote/list"
              >
                <Typography textAlign="center">Quotes</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SCP
          </Typography>

          {/* MAIN MENU START MOBILE END */}

          {/* USER PROFILE MENU START */}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={handleCloseUserMenu}
                component={Link}
                to="/app/profile/changepassword"
              >
                <Typography textAlign="center">My Profile</Typography>
              </MenuItem>
              <MenuItem onClick={logOut}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
          {/* USER PROFILE MENU END */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default AppHeader;
