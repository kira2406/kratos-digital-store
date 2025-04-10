import React from "react";
import AppBar from "@mui/material/AppBar";
import { alpha, Box, Button, InputBase, styled, Toolbar, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../selectors/authSelectors";
import {logoutRequest } from "../../reducers/auth/authSlice";

const Navbar = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate()

  const currentuser = useSelector(selectUser)

  const handleLoginClick = () => {
    navigate('/login')
  }
  const handleProfileClick = () => {
    navigate('/profile')
  }

  const handleLogoutClick = () => {
    dispatch(logoutRequest())
    localStorage.removeItem("token")
    navigate('/')
  }

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  return (
    <AppBar color="black">
      <Toolbar>
      <Typography variant="h4" component="div" sx={{ mr: 2 }} >
          Kratos
        </Typography>
        <Typography variant="h6" component="div" sx={{ mr: 2 }}>
          Home
        </Typography>
        <Typography variant="h6" component="div" sx={{ mr: 2 }}>
          Categories
        </Typography>
        <Search >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          {currentuser ? 
          <Box sx={{m:2}}>
          <Button sx={{mr:1, ml:2}} color="primary" variant="contained" onClick={handleProfileClick}>Profile</Button>
          <Button sx={{mr:1, ml:2}} color="primary" variant="contained" onClick={handleLogoutClick}>Logout</Button>
          </Box>:
          <Button color="primary" variant="contained" onClick={handleLoginClick}>Login</Button>}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
