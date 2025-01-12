import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { loginRequest } from '../../actions/authActions'
import { selectUser } from '../../selectors/authSelectors';
import { Button, Link } from '@mui/material';

const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const isUser = useSelector(selectUser);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = (e) =>{
    e.preventDefault()
    const payload = {
      username: username,
      password: password,
      email: "",
    }
    dispatch(loginRequest(payload))
  }

  useEffect(() => {
    if(isUser){
      navigate("/")
    }

  }, [isUser, navigate])
  

  return (
    <div>
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    <Button type="submit">Login</Button>
    <Link href="/register">Create Account</Link>
    </form>
    </div>

  )
}

export default Login