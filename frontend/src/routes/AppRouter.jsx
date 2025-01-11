import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from '../components/Landing/Landing';
import Profile from '../components/Profile/Profile';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import Layout from '../components/Layout/Layout';

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
                path:"/login", element: <Login />
            },
            {
                path:"/register", element: <Register />
            }
        ]
    }
])
const AppRouter = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default AppRouter