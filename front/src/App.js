import Register from "./Props/Register"
import Login from "./Props/Login";
import Home from "./Props/Home";
import "./Style.css"
import {createBrowserRouter, RouterProvider } from "react-router-dom"
import { useEffect, useState } from "react";
import {AuthContext} from "./Auth/AuthContext";
import {login,logout} from "./Auth/Auth";
import DataEntry from "./Props/DataEntry";
import Explorer from "./Props/Explorer";


const router = createBrowserRouter([
  {path: "/", element: <Login/>},               //default path component
  {
    path: "/home", 
    element: <Home/>, 
    children: [
      {path:"explorer",element:<Explorer/>}
    ]
  },
  {path:"data",element:<DataEntry/>},
  {path: "/register", element: <Register/>},
])

function App(){
  const [user, setUser] = useState(null)

  return (
    <>
      <AuthContext.Provider value={{user, setUser, login, logout}}>
        <RouterProvider router={router}/>
      </AuthContext.Provider>
    </>
  )
}

export default App;
