import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginRequest } from '../../actions/authActions'

const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const handleLogin = (e) =>{
    e.preventDefault()
    const payload = {
      username: username,
      password: password,
      email: ""
    }
    dispatch(loginRequest(payload))
  }

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
    <button type="submit">Login</button>
    </form>
    </div>

  )
}

export default Login