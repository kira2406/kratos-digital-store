import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerRequest } from '../../actions/authActions'
import { selectUser } from '../../selectors/authSelectors'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isUser = useSelector(selectUser)

  const handleRegister = (e)=>{
    e.preventDefault()
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