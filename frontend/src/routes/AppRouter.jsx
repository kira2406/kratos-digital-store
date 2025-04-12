import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from '../pages/Landing/Landing';
import Profile from '../pages/Profile/Profile';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import Layout from '../components/Layout/Layout';
import { Container } from '@mui/material';
import GameDetailsPage from '../pages/GameDetailsPage/GameDetailsPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children:[
            {
                path:"/", element: <Landing />
            },
            {
                path:"/profile", element: <Profile />
            },            
            {
                path:"/games/:game_id", element: <GameDetailsPage />
            },
        ]
    },
    {
        path:"/login", element: <Login />
    },
    {
        path:"/register", element: <Register />
    },

])
const AppRouter = () => {
  return (
    <Container disableGutters={true}>
    <RouterProvider router={router} />
    </Container>
  )
}

export default AppRouter