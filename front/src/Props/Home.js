import { Navigate, useNavigate } from "react-router-dom"
import {useAuth} from "../Auth/Auth"
import { useEffect } from "react"
import Explorer from "./Explorer"

function Home(){
    const {user, setUser} = useAuth()
    return (user ? <Explorer/>:<Navigate to="/"/>
    
    )}

export default Home