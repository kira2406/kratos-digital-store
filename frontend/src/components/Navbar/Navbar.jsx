import React from "react";
import AppBar from "@mui/material/AppBar";
import {
  Button,
  InputBase,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../selectors/authSelectors";
import { logoutRequest } from "../../reducers/auth/authSlice";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentuser = useSelector(selectUser);
  const theme = useTheme();

  const handleLoginClick = () => navigate("/login");
  const handleProfileClick = () => navigate("/profile");

  const handleLogoutClick = () => {
    dispatch(logoutRequest());
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      className="navbar"
      style={{
        "--navbar-bg": theme.palette.common.black,
        "--navbar-text": theme.palette.common.white,
        "--navbar-accent": theme.palette.secondary.main,
        "--search-bg": "rgba(255,255,255,0.15)",
        "--search-bg-hover": "rgba(255,255,255,0.25)",
      }}
    >
      <Toolbar className="toolbar">
        <Typography component={Link} to="/" className="logo">
          Kratos
        </Typography>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/categories" className="nav-link">
            Categories
          </Link>
        </div>

        <div className="spacer" />

        <div className="search">
          <div className="search-icon">
            <SearchIcon fontSize="small" />
          </div>
          <InputBase
            placeholder="Search..."
            inputProps={{ "aria-label": "search" }}
            className="search-input"
          />
        </div>

        {currentuser ? (
          <div className="buttons">
            <Button variant="contained" color="primary" onClick={handleProfileClick}>
              Profile
            </Button>
            <Button variant="contained" color="primary" onClick={handleLogoutClick}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="buttons">
            <Button variant="contained" color="primary" onClick={handleLoginClick}>
              Login
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;