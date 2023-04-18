import { Link, useNavigate } from "react-router-dom";
import {useAuth} from "../Auth/Auth"
import { useState, useEffect } from "react";
import background from "../bg/estate3.jpg";

function TestLogin(){
    const {user, setUser, login} = useAuth()
    const [msg,setMsg] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (event) => {
      event.preventDefault()
      let email = event.target.email.value
      let password = event.target.password.value
      login(email, password)
        .then((res) => res.json())
        .then((data) => {
          if(data.type === "error"){
            setMsg(<span className="text-danger">{data.msg}</span>)
          }else{
            setUser(data)
            navigate("/testhome")
          }
          
        })
        .catch((err) => console.log(err))
        setTimeout(() => {
          setMsg("")
      }, 5000)
    }

    useEffect(() => {
      fetch("/auth/user", {
        method: "POST",
      })
      .then((res) => res.json())
      .then((data) => {
        if(data?._id){
          setUser(data)
          navigate("/testhome")
        }
      })
      .catch((err) => console.log(err))
    }, [])

    return (
      <div className="container-fluid" style={{ backgroundImage: `url(${background})`, backgroundSize:`cover` }}>
        <div className="row justify-content-center align-items-center" style={{height:"98vh"}}>
          
            <div className="col-4 shadow p-5 text-center" style={{backgroundColor : `rgba(255, 255, 255, 0.5)`}}>
              <form onSubmit={handleSubmit}>
                <p className="fst-italic">{msg}</p>
                <p className="login_1">Login</p>
                <input type="email" className="form-control form-control-sm mb-3" placeholder="Email" name="email" required/>
                <input type="password" className="form-control form-control-sm mb-3" placeholder="Password" name="password" required/>
                <button className="btn btn-primary btn-sm mb-3">Login</button>
                <p>
                    <Link to="/register">Register</Link>
                </p>
              </form>
            </div>
        </div>
      </div>
    )
  }
  
  export default TestLogin;
  