import "../Style.css"
import { useState } from 'react';
import {ethers} from 'ethers';
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";
function TestPostv2(props) {
	const navigate=useNavigate();
    const [errorMessage,setErrorMessage] = useState();
   const [defaultAccount,setDefaultAccount] = useState();
   const [userBalance,setUserbalace] = useState();
   const [isSubmitting, setIsSubmitting] = useState(false);
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
	const [msg, setMsg] = useState("");
	const [postData, setPostData] = useState({
		postType: props?.postData?.postType,
		postCity: props?.postData?.postCity,
		postState: props?.postData?.postState,
		postDistrict: props?.postData?.postDistrict,
		postYear: props?.postData?.postYear,
		postDimensions: props?.postData?.postDimensions,
		postSqArea: props?.postData?.postSqArea,
		postText: props?.postData?.postText,
		postImage: props?.postData?.postImage,
        postOwner:props?.postData?.postOwner
	  });
    const [showForm, setShowForm] = useState(false);
    const [showForm2, setShowForm2] = useState(false); 
    const handleClick = () => {
        setShowForm(true);
    };
      
    const handleClick2 = () => {
        setShowForm2(true);
    };
    const handleClose = () => {
        setShowForm(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true);
        var data = new FormData()
        data.append("_id",props.postData._id)
        data.append("price", e.target.price.value)
        data.append("list", e.target.list.value)
        console.log(data);
        fetch("/post", {
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
        setIsSubmitting(false);
    }
    const handleSell = (e) => {
        e.preventDefault()
        var data = new FormData()
        data.append("_id",props.postData._id)
        // data.append("old_owner",props.postData.userAddress)
        data.append("new_owner", e.target.new_owner.value)
        data.append("price", e.target.price.value)
        console.log(data);
        fetch("/post/sell", {
            method: "POST",
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
		<div className="container-fluid p-3 border bg-white shadow mb-2">
			<div className="d-flex">
				<div>
					<img
						src={"media/user/pic/"+props?.postData?.userId?.pic}
						alt="user"
						className="user-small-image rounded rounded-circle"
					/>
				</div>
				<div className="ms-3">
					<span className="fs-5 fw-bold">{props?.postData?.userId?.name}</span>
				</div>
			</div>
			<div className="row">
				<div className="col mt-1 mb-2">
                <span>{props?.postData?.postType}</span><br></br>
					{/* <span>{props?.postData?.postCity}</span>
					<span>{props?.postData?.postState}</span>
					<span>{props?.postData?.postDistrict}</span>
					<span>{props?.postData?.postYear}</span>
					<span>{props?.postData?.postDimensions}</span>
					<span>{props?.postData?.postSqArea}</span>
					<span>{props?.postData?.postText}</span> */}
                    <span>{props?.postData?.postOwner}</span>
                    <span>{props?.postData?.price}</span>
				</div>
			</div>
			<div className="row">
				<img src={"/post/pic/"+props?.postData?.postImage} alt="post" className="post-image" />	
			</div>
            
            <>
    
      <button onClick={handleClick2}>Sell</button>
      {showForm2 && (
        <div className="form-popup">
        <div>
            {/* <h6>MetaMask Wallet</h6> */}
            <button onClick={connectWallet}>Connect Wallet</button>
            <h6>Address: {defaultAccount} </h6>
            <h6>Balance is :{userBalance} </h6>
        </div>
        <form onSubmit={handleSell}>
                        <input type="text" name="new_owner" className="form-control form-control-sm" placeholder="Enter New Owner" defaultValue={defaultAccount} required />
                        <input type="text" name="price" className="form-control form-control-sm" placeholder="Enter Price" defaultValue={postData.price} required/>
                        <div className="text-center">
                            <button className="btn btn-primary btn-sm px-5">Sell</button>
                        </div>
                    </form>

        </div>
      )}
    </>
		</div>
	);
}

export default TestPostv2;
