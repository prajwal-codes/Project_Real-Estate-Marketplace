import { Navigate, useNavigate } from "react-router-dom"
import {useAuth} from "../Auth/Auth"
import { useEffect } from "react"
import TestLayout from "./TestLayout"

function TestHome(){
    const {user, setUser} = useAuth()
    return (user ? <TestLayout/>:<Navigate to="/"/>
    
    )}

export default TestHome