import { useAuth } from "../Auth/Auth"
import "../Style.css"
import { Link,useNavigate } from "react-router-dom"
// import Userimg from "./user/pic/Cabbage.jpg" 
function TestSidebar(){
    const {user,logout} = useAuth()
    const navigate = useNavigate()
    
    const profileBtn = () => {
        let path = `/testhome/profile`;
        navigate(path);
    }

    const feedBtn = () => {
        let path = `/testhome/testfeed`;
        navigate(path);
    }

    const writeBtn = () =>{ 
      let path = `/testhome/writepost`; 
      navigate(path);
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                <img src={"/user/pic/"+user?.pic} className="img-fluid user-pic "/>
                </div>
            </div>
            <div className="row" >
                <div className="col-12 fs-3 text-center">{user.name}</div>
            </div>
            <div className="row">
                <div className="col-12 fs-3 text-center">{user.email}</div>
            </div>
            <div className="row mt-5">
                <nav className="nav flex-column">
                    <button className="profileBtn" onClick={profileBtn}>Profile</button>
                    <button className="feedBtn" onClick={feedBtn}>Feed</button>
                    <button className="writeBtn" onClick={writeBtn}>Create_Post</button>
                    <button className="logOut" onClick={()=>{logout().then(res => {
					navigate("/")
				})}}>Log Out</button>
                </nav>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default TestSidebar