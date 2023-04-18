import { Navigate, useNavigate } from "react-router-dom"
import {useAuth} from "../Auth/Auth"
import { useEffect } from "react"
import Layout from "./Layout"

function Home(){
    const {user, setUser} = useAuth()
    return (user ? <Layout/>:<Navigate to="/"/>
    
    )}

export default Home