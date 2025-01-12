import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerRequest } from '../../actions/authActions'

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const dispatch = useDispatch()

  const handleRegister = (e)=>{
    e.preventDefault()
    const payload = {
      username: username,
      password: password,
      email: email
    }
    dispatch(registerRequest(payload))

  }
  return (
    <div><h1>Register</h1>
    <form onSubmit={handleRegister}>
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
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    <button type="submit">Register</button>
    </form></div>
  )
}

export default Register