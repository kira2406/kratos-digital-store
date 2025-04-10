import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../actions/authActions";
import { selectAuthError, selectUser } from "../../selectors/authSelectors";
import { Alert, Box, Button, Link, Paper, TextField, Typography } from "@mui/material";

const Login = () => {
  const loginError = useSelector(selectAuthError)
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const [useremailError, setUseremailError] = useState(false)
  const [useremailErrorText, setUseremailErrorText] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorText, setPasswordErrorText] = useState(false)

  const isUser = useSelector(selectUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkFields = (e) => {
    e.preventDefault();
    let hasError = false
    if (useremail == "" && password == ""){
      hasError = true
      setUseremailError(true)
      setUseremailErrorText("Email address is required")
      setPasswordError(true)
      setPasswordErrorText("Password is required")
    }
    else if (useremail == ""){
      hasError = true
      setUseremailError(true)
      setUseremailErrorText("Email address is required")
    }
    else if (password == ""){
      hasError = true
      setPasswordError(true)
      setPasswordErrorText("Password is required")
    }
    if (!hasError)
    {
      handleLogin()
    }
  }

  const handleLogin = () => {

    const payload = {
      email: useremail,
      password: password,
    };
    dispatch(loginRequest(payload));
  };

  useEffect(() => {
    if (isUser) {
      navigate("/");
    }
  }, [isUser, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 500, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        {loginError && <Alert severity="error" variant='filled'>{loginError}</Alert>}
        <form onSubmit={checkFields}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            type="email"
            placeholder="Email Address"
            value={useremail}
            onChange={(e) => {setUseremail(e.target.value); setUseremailError(false); setUseremailErrorText("")}}
            error={useremailError}
            helperText={useremailError ? useremailErrorText : ""}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {setPassword(e.target.value); setPasswordError(false); setPasswordErrorText("")}}
            error={passwordError}
            helperText={passwordError ? passwordErrorText : ""}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            type="submit"
          >
            Login
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Link href="/register" underline="hover" color="secondary">
            Create Account
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
