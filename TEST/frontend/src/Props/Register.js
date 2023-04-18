import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import background from "../bg/estate2.jpg";

function Register(){
    const[name,setName] = useState("")
    const[email,setEmail] = useState("")
    const[msg,setMsg] = useState("")
    const passInput = useRef(null)
    const rePassInput = useRef(null)

    const validatePassword = function(event) {
        if(passInput.current.value === rePassInput.current.value){
            passInput.current.classList.remove("is-invalid")
            rePassInput.current.classList.remove("is-invalid")
            passInput.current.classList.add("is-valid")
            rePassInput.current.classList.add("is-valid")
            return true
        }else{
            passInput.current.classList.add("is-invalid")
            rePassInput.current.classList.add("is-invalid")
            return false
        }
    }

    // const removeMsg = function(){
    //     setTimeout(() => {
    //         setMsg("")
    //     }, 5000)
    // }

    const registerAccount = function(){
        if(name && email) {
            if(validatePassword()){
                var data = {
                    name: name,
                    email: email,
                    password: passInput.current.value
                }
                fetch("/auth/register", {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "content-type": "application/json"
                    }
                })
                .then((res) => res.json())
                .then((data) => {
                    if(data.type === "success"){
                        setMsg(<span className="text-success">{data.msg}</span>)
                    }else{
                        setMsg(<span className="text-danger">{data.msg}</span>)
                    }
                })
            }else{
                setMsg("Password does not match")
            }
        }else{
            setMsg("Empty Fields")
        }
        setTimeout(() => {
            setMsg("")
        }, 5000)
    }

    return (
        <div className="container-fluid" style={{ backgroundImage: `url(${background})` , backgroundSize:`cover`}}>
        <div className="row justify-content-center align-items-center" style={{height:"98vh"}}>
            <div className="col-4 shadow p-5 text-center" style={{backgroundColor : `rgba(255, 255, 255, 0.5)`}}>
                <p className="fst-italic">{msg}</p>
               <p className="reg">Register</p>
                <input type="text" className="form-control form-control-sm mb-3" placeholder="Name" onChange={(e) => {setName(e.target.value)}}/>
                <input type="email" className="form-control form-control-sm mb-3" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
                <input 
                    type="password" 
                    className="form-control form-control-sm mb-3" 
                    placeholder="Enter Password" 
                    ref={passInput}
                    />
                <input type="password" 
                    className="form-control form-control-sm mb-3" 
                    placeholder="Retype Password" 
                    ref={rePassInput}
                    onChange={validatePassword}/>
                <button className="btn btn-primary btn-sm mb-3" onClick={registerAccount}>Create an account</button>
                <p>
                    <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
      </div>
    )
  }
  
  export default Register;
  