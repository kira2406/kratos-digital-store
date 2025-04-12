import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerRequest } from '../../actions/authActions'
import { selectAuthError, selectUser } from '../../selectors/authSelectors'
import { useNavigate } from 'react-router-dom'
import { Box, Link, Button, Paper, TextField, Typography, Alert } from '@mui/material'

const Register = () => {
  const registrationError = useSelector(selectAuthError)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [usernameError, setUsernameError] = useState(false)
    const [usernameErrorText, setUsernameErrorText] = useState("")
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorText, setPasswordErrorText] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [emailErrorText, setEmailErrorText] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isUser = useSelector(selectUser)

  const checkFields = (e) => {
    e.preventDefault();

    const isAlphaNumeric =  /^[a-zA-Z0-9]+$/.test(username)
    const hasAlphabet = /[a-zA-Z]/.test(username);
    let hasError = false

    if (username == "" ){
      setUsernameError(true)
      setUsernameErrorText("Username is required")
      hasError = true
    } else if (username.length <=8 ){
      hasError = true
      setUsernameError(true)
      setUsernameErrorText("Username should be atleast 8 characters or more")
    } else if (!isAlphaNumeric){
      hasError = true
      setUsernameError(true)
      setUsernameErrorText("Username should only contain letters or numbers")
    } else if (!hasAlphabet){
      hasError = true
      setUsernameError(true)
      setUsernameErrorText("Username should contain atleast one alphabet")
    }
    if (password == ""){
      hasError = true
      setPasswordError(true)
      setPasswordErrorText("Password is required")
    } else if (password.length <=8){
      hasError = true
      setPasswordError(true)
      setPasswordErrorText("Password should be atleast 8 characters long")
    }
    if (email == ""){
      hasError = true
      setEmailError(true)
      setEmailErrorText("Email is required")
    }
    console.log(usernameError,passwordError, emailError)
    if (!hasError){
      handleRegister()
    }
  }

  const handleRegister = ()=>{
    const payload = {
      username: username,
      password: password,
      email: email
    }
    dispatch(registerRequest(payload))

  }

  useEffect(() => {
      if(isUser){
        navigate("/")
      }
  
  }, [isUser, navigate])


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
          Register
        </Typography>
        {registrationError && <Alert severity="error" variant='filled'>{registrationError}</Alert>}
        <form onSubmit={checkFields}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {setUsername(e.target.value); setUsernameError(false); setUsernameErrorText("")}}
            error={usernameError}
            helperText={usernameError ? usernameErrorText : ""}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {setEmail(e.target.value); setEmailError(false); setEmailErrorText("")}}
            error={emailError}
            helperText={emailError ? emailErrorText : ""}
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
            Register
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link href="/login" underline="hover" color="secondary">
            Login Here
          </Link>
        </Typography>
      </Paper>
    </Box>
  )
}

export default Register