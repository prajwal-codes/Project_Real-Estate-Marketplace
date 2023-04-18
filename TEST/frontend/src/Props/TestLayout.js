import { Outlet } from "react-router-dom"
import TestSidebar from "./TestSidebar"
import PropertyList from"./Enlist"
import background from "../bg/bg5.jpg";

function TestLayout(){
    return (
        <div className="container-fluid" style={{ backgroundImage: `url(${background})`, backgroundSize:`cover`}}>
            <div className="row justify-content-between">
                <div className="col-2 border-end border-secondary" style={{height: "98vh"}}>
                    <TestSidebar/>
                </div>
                <div className="col-7">
                    <Outlet/>
                </div>
                <div className="col-2 border-start border-secondary">
                    {/* <PropertyList/> */}
                </div>
            </div>

        </div>
    )
}

export default TestLayout