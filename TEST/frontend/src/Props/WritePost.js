import { useRef, useState } from "react";
import { useAuth } from "../Auth/Auth";
import "../Style.css";
import {ethers} from 'ethers';

function WritePost() {
   // const ethers = require("ethers")
   const {user} = useAuth()
   const [errorMessage,setErrorMessage] = useState();
   const [defaultAccount,setDefaultAccount] = useState();
   const [userBalance,setUserbalace] = useState();
   const connectWallet = () => {
       if (window.ethereum){
           window.ethereum.request({method: 'eth_requestAccounts'})
           .then(result => {
               accountChanged([result[0]])
           })
       } else {
           setErrorMessage('Install Metamask!')
       }
   }

   const accountChanged = (accountName) => {
       setDefaultAccount(accountName)
       getUserBalance(accountName)
   }

   const getUserBalance = (accountAddress) => {
       window.ethereum.request({method: 'eth_getBalance', params: [String(accountAddress),"latest"]})
       .then(balance => {
           setUserbalace(ethers.utils.formatEther(balance));
       })
   }

  const [postText, setPostText] = useState("");
  const [postState, setPostState] = useState("");
  const [postDistrict, setPostDistrict] = useState("");
  const [postCity, setPostCity] = useState("");
  const [postDimensions,setPostDimensions]=useState("");
  const [postSqArea,setPostSqArea]=useState("");
  const [postOwner, setPostOwner] = useState(user.name);
  const [postType,setPostType]=useState("");
  const [postYear,setPostYear]=useState("");
  const postImageRef = useRef();
  const [msg, setMsg] = useState("");
  const createPost = function () {
    var data = new FormData();
    data.append("postText", postText);
    data.append("postImage", postImageRef.current.files[0]);
    data.append("postState", postState);
    data.append("postDistrict", postDistrict);
    data.append("postCity", postCity);
    data.append("postOwner", postOwner);
    data.append("postType",postType);
    data.append("postYear",postYear);
    data.append("postDimensions",postDimensions);
    data.append("postSqArea",postSqArea);
    data.append("postOwner",postOwner);
    data.append("userAddress",defaultAccount)
    fetch("/post", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.type === "success") {
          setMsg(
            <span className="fst-italic text-success">
              <span className="material-icons-outlined">done</span>
              {data.msg}
            </span>
          );
        } else {
          setMsg(
            <span className="fst-italic text-danger">
              <span className="material-icons-outlined">close</span>
              {data.msg}
            </span>
          );
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid">
      <div className="row px-5 pt-3">
        <div className="col-12 fs-3">Post Property</div>
      </div>
      <div className="row p-5">
        <div className="text-center mb-3">{msg}</div>
        <div className="form-floating">
        <div>
            {/* <h6>MetaMask Wallet</h6> */}
            <button onClick={connectWallet}>Connect Wallet</button>
            <h6>Address: {defaultAccount} </h6>
            <h6>Balance is :{userBalance} </h6>
        </div>
          <select
            id="propertyType"
            name="propertyType"
            className="form-select"
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
          >
            <option value="">Select Property Type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="land">Land</option>
          </select>
         

          <div className="mb-3">
			<label  className="form-label">
			  Year
			</label>
			<input
			  type="text"
			  id="year"
			  name="year"
			  className="form-control"
			  value={postYear}
			  onChange={(e) => setPostYear(e.target.value)}
			/></div>
			
            <div className="mb-3">
			<label  className="form-label">
			  State
			</label>
			<input
			  type="text"
			  id="state"
			  name="state"
			  className="form-control"
			  value={postState}
			  onChange={(e) => setPostState(e.target.value)}
			/>
		  
            </div>
            <div className="mb-3">
			<label  className="form-label">
			  District
			</label>
			<input
			  type="text"
			  id="district"
			  name="district"
			  className="form-control"
			  value={postDistrict}
			  onChange={(e) => setPostDistrict(e.target.value)}
			/>
		  </div>
          <div className="mb-3">
			<label  className="form-label">
			  City
			</label>
			<input
			  type="text"
			  id="city"
			  name="city"
			  className="form-control"
			  value={postCity}
			  onChange={(e) => setPostCity(e.target.value)}
			/>
		  </div>
          <div className="mb-3">
			<label  className="form-label">
            Dimensions
			</label>
			<input
			  type="text"
			  id="dimensions"
			  name="dimensions"
			  className="form-control"
			  value={postDimensions}
			  onChange={(e) => setPostDimensions(e.target.value)}
			/>
		  </div>
          <div className="mb-3">
			<label  className="form-label">
            Sq Area
			</label>
			<input
			  type="text"
			  id="SqArea"
			  name="SqArea"
			  className="form-control"
			  value={postSqArea}
			  onChange={(e) => setPostSqArea(e.target.value)}
			/>
		  </div>
          <div className="mb-3">
			<label  className="form-label">
            Owner
			</label>
			<input
			  type="text"
			  id="Owner"
			  name="Owner"
			  className="form-control"
			  value={postOwner}
			  onChange={(e) => setPostOwner(user.name)}
			/>
		  </div>
        <div>
          <textarea
            className="form-control post-text"
            placeholder="Additional Details"
            id="floatingTextarea"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          ></textarea>
          <label for="floatingTextarea" className="ms-3">
            Additional Details
          </label>
        </div>
        
        </div>
        
      </div>
      <div className="row px-5 mb-5">
        <label className="p-0 text-muted form-label">Property Image</label>
        <input type="file" ref={postImageRef} className="form-control" />
      </div>
      <div className="text-center">
        <button className="btn btn-primary px-5" onClick={createPost}>
          Save
        </button>
      </div>
    </div>
  );
}

export default WritePost;
