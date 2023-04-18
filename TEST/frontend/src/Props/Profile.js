import { useState } from "react"
import { useAuth } from "../Auth/Auth"

function Profile(){
    const {user} = useAuth()
    const [msg, setMsg] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        var data = new FormData()
        data.append("name", e.target.name.value)
        data.append("email", e.target.email.value)
        data.append("gender", e.target.gender.value)
        data.append("phone", e.target.phone.value)
        data.append("pic", e.target.pic.files[0])
        //send data to backend
        fetch("/user", {
            method: "PUT",
            body: data
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.type === "success"){
                console.log(data)
                setMsg(<span className="fst-italic text-success"><span className="material-icons-outlined">done</span>{data.msg}</span>)
            }else{
                setMsg(<span className="fst-italic text-danger"><span className="material-icons-outlined">close</span>{data.msg}</span>)
            }
        })
        .catch((err) => {console.log(err)})
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <span className="fs-3 px-5 pt-3">Profile</span>
            </div>
            <div className="row">
                <div className="col-12 p-5">
                    <div className="text-center">{msg}</div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" className="form-control form-control-sm" placeholder="Enter Name" defaultValue={user.name} required />
                        <input type="text" name="email" className="form-control form-control-sm" placeholder="Enter Email" defaultValue={user.email} required />
                        <div className="mb-3">
                            <span className="me-3">Gender:</span>
                            <input type="radio" name="gender" className="me-2" value="male" defaultChecked={user.gender === "male"} />Male
                            <input type="radio" name="gender" className="ms-3 me-2" value="female" defaultChecked={user.gender === "female"} />Female
                            <input type="radio" name="gender" className="ms-3 me-2" value="other" defaultChecked={user.gender === "other"} />Other
                        </div>
                        <input type="text" name="phone" className="form-control form-control-sm mb-3" placeholder="Enter Phone" defaultValue={user.phone} required />
                        <input type="file" name="pic" className="form-control form-control-sm mb-5" placeholder="Upload Picture" />
                        <div className="text-center">
                            <button className="btn btn-primary btn-sm px-5">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile